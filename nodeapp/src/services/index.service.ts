import { EntityTarget, DataSource, Repository } from 'typeorm';
import { ServerError, handleAsync, fieldFilter, paging } from '../shared/common';


export class Service {

    public entity: any;
    public repository: Repository<any>;

    constructor( entity: EntityTarget<any>, datasource: DataSource ) {
        this.entity = entity;
        this.repository = datasource.getRepository(entity);
    }

    public create = async( model: any ) => {

        const tempObject = this.repository.create( model );
    
        const [ newResource, error ] = await handleAsync( this.repository.save(tempObject) );  
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
        const where: string = options.q ?? ``;
    
        // 4. Sorting (based on fields; default sort is by 'id'
        // Format: ?order=name
        const order: string = options.order ? `entity.${options.order}` : `entity.id`; 
        // Partial selection
        [ allResource, error ] = await handleAsync(
            this.repository
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
    
        const [ resource, error ] = await handleAsync(
            this.repository
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

        const [ , error ] = await handleAsync( this.repository.update(id, patchModel) );
        if ( error ) throw new ServerError( error.message, `index.route->patch` );
    
        const [ resource, error2 ] = await handleAsync( this.repository.findOneBy({id: id}) );
        if ( error2 ) throw new ServerError( error2.message, `index.route->patch` );
    
        return resource; 
    }

    public delete = async( id: number ) => {

        const [ result, error ] = await handleAsync( this.repository.delete(id) );
        if ( error ) throw new ServerError( error.message, `index.route->delete` );
    
        return result;
    }
}
