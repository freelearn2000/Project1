import { getRepository } from 'typeorm';
import { User } from '../models/user.entity';
import { ServerError, handleAsync, fieldFilter, paging } from '../shared/common';


export const createResource = async( model: any ) => {

    const tempObject = getRepository( User ).create( model );
    let [ newResource, error ] = await handleAsync( getRepository( User ).save( tempObject ) );

    if( error ) throw new ServerError( error.message, `users.route -> createResource` );

    return newResource;
}

export const findResource = async( options: any ) => {

    let allResources = null;
    let error = null;

    const filter = fieldFilter( options );
    const page = paging( options );
        
        // 3. Search (Case-Insensitive search based on default field 'name')
        let where: string = options.q ?? ``;

        // 4. Sorting (based on fields; default sort is by id)
        // format : order=name
        let order: string = options.order ? `entity.${options.order}`: `entity.id`;

        // Partial selection
        [ allResources, error ] = await handleAsync(
             getRepository( User )
            .createQueryBuilder( `entity` )
            .select( filter )
            .where( `LOWER(entity.name) like LOWER(:name)`, { name: `%${where.toLowerCase()}%` } )
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
            getRepository( User )
           .createQueryBuilder( `entity` )
           .select( filter )
           .where( {id} )
           .getOne( )
        );
    
    if( error ) throw new ServerError( error.message, `news.route -> findoneResource`);

    return resource;
}
export const patchResource = async( id: number, patchedModel: any ) => {
    
    let [ , error ] = await handleAsync( getRepository( User ).update( id, patchedModel ) );
    if( error ) throw new ServerError( error.message, `users.route -> patchResource`);

    let [ resource, error2 ] = await handleAsync( getRepository( User ).findOne(id) );
    if( error2 ) throw new ServerError( error2.message, `users.route -> patchResource` );

    return resource;
}

export const deleteResource = async ( id: number ) => {

    let [ result, error ] = await handleAsync( getRepository( User ).delete( id ) );

    if( error ) throw new ServerError( error.message, `users.route -> deleteResource` );
    
    return result;
}      
