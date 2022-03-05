import { getRepository } from 'typeorm';

import { ServerError, handleAsync, fieldFilter, paging } from '../shared/common';



export class Service {

    public entity: any;

    constructor( entity: any ) {
        this.entity = entity;
    }

    public create = async( model: any ) => {

        const tempObject = getRepository( this.entity ).create( model );
    
        let [ newResource, error ] = await handleAsync( getRepository(this.entity).save(tempObject) );  
        if ( error ) throw new ServerError( error.message, `index.route->create` );
    
        return newResource;        
    }

    public find = async( options: any ) => {
     
        let allResource = null;
        let error = null;
    
        // 1. Partial response
        const filter = fieldFilter( options );
    
        // 2. Pagination
        const page = paging( options );
       
        // 3. Search (Case-Insensitive search on default field)
        // Format: ?q=news
        let where: string = options.q ?? ``;
    
        // 4. Sorting (based on fields; default sort is by 'id'
        // Format: ?order=name
        let order: string = options.order ? `entity.${options.order}` : `entity.id`; 
        // Partial selection
        [ allResource, error ] = await handleAsync(
            getRepository( this.entity )
            .createQueryBuilder( `entity` )
            .select( filter )
            .where( `LOWER(entity.name) like LOWER(:name)`, { name: `%${where.toLowerCase()}%`} )
            .skip( page.offset )
            .take( page.limit )
            .orderBy( order, `ASC`)
            .getMany( ) 
         );
        
        if ( error ) throw new ServerError( error.message, `index.route->find` );
    
        return allResource;
    }

    public findOne = async( id: number, options: any ) => {

        const filter = fieldFilter(options);
    
        let [ resource, error ] = await handleAsync(
            getRepository( this.entity )
            .createQueryBuilder( `entity` )
            .select( filter )
            .where( {id} )
            .getOne( )
        );
    
        // let [ resource, error ] = await handleAsync( getRepository(blog).findOne(id) );
        if ( error ) throw new ServerError( error.message, `index.route->findOne` );
    
        return resource;
    }

    public patch = async( id: number, patchModel: any ) => {

        let [ , error ] = await handleAsync( getRepository(this.entity).update(id, patchModel) );
        if ( error ) throw new ServerError( error.message, `index.route->patch` );
    
        let [ resource, error2 ] = await handleAsync( getRepository(this.entity).findOne(id) );
        if ( error2 ) throw new ServerError( error2.message, `index.route->patch` );
    
        return resource; 
    }

    public delete = async( id: number ) => {

        let [ result, error ] = await handleAsync( getRepository(this.entity).delete(id) );
        if ( error ) throw new ServerError( error.message, `index.route->delete` );
    
        return result;
    }
}
