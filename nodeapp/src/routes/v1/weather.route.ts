import express from 'express';
// import validationMiddleware from '../../middlewares/validation.middleware';
// import { WeatherValidator } from '../../models/weather.entity';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/weather.service';
// import { handleAsync, EntityNotFoundError } from '../../shared/common';


let router = express.Router( );

// API Endpoint for '/weather'
router.post('/', async(req, res) => {

    res.send( `${req.method} method called on /weather${req.path}` );
});

router.get('/', async(req, res) => {
    
    res.send( `${req.method} method called on /weather${req.path}` );
});

router.get('/:id', async(req, res) => {
    
    res.send( `${req.method} method called on /weather${req.path}` );
});

router.patch('/:id', async(req, res) => {
    
    res.send( `${req.method} method called on /weather${req.path}` );
});

router.delete('/:id', async(req, res) => {
    
    res.send( `${req.method} method called on /weather${req.path}` );
});

// // API Endpoint for '/weather'
// router.post('/',validationMiddleware( WeatherValidator ),async(req, res, next) => {

//     const model = req.body;

//     //  Call service
//     const [ newResource, error ] = await handleAsync( createResource( model ) );

//     if (error) return next (error);

//     res.send( newResource );
// });

// router.get('/', async(req, res, next) => {

//     // Retrieve fields from Query params
//     let options: any = req.query;

//     //  Call service
//     const [ allResources, error ] = await handleAsync( findResource( options ) );

//     if ( error ) return next ( error );

//     res.send( allResources );
// });

// router.get('/:id', async(req, res, next) => {
    
//     // Retrieve id from Route params
//     const id = Number( req.params.id );

//      // Retrieve fields from Query params
//      let options: any = req.query;

//     //  Call service
//     const [ resource, error ] = await handleAsync( findOneResource( options, id ) );
//     if ( error ) return next ( error );
  
//     if ( resource ) {
//       res.send( resource );
//     } else {
//       next( new EntityNotFoundError(id, 'weather.route->get/:id') );  
//     }
// });

// router.patch('/:id',validationMiddleware( WeatherValidator, {skipMissingProperties: true} ), async(req, res, next) => {
    
//     const id = Number( req.params.id );
//     const patchedModel = req.body;

//     const [ resource, error ] = await handleAsync( patchResource( id, patchedModel ) );

//     if (error) return next (error);
 
//     if ( resource ) {
//       res.send( resource );
//     } else {
//       next( new EntityNotFoundError( id, ' weather.route->patch/:id ') );  
//     }
//     res.send( `${req.method} method called on /weather${req.path}` );
// });

// router.delete('/:id', async(req, res, next) => {

//     const id = Number(req.params.id);

//     const [ result, error ] = await handleAsync( deleteResource( id ) );

//     if ( error ) return next ( error );
 
//     if ( result.affected ===1 ) {
//       res.send( {deleted: true} );
//     } else {
//       res.send( {deleted: true} );
//     }
// });

export default router;