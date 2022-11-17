import express, { Request, Response, NextFunction} from "express";
import { IService } from '../../services/v1/index.service';
import { handleAsync, EntityNotFoundError } from '../../shared/common';
import validationMiddleware  from '../../middlewares/validation.middleware';


export class BaseRoute {

    public router = express.Router( );
}

export class Route extends BaseRoute {

    public service: IService;

    constructor( validator: any, service: IService ) {
        super();
        this.service = service;
        this.router.post(`/`, validationMiddleware(validator), this.create);
        this.router.get(`/`, this.find);
        this.router.get(`/:id`, this.get);
        this.router.patch(`/:id`, validationMiddleware( validator, { skipMissingProperties: true} ), this.patch);
        this.router.delete(`/:id`, this.delete);
    }
 
    public create = async(request: Request, response: Response, next: NextFunction) => {

        const model = request.body;
        
        // Call service 
        const [ newResource, error ] = await handleAsync( this.service.create(model) );
        if ( error ) return next( error );
    
        response.send( newResource );
                 
    };

    public find = async(request: Request, response: Response, next: NextFunction) => {

        const options: any = request.query;
        
        // Call service
        const [ allResources, error ] = await handleAsync( this.service.find(options) );
        if ( error ) return next( error );
    
        response.send( allResources);
    };

    public get = async(request: Request, response: Response, next: NextFunction) => {

        // Retrive data from Route params
        const id = Number( request.params.id );
        const options: any = request.query;
    
        // Call service
        const [ resource, error ] = await handleAsync( this.service.findOne(id, options) );
        if ( error ) return next( error );
    
        if( resource ) {    
            response.send( resource );
        } else {
            next( new EntityNotFoundError(id, `blogs.route->get/:id`) );
        }
    };

    public patch = async(request: Request, response: Response, next: NextFunction) => {

        const id = Number( request.params.id );
        const patchedModel = request.body;
    
        // Call service
        const [ resource, error ] = await handleAsync( this.service.patch(id, patchedModel) );
        if ( error ) return next( error );
    
        if ( resource ) {
            response.send( resource );
        } else {
            next( new EntityNotFoundError( id, `blogs.route->patch`) );
        }
    };

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const id = Number( request.params.id );
    
        // Call service
        const [ result, error ] = await handleAsync( this.service.delete(id) );
        if ( error ) return next( error );
    
        if ( result.affected === 1 ) {
            response.send( {Deleted: true} ); 
        } else {
            next( new EntityNotFoundError( id, `blogs.route->delete`) );
        }
    };
}
