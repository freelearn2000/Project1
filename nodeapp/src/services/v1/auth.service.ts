import { Service } from './index.service';
import { ServerError, handleAsync } from '../../shared/common';


export class AuthService extends Service {

    public find = async( model: any ) => {
        
    const [ allResources, error ] = await handleAsync( this.datasource.getRepository(this.entity).find(model) );
    if ( error ) throw new ServerError( error.message, `auth.route->findResource` );

    return allResources;
    }
}