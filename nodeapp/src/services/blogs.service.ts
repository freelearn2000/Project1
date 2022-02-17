import { getRepository } from 'typeorm';
import { Blog } from '../models/blog.entity';
import { ServerError, handleAsync, fieldFilter, paging } from '../shared/common';


export const createResource = async( model: any ) => {

    const tempObject = getRepository( Blog ).create( model );

    let [ newResource, error ] = await handleAsync( getRepository(Blog).save(tempObject) );  
    if ( error ) throw new ServerError( error.message, `blogs.route->createResource` );

    return newResource;        
}

export const findResource = async( options: any ) => {
     
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
        getRepository( Blog )
        .createQueryBuilder( `entity` )
        .select( filter )
        .where( `LOWER(entity.name) like LOWER(:name)`, { name: `%${where.toLowerCase()}%`} )
        .skip( page.offset )
        .take( page.limit )
        .orderBy( order, `ASC`)
        .getMany( ) 
     );
    
    if ( error ) throw new ServerError( error.message, `blogs.route->findResource` );

    return allResource;
}

export const findOneResource = async( id: number, options: any ) => {

    const filter = fieldFilter(options);

    let [ resource, error ] = await handleAsync(
        getRepository( Blog )
        .createQueryBuilder( `entity` )
        .select( filter )
        .where( {id} )
        .getOne( )
    );

    // let [ resource, error ] = await handleAsync( getRepository(blog).findOne(id) );
    if ( error ) throw new ServerError( error.message, `blogs.route->findOneResource` );

    return resource;
}

export const patchResource = async( id: number, patchModel: any ) => {

    let [ , error ] = await handleAsync( getRepository(Blog).update(id, patchModel) );
    if ( error ) throw new ServerError( error.message, `blogs.route->patchResource` );

    let [ resource, error2 ] = await handleAsync( getRepository(Blog).findOne(id) );
    if ( error2 ) throw new ServerError( error2.message, `blogs.route->patchResource` );

    return resource; 
}
     
export const deleteResource = async( id: number ) => {

    let [ result, error ] = await handleAsync( getRepository(Blog).delete(id) );
    if ( error ) throw new ServerError( error.message, `blogs.route->deleteResource` );

    return result;
}
