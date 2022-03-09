<<<<<<< HEAD
const express = require('express');
=======

import express from "express";
>>>>>>> 5002e381aa2c50a4a93f3183892d4d1a3fe68978
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/users.service';
// import { handleAsync, EntityNotFoundError } from '../../shared/common';
// import valMiddleware from '../../middlewares/validation.middleware'; 
// import { UserValidator } from '../../models/user.entity'  

let router = express.Router( );

// API Endpoint '/users'
// For node project2....
router.post(`/`, (req: any, res: any) => {

    res.send( `${req.method} on /users ${req.path}` );            
});

router.get(`/`, (req: any, res: any) => {

    res.send( `${req.method} on /users ${req.path}` );
});

router.get(`/:id`, (req: any, res: any) => {

    res.send( `${req.method} on /users ${req.path}` );    
});

router.patch(`/:id`, (req: any, res: any) => {

    res.send( `${req.method} on /users ${req.path}` );    
});

router.delete(`/:id`, (req: any, res: any) => {

    res.send( `${req.method} on /users ${req.path}` );   
});


// router.post('/', valMiddleware( UserValidator ), async(req, res, next) => {

//     const model = req.body;
  
//     // Call service 
//     const [ newResource, error ] = await handleAsync( createResource(model) );
//     if ( error ) return next( error );

//     res.send( newResource );
// });  

// router.get('/', async (req, res, next) => {

//     // Retreive fields from Query params
//     let options: any = req.query;
    
//     // Call service
//     const [ allResources, error ] = await handleAsync( findResource(options) );
//     if ( error ) return next( error );

//     res.send( allResources );
// });  

// router.get(`/:id`, async(req, res, next) => {

//     // Retreive id from Route params
//     const id = Number( req.params.id );

//     let options: any = req.query;

//     // Call service
//     const [ resource, error ] = await handleAsync( findOneResource(id, options) );
//     if ( error ) return next( error );

//     if ( resource ) {
//         res.send( resource );
//     } else {
//         next( new EntityNotFoundError(id, `news.route -> get/:id`) );
//     }
// }); 

// router.patch('/:id',  valMiddleware( UserValidator, {skipMissingProperties: true} ), async(req, res, next) => {

//     const id = Number( req.params.id );
//     const patchedModel = req.body;

//     // Call service
//     const [ resource, error ] = await handleAsync( patchResource(id, patchedModel) ) ;
//     if ( error ) return next( error );

//     if ( resource ) {
//         res.send( resource );
//     } else {
//         next( new EntityNotFoundError(id, `users.route -> patch`) );
//     }
// });
  
// router.delete('/:id', async(req, res, next) => {

//     const id = Number( req.params.id );

//     // Call service
//     const [ result, error ] = await handleAsync( deleteResource(id) ) ;
//     if ( error ) return next( error );

//     if ( result.affected === 1 ) {
//         res.send( {deleted : true} );
//     } else {
//         next( new EntityNotFoundError(id, `users.route -> delete`) );
//     }
// });


export default router;
