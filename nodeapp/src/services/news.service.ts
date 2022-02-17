import { getRepository } from 'typeorm';
import { News } from '../models/news.entity';
import { ServerError, handleAsync, fieldFilter, paging } from '../shared/common';


export const createResource = async( model: any ) => {

    const tempObject = getRepository( News ).create( model );
    let [ newResource, error ] = await handleAsync( getRepository(News).save(tempObject) );

    if( error ) throw new ServerError( error.message, `products.route -> createResource` );

    return newResource;
}

export const findResource = async( options: any ) => {

    let allResources = null;
    let error = null;

    // 1. Partial Response (based on fields)
    const filter = fieldFilter( options );

    // 2. Pagination (based on offset and limit) 
    const page = paging( options );
        
    // 3. Search (Case-Insensitive search based on default field 'title')
    // format : q=news
    let where: string = options.q ?? ``;

    // 4. Sorting (based on fields; default sort is by id)
    // format : order=title
    let order: string = options.order ? `entity.${options.order}`: `entity.id`;

    // Partial selection
    [ allResources, error ] = await handleAsync(
        getRepository( News )
        .createQueryBuilder( `entity` )
        .select( filter )
        .where( `LOWER(entity.title) like LOWER(:title)`, { title: `%${where.toLowerCase()}%` } )
        .skip( page.offset )
        .take( page.limit )
        .orderBy( order, `ASC` )
        .getMany( )
    );
    

    if( error ) throw new ServerError( error.message, `news.route -> findResource` );

    return allResources;
}
 
export const findOneResource = async( id: number, options: any ) => {

    const filter = fieldFilter( options );   
    
        let [ resource, error ] = await handleAsync(
            getRepository( News )
           .createQueryBuilder( `entity` )
           .select( filter )
           .where( `entity.id = :id`, {id} )
           .getOne( )
        );
    
    if( error ) throw new ServerError( error.message, `news.route -> findoneResource`);

    return resource;
}

export const patchResource = async( id: number, patchedModel: any ) => {
    
    let [ result, error ] = await handleAsync( getRepository(News).update(id, patchedModel) );
    if( error ) throw new ServerError( error.message, `news.route -> patchResource`);

    let [ resource, error2 ] = await handleAsync( getRepository(News).findOne(id) );
    if( error2 ) throw new ServerError( error2.message, `news.route -> patchResource` );

    return resource;
}

export const deleteResource = async ( id: number ) => {

    let [ result, error ] = await handleAsync( getRepository(News).delete(id) );

    if( error ) throw new ServerError( error.message, `news.route -> deleteResource`);
    
    return result;
}
     
