import { getRepository } from 'typeorm';
import { User } from '../models/user.entity';
import { ServerError, handleAsync } from '../shared/common';


export class AuthService {

    public entity: any;

    constructor( entity: any ) {
        this.entity = entity;
    }

    public find = async( options: any ) => {
        
    const [ allResources, error ] = await handleAsync( getRepository(User).find(this.entity) );
    if ( error ) throw new ServerError( error.message, `auth.route->findResource` );

    return allResources;
    }
}