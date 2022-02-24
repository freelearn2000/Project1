import express, { Request, Response}  from 'express';
import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/projects.service';
import { handleAsync, EntityNotFoundError  } from '../../shared/common';
import validationMiddleware from '../../middlewares/validation.middleware';
import { ProjectValidator } from '../../models/project.entity';


let router = express.Router( );

// API Endpoint '/projects'
router.post(`/`, validationMiddleware( ProjectValidator ), async(req, res, next) => {

    const model = req.body;
   

    // Call service
    const [ newResourse, error ] = await handleAsync( createResource(model) );
    if ( error ) return next ( error );

    res.send( newResourse );

});

router.get(`/`, async(req, res, next) => {

    // Retreive fields from Query params
    let options: any = req.query;

    // Call service
    const [ allResources, error ] = await handleAsync( findResource(options) );
    if ( error ) return next ( error );

   res.send( allResources );  
});

router.get(`/:id`, async(req, res, next) => {

    const id = Number( req.params.id );
    let options: any = req.query;

    // Call service
    const [ resource, error ] = await handleAsync( findOneResource(id, options) );
    if ( error ) return next ( error );

    if ( resource ) {
        res.send( resource );
    } else {
        next ( new EntityNotFoundError( id, `projects.route->get/:id` ) );
    }
});

router.patch(`/:id`, validationMiddleware( ProjectValidator, { skipMissingProperties: true } ), async(req, res, next) => {

    const id = Number( req.params.id );
    const patchedModel = req.body;

    // Call service
    const [ resource, error ] = await handleAsync( patchResource(id, patchedModel) );
    if ( error ) return next ( error );

    if ( resource ) {
        res.send( resource );
    } else {
        next ( new EntityNotFoundError( id, `projects.route->patch` ) );
    }
});

router.delete(`/:id`, async(req, res, next) => {

    const id = Number( req.params.id );

    // Call service
    const [ result, error ] = await handleAsync( deleteResource(id) );
    if ( error ) return next ( error );

    if ( result.affected === 1 ) {
        res.send( {deleted: true} );
   } else {
        next ( new EntityNotFoundError( id, `projects.route->delete` ) );
   }
});

export default router;


// // API Endpoint '/projects'
// router.post('/', async(request: Request, response: Response) => {

//      // Retreive name & duration from body
//      const {name, duration} = request.body;

//      // Validate the data retreived
//      if (!name || !duration) {
//          response.send(400);
//          return;
//      }
 
//     //  // Save to db & collect projects info & send to client
//      response.send( {message : `projects data saved to database`} );
//  });

// router.get('/', async(request: Request, response: Response) => {
    
//     response.send( {message : `projects data fetched from database`} );
// });

// router.get('/:id', async(request: Request, response: Response) => {
    
//     const id = request.params.id;

//     response.send( {message : `projects data fetched from database`} );
// });

// router.patch('/:id', async(request: Request, response: Response) => {

//     const id = request.params.id;
//     const {name, duration} = request.body;
    
//     if( name && duration ) {
//         response.send( {message: `name and duration updated on id: ${id}`} )
//     }
//     else if( name ) {
//         response.send( {message:`name updated on id: ${id}`} )
//     }
//     else if( duration ) {
//         response.send( {message:`duration updated on id: ${id}`} )
//     }
// });

// router.delete('/:id', async(request: Request, response: Response) => {
    
//     const id = request.params.id;
    
//     response.send( {message:`projects data deleted on id: ${id}`} );
// });

// export default router;


