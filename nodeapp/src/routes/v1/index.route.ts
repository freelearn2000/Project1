
import express, { Request, Response, NextFunction} from "express";
import { Service } from '../../services/index.service';
import { handleAsync, EntityNotFoundError } from '../../shared/common';
import validationMiddleware  from '../../middlewares/validation.middleware';
import { BlogValidator } from '../../models/blog.entity';


export class Route {

    public router = express.Router( );
    private service: Service;


    constructor( entity: any, validator: any ) {
        this.service = new Service(entity);
        this.router.post(`/`, validationMiddleware(validator), this.create);
        this.router.get(`/`, this.find);
        this.router.get(`/:id`, this.get);
        this.router.patch(`/:id`, validationMiddleware( validator, { skipMissingProperties: true} ), this.patch);
        this.router.delete(`/:id`, this.delete);
    }
 
    public create = async(req:Request, res:Response, next:NextFunction) => {

        const model = req.body;
        
        // Call service 
        const [ newResource, error ] = await handleAsync( this.service.create(model) );
        if ( error ) return next( error );
    
        res.send( newResource );
                 
    }

    public find = async(req:Request, res:Response, next:NextFunction) => {

        let options: any = req.query;
        
        // Call service
        const [ allResources, error ] = await handleAsync( this.service.find(options) );
        if ( error ) return next( error );
    
        res.send( allResources);
    }

    public get = async(req:Request, res:Response, next:NextFunction) => {

        // Retrive data from Route params
        const id = Number( req.params.id );
        let options: any = req.query;
    
        // Call service
        const [ resource, error ] = await handleAsync( this.service.findOne(id, options) );
        if ( error ) return next( error );
    
        if( resource ) {    
            res.send( resource );
        } else {
            next( new EntityNotFoundError(id, `blogs.route->get/:id`) );
        }
    }

    public patch = async(req:Request, res:Response, next:NextFunction) => {

        const id = Number( req.params.id );
        const patchedModel = req.body;
    
        // Call service
        const [ resource, error ] = await handleAsync( this.service.patch(id, patchedModel) );
        if ( error ) return next( error );
    
        if ( resource ) {
            res.send( resource );
        } else {
            next( new EntityNotFoundError( id, `blogs.route->patch`) );
        }
    }

    public delete = async(req:Request, res:Response, next:NextFunction) => {

        const id = Number( req.params.id );
    
        // Call service
        const [ result, error ] = await handleAsync( this.service.delete(id) );
        if ( error ) return next( error );
    
        if ( result.affected === 1 ) {
            res.send( {Deleted: true} ); 
        } else {
            next( new EntityNotFoundError( id, `blogs.route->delete`) );
        }
    }
}
