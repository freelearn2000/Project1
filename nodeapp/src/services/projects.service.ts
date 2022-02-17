import { getRepository } from "typeorm";
import { Project } from "../models/project.entity";
import { ServerError, handleAsync, fieldFilter, paging } from "../shared/common";


export const createResource = async( model: any ) => {

    const tempObject = getRepository( Project ).create( model );

    let [ newResource, error ] = await handleAsync ( getRepository(Project).save(tempObject) );
    if ( error ) throw new ServerError( error.message, `projects.route->createResource` );

    return newResource;
}

export const findResource = async( options: any ) => {

    let allResource = null;
    let error = null;
    
    // 1. Partial Response (based on fields) 
    const filter = fieldFilter( options );

    // 2. Pagination (based on limit & offset)
    const page = paging( options );
    
     // 3. Search (Case Insensitive search on default field 'Name')
     let where: string = options.q ?? ``;

     // 4. Sorting (based on fields,default sort by `id`)
     // Format :?order=name
     let order: string = options.order ? `entity.${options.order}`:`entity.id`;

    [ allResource, error ] = await handleAsync(
        getRepository( Project )
        .createQueryBuilder( `entity` )
        .select( filter )
        .where( `LOWER(entity.name) like LOWER(:name)`, { name: `%${where.toLocaleLowerCase()}%` } )
        .skip( page.offset  )
        .take( page.limit )
        .orderBy( order, `ASC`)
        .getMany( )
    );
    
    if ( error ) throw new ServerError( error.message, `project.route->findResource` );

    return allResource;
}

export const findOneResource = async( id: number, options: any ) => {
    
    const filter = fieldFilter( options );

    let [ resource, error ] = await handleAsync(
        getRepository( Project )
        .createQueryBuilder( `entity` )
        .select( filter )
        .where( {id} )
        .getOne( )
    );

    if ( error ) throw new ServerError( error.message, `projects.route->findOneResource` );

    return resource;
}

export const patchResource = async( id: number, patchModel: any ) => {

    let [ result, error ] = await handleAsync ( getRepository(Project).update(id, patchModel) );
    if ( error ) throw new ServerError( error.message, `projects.route->patchResource` );

    let [ resource, error2 ] = await handleAsync ( getRepository(Project).findOne(id) );
    if ( error2 ) throw new ServerError( error2.message, `projects.route->patchResource` );

    return resource;
}

export const deleteResource = async( id: number ) => {

    let [ result, error ] = await handleAsync ( getRepository(Project).delete(id) );
    if ( error ) throw new ServerError( error.message, `projects.route->deleteResource` );

    return result;  
}
