import { any } from 'nconf';
// import { getRepository } from 'typeorm';
import { User } from '../models/user.entity';
import { ServerError, handleAsync } from '../shared/common';


export class AuthService {

    // public entity: any;
    public repository: any; 

    constructor(repository: any ) {
        // this.entity = entity;
        this.repository = repository;
    }

    public find = async( options: any ) => {
        
    const [ allResources, error ] = await handleAsync( this.repository.find() );
    if ( error ) throw new ServerError( error.message, `auth.route->findResource` );

    return allResources;
    }
}