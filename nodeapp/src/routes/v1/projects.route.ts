import express  from 'express';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/projects.service';
// import { handleAsync, EntityNotFoundError  } from '../../shared/common';
// import validationMiddleware from '../../middlewares/validation.middleware';
// import { ProjectValidator } from '../../models/project.entity';
// import logger from '../../shared/logger';


let router = express.Router( );

// API Endpoint '/projects'
router.post('/', async(request, response) => {

     // Retreive name & duration from body
     const {name, duration} = request.body;

     // Validate the data retreived
     if (!name || !duration) {
         response.send(400);
         return;
     }
 
    //  // Save to db & collect projects info & send to client
     response.send( {message : `projects data saved to database`} );
 });

router.get('/', async(request, response) => {
    
    response.send( {message : `projects data fetched from database`} );
});

router.get('/:id', async(request, response) => {
    const id = request.params.id;
    if (!id) {
        response.send(400);
        return;
    }
    response.send( {message : `projects data fetched from database`} );
});

router.patch('/:id', async(request, response) => {

    const id = request.params.id;
    const {name, duration} = request.body;
    if (!id) {
        response.send(404);
        return;
    }
    if( name && duration ) {
        response.send( {message: `name and duration updated on id: ${id}`} )
    }
    else if( name ) {
        response.send( {message:`name updated on id: ${id}`} )
    }
    else if( duration ) {
        response.send( {message:`duration updated on id: ${id}`} )
    }
});

router.delete('/:id', async(request, response) => {
    const id = request.params.id;
    if (!id) {
        response.send(404);
        return;
    }
    response.send( {message:`projects data deleted on id: ${id}`} );
});

export default router;


// // API Endpoint '/projects'
// router.post(`/`, validationMiddleware( ProjectValidator ), async(req, res, next) => {

//     // const model = req.body;
//     // logger.info(`Body : `, model);

//     // // Call service
//     // const [ newResourse, error ] = await handleAsync( createResource(model) );
//     // if ( error ) return next ( error );

//     //res.send( newResourse );
//     res.send( `Post on /projects` );
// });

// router.get(`/`, async(req, res, next) => {

//     // // Retreive fields from Query params
//     // let options: any = req.query;

//     // // Call service
//     // const [ allResources, error ] = await handleAsync( findResource(options) );
//     // if ( error ) return next ( error );

//    // res.send( allResources );
//    res.send( `Get on /projects` );    
// });

// router.get(`/:id`, async(req, res, next) => {

//     // const id = Number( req.params.id );
//     // let options: any = req.query;

//     // // Call service
//     // const [ resource, error ] = await handleAsync( findOneResource(id, options) );
//     // if ( error ) return next ( error );

//     // if ( resource ) {
//     //     res.send( resource );
//     // } else {
//     //     next ( new EntityNotFoundError( id, `users.route->get/:id` ) );
//     // }
//     res.send( `Get/:id on /projects` );
// });

// router.patch(`/:id`, validationMiddleware( ProjectValidator, { skipMissingProperties: true } ), async(req, res, next) => {

//     // const id = Number( req.params.id );
//     // const patchedModel = req.body;

//     // // Call service
//     // const [ resource, error ] = await handleAsync( patchResource(id, patchedModel) );
//     // if ( error ) return next ( error );

//     // if ( resource ) {
//     //     res.send( resource );
//     // } else {
//     //     next ( new EntityNotFoundError( id, `users.route->patch` ) );
//     // }
//     res.send( `Patch/:id on /projects` );
// });

// router.delete(`/:id`, async(req, res, next) => {

// //     const id = Number( req.params.id );

// //     // Call service
// //     const [ result, error ] = await handleAsync( deleteResource(id) );
// //     if ( error ) return next ( error );

// //     if ( result.affected === 1 ) {
// //         res.send( {deleted: true} );
// //    } else {
// //         next ( new EntityNotFoundError( id, `users.route->delete` ) );
// //    }
//     res.send( `Delete/:id on /projects` );
// });

//export default router;
