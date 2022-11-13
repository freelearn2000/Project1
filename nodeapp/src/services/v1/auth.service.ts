import { EntityTarget, DataSource } from 'typeorm';
import { BaseService } from './index.service';
import { ServerError, handleAsync } from '../../shared/common';


export interface IAuthService {
    find(options: any): any;
}  

export class AuthService extends BaseService {

    constructor( entity: EntityTarget<any>, datasource: DataSource ) {
        super();
        this.entity = entity;
        this.datasource = datasource;  
    }

    public find = async( model: any ) => {
        
    const [ allResources, error ] = await handleAsync( this.datasource.getRepository(this.entity).find(model) );
    if ( error ) throw new ServerError( error.message, `auth.route->findResource` );

    return allResources;
    };
}