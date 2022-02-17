import { getRepository } from "typeorm";
import { Book } from "../models/book.entity";
import { ServerError, handleAsync, fieldFilter, paging } from "../shared/common";


export const createResource = async( model: any ) => {

    const tempobject = getRepository( Book ).create( model );
    let [ newResource, error ] = await handleAsync( getRepository(Book).save(tempobject) );
    
    if ( error ) throw new ServerError( error.message, `books.route->createResource` );

    return newResource;
}

export const findResource = async( options: any ) => {

    let allResource = null;
    let error = null;

    // 1. Partial Response
    const filter = fieldFilter( options );

    // 2. Pagination
    const page = paging( options );

    // 3. Search (Case-Insensitive search on default field `title`)
    // Format : ?q=news
    let where: string = options.q ?? ``;

    // 4. Sorting (based on fields; default sort is by `id`)
    // Format : ?order=title
    let order: string = options.order ? `entity.${options.order}` : `entity.id`;


    // Partial selection
    [ allResource, error ] = await handleAsync(
        getRepository( Book )
        .createQueryBuilder( `entity` )
        .select( filter )
        .where(`LOWER(entity.name) like LOWER(:name)`, { name: `%${where.toLowerCase()}%` })
        .skip( page.offset )
        .take( page.limit )
        .orderBy( order, `ASC`)
        .getMany( )
    );
    
    if ( error ) throw new ServerError( error.message, `books.route->findResource` );

    return allResource;
}

export const findOneResource = async( id: number, options: any ) => {

    const filter = fieldFilter( options );

    let [ resource, error ] = await handleAsync(
        getRepository( Book )
        .createQueryBuilder( `entity` )
        .select( filter )
        .where("entity.id = :id", { id: id })
        .getOne( )
    );

    if ( error ) throw new ServerError( error.message, `books.route->findOneResource` );

    return resource;
}

export const patchResource = async( id: number, patchModel: any ) => {

    let [ , error ] = await handleAsync( getRepository(Book).update(id, patchModel) );
    if ( error ) throw new ServerError( error.message, `books.route->patchResource` );
   
    let [ resource, error2 ] = await handleAsync( getRepository(Book).findOne(id) );
    if ( error2 ) throw new ServerError( error2.message, `books.route->patchResource` );

    return resource;
}

export const deleteResource = async( id: number ) => {

    let [ result, error ] = await handleAsync( getRepository(Book).delete(id) );
    if ( error ) throw new ServerError( error.message, `books.route->deleteResource` );

    return result;
}