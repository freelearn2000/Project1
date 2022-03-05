import { getRepository } from 'typeorm';
import { User } from '../models/user.entity';
import { ServerError, handleAsync } from '../shared/common';


export const findResource = async( model: any ) => {

    let [ allResources, error ] = await handleAsync( getRepository(User).find(model) );
    if ( error ) throw new ServerError( error.message, `auth.route->findResource` );

    return allResources;
}
