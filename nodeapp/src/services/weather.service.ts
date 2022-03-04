import { getRepository } from 'typeorm';
import { ServerError, handleAsync, fieldFilter, paging } from '../shared/common';
import { Service } from './index.service';


export class WeatherService extends Service {

    constructor( entity: any ) {
        super( entity );
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
            getRepository( this.entity )
            .createQueryBuilder( `entity` )
            .select( filter )
            .where( `LOWER(entity.info) like LOWER(:info)`, { info: `%${where.toLowerCase()}%`} )
            .skip( page.offset )
            .take( page.limit )
            .orderBy( order, `ASC`)
            .getMany( ) 
         );
        
        if ( error ) throw new ServerError( error.message, `weather.service->find` );
    
        return allResource;
    }
}


