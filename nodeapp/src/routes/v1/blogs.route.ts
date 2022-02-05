import express from 'express';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/blogs.service';
// import { handleAsync, EntityNotFoundError } from '../../shared/common';
// import validationMiddleware  from '../../middlewares/validation.middleware';
// import { BlogValidator } from '../../models/blog.entity';


let router = express.Router( );

// API Endpoint '/blogs'
router.post(`/`, (req, res) => {

    res.send( `${req.method} on /blogs ${req.path}` );            
});

router.get(`/`, (req, res) => {

    res.send( `${req.method} on /blogs ${req.path}` );
});

router.get(`/:id`, (req, res) => {

    res.send( `${req.method} on /blogs ${req.path}` );    
});

router.patch(`/:id`, (req, res) => {

    res.send( `${req.method} on /blogs ${req.path}` );    
});

router.delete(`/:id`, (req, res) => {

    res.send( `${req.method} on /blogs ${req.path}` );   
});

// API Endpoint '/blogs'
// router.post(`/`, validationMiddleware(BlogValidator), async(req, res, next) => {

//     const model = req.body;
    
//     // Call service 
//     const [ newResource, error ] = await handleAsync( createResource(model) );
//     if ( error ) return next( error );

//     res.send( newResource );
             
// });

// router.get(`/`, async(req, res, next) => {

//     let options: any = req.query;
    
//     // Call service
//     const [ allResources, error ] = await handleAsync( findResource(options) );
//     if ( error ) return next( error );

//     res.send( allResources);
// });

// router.get(`/:id`, async(req, res, next) => {

//     // Retrive data from Route params
//     const id = Number( req.params.id );
//     let options: any = req.query;

//     // Call service
//     const [ resource, error ] = await handleAsync( findOneResource(id, options) );
//     if ( error ) return next( error );

//     if( resource ) {    
//         res.send( resource );
//     } else {
//         next( new EntityNotFoundError(id, `blogs.route->get/:id`) );
//     }
// });

// router.patch(`/:id`, validationMiddleware( BlogValidator, { skipMissingProperties: true} ), async(req, res, next) => {

//     const id = Number( req.params.id );
//     const patchedModel = req.body;

//     // Call service
//     const [ resource, error ] = await handleAsync( patchResource(id, patchedModel) );
//     if ( error ) return next( error );

//     if ( resource ) {
//         res.send( resource );
//     } else {
//         next( new EntityNotFoundError( id, `blogs.route->patch`) );
//     }
// });

// router.delete(`/:id`, async(req, res, next) => {

//     const id = Number( req.params.id );

//     // Call service
//     const [ result, error ] = await handleAsync( deleteResource(id) );
//     if ( error ) return next( error );

//     if ( result.affected === 1 ) {
//         res.send( {Deleted: true} ); 
//     } else {
//         next( new EntityNotFoundError( id, `blogs.route->delete`) );
//     }
// });


export default router;
        

