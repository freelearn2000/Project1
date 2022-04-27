import { Service } from './index.service';
import { ServerError, handleAsync } from '../shared/common';


export class AuthService extends Service {

    public find = async( options: any ) => {
        
    const [ allResources, error ] = await handleAsync( this.repository.find( ) );
    if ( error ) throw new ServerError( error.message, `auth.route->findResource` );

    return allResources;
    }
}