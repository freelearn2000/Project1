import { getRepository } from 'typeorm';
import { Weather } from '../models/weather.entity'; 
import { ServerError, handleAsync, fieldFilter, paging} from '../shared/common';


export const createResource = async( model:any ) => {

    const tempObject = getRepository( Weather ).create( model );
    let [ newResource, error ] = await handleAsync( getRepository( Weather ).save( tempObject ) );

    if ( error ) throw new ServerError( error.message, ' weather.route->createResource ' );

    return newResource;   
}

export const findResource = async ( options: any ) => {

    let allResources = null;
    let error = null;
   
    // 1.Partial Response
    const filter = fieldFilter( options );

    // 2.Paging
    const page = paging( options );

    // 3.Search (case insensitive search on default field 'title)
    // Format : ?q=weather
    let where = options.q ?? '';

    // 4.Sorting (based on fields; default sort is by 'id')
    // Format : ?order=title
    let order: string = options.order ? `entity.${options.order}` : `entity.id`;
    
    // Partial Selection
    [ allResources, error ] = await handleAsync(
        getRepository( Weather )
        .createQueryBuilder( 'entity' )
        .select( filter )
        .where( `LOWER(entity.info) like LOWER(:info)`, { info: `%${where.toLowerCase()}%`} )
        .skip( page.offset )
        .take( page.limit )
        .orderBy(order, `ASC`)
        .getMany( )
    );
 
    if ( error ) throw new ServerError( error.message, 'weather.route->findResource' );
   
    return allResources;
}

export const findOneResource = async ( options: any, id:number ) => {

    let resource = null;
    let error = null;

    [ resource, error ] = await handleAsync(
        getRepository( Weather )
        .createQueryBuilder( 'entity' )
        .select( fieldFilter(options) )
        .where( {id} )
        .getMany( )
    );
   
    if ( error ) throw new ServerError( error.message, ' weather.route->findOneResource ' );
   
    return resource;
}

export const patchResource = async ( id: number, patchedModel: any ) => {

    let [ resource1, error1 ] = await handleAsync( getRepository(Weather).update(id, patchedModel) );
    if ( error1 ) throw new ServerError( error1.message, 'weather.route->patchResource' );
   
    let [ resource, error ] = await handleAsync( getRepository( Weather ).findOne( id ) );
    if ( error ) throw new ServerError( error.message, ' weather.route->findOneResource ' );
   
    return resource;    
}

export const deleteResource = async ( id:number ) => {

    let [ result, error ] = await handleAsync( getRepository(Weather).delete(id) );
    if ( error ) throw new ServerError( error.message, 'weather.route->deleteResource' );
   
    return result;  
}