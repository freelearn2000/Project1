import express from 'express';
import validationMiddleware from '../../middlewares/validation.middleware';
import { WeatherValidator } from '../../models/weather.entity';
import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/weather.service';
import { handleAsync, EntityNotFoundError } from '../../shared/common';


let router = express.Router( );

// API Endpoint for '/weather'
router.post('/',validationMiddleware( WeatherValidator ),async(request, response, next) => {

    const model = request.body;

    //  Call service
    const [ newResource, error ] = await handleAsync( createResource( model ) );

    if (error) return next (error);

    response.send( newResource );
});

router.get('/', async(request, response, next) => {

    // Retrieve fields from Query params
    let options: any = request.query;

    //  Call service
    const [ allResources, error ] = await handleAsync( findResource( options ) );

    if ( error ) return next ( error );

    response.send( allResources );
});

router.get('/:id', async(request, response, next) => {
    
    // Retrieve id from Route params
    const id = Number( request.params.id );

     // Retrieve fields from Query params
     let options: any = request.query;

    //  Call service
    const [ resource, error ] = await handleAsync( findOneResource( options, id ) );
    if ( error ) return next ( error );
  
    if ( resource ) {
      response.send( resource );
    } else {
      next( new EntityNotFoundError(id, 'weather.route->get/:id') );  
    }
});

router.patch('/:id',validationMiddleware( WeatherValidator, {skipMissingProperties: true} ), async(request, response, next) => {
    
    const id = Number( request.params.id );
    const patchedModel = request.body;

    const [ resource, error ] = await handleAsync( patchResource( id, patchedModel ) );

    if (error) return next (error);
 
    if ( resource ) {
      response.send( resource );
    } else {
      next( new EntityNotFoundError( id, ' weather.route->patch/:id ') );  
    }
});

router.delete('/:id', async(request, response, next) => {

    const id = Number(request.params.id);

    const [ result, error ] = await handleAsync( deleteResource( id ) );

    if ( error ) return next ( error );
 
    if ( result.affected ===1 ) {
      response.send( {deleted: true} );
    } else {
      response.send( {deleted: true} );
    }
});


// // API Endpoint for '/weather'
// router.post('/', async(request, response) => {

//      // Retreive place & weather from body
//      const {place, weather} = request.body;

//      // Validate the data retreived
//      if (!place || !weather) {
//          response.send(400);
//          return;
//      }
 
//     //  // Save to db & collect user info & send to client
//      response.send( { message : `weather data saved to database` } );
//  });

// router.get('/', async(request, response) => {
    
//     response.send({ message : `weather data fetched from database` });
// });

// router.get('/:id', async(request, response) => {
//     const id = request.params.id;
//     response.send( { message : `weather data fetched from database` } );
// });

// router.patch('/:id', async(request, response) => {

//     const id = request.params.id;
//     const {place, weather} = request.body;

//     if( place && weather ) {
//         response.send( { message: `place and weather updated on id: ${id}` } )
//     }
//     else if( place ) {
//         response.send( {message:`place updated on id: ${id}`} )
//     }
//     else if( weather ) {
//         response.send( {message:`weather updated on id: ${id}`} )
//     }
// });

// router.delete('/:id', async(request, response) => {
//     const id = request.params.id;
//     response.send( {message:`weather data deleted on id: ${id}`} );
// });


export default router;