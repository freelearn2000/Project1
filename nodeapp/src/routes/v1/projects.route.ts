import express  from 'express';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/projects.service';
// import { handleAsync, EntityNotFoundError  } from '../../shared/common';
// import validationMiddleware from '../../middlewares/validation.middleware';
// import { ProjectValidator } from '../../models/project.entity';
// import logger from '../../shared/logger';


let router = express.Router( );

// API Endpoint '/projects'
router.post(`/`, (req, res) => {

    res.send( `${req.method} on /projects ${req.path}` );
});

router.get(`/`, (req, res) => {

   res.send( `${req.method} on /projects ${req.path}` );    
});

router.get(`/:id`, (req, res) => {

    res.send( `${req.method} on /projects ${req.path}` );
});

router.patch(`/:id`, (req, res) => {
    
    res.send( `${req.method} on /projects ${req.path}` );
});

router.delete(`/:id`, (req, res) => {

    res.send( `${req.method} on /projects ${req.path}` );
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
