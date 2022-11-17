import { EntityTarget, DataSource } from 'typeorm';
import { ServerError, handleAsync, fieldFilter, paging } from '../../shared/common';


export interface IService {
    create(model: any): any;
    find(options: any): any;
    findOne(id: number, options: any): any;
    patch(id: number, patchedModel: any): any;
    delete(id: number): any;
}

export class BaseService {

    public entity: any;
    public datasource: DataSource;
}
export class Service extends BaseService implements IService {

    constructor( entity: EntityTarget<any>, datasource: DataSource ) {
        super();
        this.entity = entity;
        this.datasource = datasource;  
    }

    public create = async( model: any ) => {

        const tempObject = this.datasource.getRepository(this.entity).create( model );
    
        const [ newResource, error ] = await handleAsync( this.datasource.getRepository(this.entity).save(tempObject) );  
        if ( error ) throw new ServerError( error.message, `index.route->create` );
    
        return newResource;
    };

    public find = async( options: any ) => {
     
        let allResource = null;
        let error = null;
    
        // 1. Partial response
        const filter = fieldFilter( options );
    
        // 2. Pagination
        const page = paging( options );
       
        // 3. Search (Case-Insensitive search on default field)
        // Format: ?q=news
        const where: string = options.q ?? ``;
    
        // 4. Sorting (based on fields; default sort is by 'id'
        // Format: ?order=name
        const order: string = options.order ? `entity.${options.order}` : `entity.id`; 
        // Partial selection
        [ allResource, error ] = await handleAsync(
            this.datasource.getRepository(this.entity)
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
    };

    public findOne = async( id: number, options: any ) => {

        const filter = fieldFilter(options);
    
        const [ resource, error ] = await handleAsync(
            this.datasource.getRepository(this.entity)
            .createQueryBuilder( `entity` )
            .select( filter )
            .where( {id} )
            .getOne( )
        );
    
        // let [ resource, error ] = await handleAsync( getRepository(blog).findOne(id) );
        if ( error ) throw new ServerError( error.message, `index.route->findOne` );
    
        return resource;
    };

    public patch = async( id: number, patchModel: any ) => {

        const [ , error ] = await handleAsync( this.datasource.getRepository(this.entity).update(id, patchModel) );
        if ( error ) throw new ServerError( error.message, `index.route->patch` );
    
        const [ resource, error2 ] = await handleAsync( this.datasource.getRepository(this.entity).findOneBy({id: id}) );
        if ( error2 ) throw new ServerError( error2.message, `index.route->patch` );
    
        return resource; 
    };

    public delete = async( id: number ) => {

        const [ result, error ] = await handleAsync( this.datasource.getRepository(this.entity).delete(id) );
        if ( error ) throw new ServerError( error.message, `index.route->delete` );
    
        return result;
    };
}
