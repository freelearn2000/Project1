import express from 'express';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/books.service';
// import { handleAsync, EntityNotFoundError } from "../../shared/common";
// import validationMiddleware from '../../middlewares/validation.middleware';
// import { BookValidator } from '../../models/book.entity';


let router = express.Router( );

// API Endpoint '/books' (temporary)
router.post(`/`,(req, res) => {
    res.send( `${req.method} method called on books ${req.path}` );
});

router.get(`/`,(req, res) => {
    res.send( `${req.method} method called on books ${req.path}` );
});

router.get(`/:id`,(req, res) => {
    res.send( `${req.method} method called on books ${req.path}` );
});

router.patch(`/:id`,(req, res) => {
    res.send( `${req.method} method called on books ${req.path}` );
});

router.delete(`/:id`,(req, res) => {
    res.send( `${req.method} method called on books ${req.path}` );
});

// API Endpoint '/books'
// router.post(`/`, validationMiddleware( BookValidator ), async(req, res, next) => {

//     const model = req.body;
   
//     // Call service
//     const [ newResource, error ] = await handleAsync( createResource(model) );
//     if ( error ) return next ( error );

//     res.send( newResource );
// });

// router.get(`/`, async(req, res, next) => {

//     // Retreive fields from Query params
//     let options: any = req.query;

//     // Call service
//     const [ allResources, error ] = await handleAsync( findResource(options) );
//     if ( error ) return next ( error );

//     res.send( allResources );    
// });

// router.get(`/:id`, async(req, res, next) => {
    
//     // Retreive id from Route params
//     const id = Number( req.params.id );

//     let options: any = req.query;
    
//     // Call service
//     const [ resource, error ] = await handleAsync( findOneResource(id, options) );
//     if ( error ) return next ( error );

//     if ( resource ) {
//         res.send( resource );
//     } else {
//         next( new EntityNotFoundError(id, `books.route->get/:id`) );
//     }
// });

// router.patch(`/:id`, validationMiddleware( BookValidator, {skipMissingProperties: true} ), async(req, res, next) => {

//     const id = Number( req.params.id );
//     const patchModel = req.body;

//     // Call service
//     const [ resource, error ] = await handleAsync( patchResource(id, patchModel) );
//     if ( error ) return next ( error );

//     if ( resource ) {
//         res.send( resource );
//     } else {
//         next( new EntityNotFoundError(id, `books.route->patch`) );
//     }
// });

// router.delete(`/:id`, async(req, res, next) => {
    
//     const id = Number( req.params.id );
    
//     // Call service
//     const [ result, error ] = await handleAsync( deleteResource(id) );
//     if ( error ) return next ( error );

//     if ( result.affected === 1 ) {
//         res.send( {deleted: true} );
//     } else {
//         next( new EntityNotFoundError(id, `books.route->delete`) );
//     }
// });


export default router;