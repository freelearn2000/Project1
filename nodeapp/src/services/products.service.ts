import { getRepository } from 'typeorm';
import { Product } from '../models/product.entity';
import { ServerError, handleAsync, fieldFilter, paging } from '../shared/common';


 export const createResource = async( model : any ) => {

    const tempobject = getRepository( Product ).create( model );
    let [ newResource, error ] = await handleAsync( getRepository( Product ).save(tempobject) );
    if ( error ) throw new ServerError( error.message, `Products.route->createResource` );

    return newResource;
 }

 export const findResource = async( options: any ) => {

   let allResources = null;
   let error = null;
  
   const filter = fieldFilter( options );
   const page = paging( options );

   // 3. Search (Case-Insensitive search on default field)
   // Format : ?q=news
   let where = options.q ?? '';

   // 4. Sorting (based on fields; default sort is by `id`)
   // Format : ?order=name
   let order: string = options.order ? `entity.${options.order}` : `entity.id`;
   
   // Partial Selection
   [ allResources, error ] = await handleAsync(
       getRepository( Product )
       .createQueryBuilder( 'entity' )
       .select( filter )
       .where( `LOWER(entity.name) like LOWER(:name)`, { name: `%${where.toLowerCase()}%`} )
       .skip( page.offset )
       .take( page.limit )
       .orderBy(order, `ASC`)
       .getMany( )
   );

   if ( error ) throw new ServerError( error.message, 'products.route->findResource' );
  
   return allResources;
 }

 export const findOneResource = async( id: number ) => {

    let [ resource, error ] = await handleAsync( getRepository( Product ).findOne(id) );
    if ( error ) throw new ServerError( error.message, `Products.route->findOneResource` );

    return resource;
}

export const patchResource = async( id: number, patchedModel: any) => {

    let [ , error ] = await handleAsync( getRepository( Product ).update(id, patchedModel));
    if ( error ) throw new ServerError( error.message, `Products.route->patchResource` );

    let [ resource, error2 ] = await handleAsync( getRepository( Product ).findOne(id) );
    if ( error2 ) throw new ServerError( error2.message, `Products.route->patchResource` );

    return resource;
}

export const deleteResource = async( id: number ) => {

    let [ result, error ] = await handleAsync( getRepository( Product ).delete( id ));
    if ( error ) throw new ServerError( error.message, `Products.route->deleteResource` );

    return result;
 }
