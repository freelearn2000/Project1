import express from 'express';
// import validationMiddleware from '../../middlewaresponse/validation.middleware';
// import { WeatherValidator } from '../../models/weather.entity';
// import { createresponseource, findresponseource, findOneresponseource, patchresponseource, deleteresponseource } from '../../services/weather.service';
// import { handleAsync, EntityNotFoundError } from '../../shared/common';


let router = express.Router( );

// API Endpoint for '/weather'
router.post('/', async(request, response) => {

     // Retreive username & passowrd from body
     const {place, weather} = request.body;

     // Validate the data retreived
     if (!place || !weather) {
         response.send(400);
         return;
     }
 
    //  // Save to db & collect user info & send to client
     response.send( { message : `weather data saved to database` } );
 });

router.get('/', async(request, response) => {
    
    response.send({ message : `weather data fetched from database` });
});

router.get('/:id', async(request, response) => {
    const id = request.params.id;
    if (!id) {
        response.send(404);
        return;
    }
    response.send( { message : `weather data fetched from database` } );
});

router.patch('/:id', async(request, response) => {

    const id = request.params.id;
    const {place, weather} = request.body;
    if (!id) {
        response.send(404);
        return;
    }
    if( place && weather ) {
        response.send( { message: `place and weather updated on id: ${id}` } )
    }
    else if( place ) {
        response.send( {message:`place updated on id: ${id}`} )
    }
    else if( weather ) {
        response.send( {message:`weather updated on id: ${id}`} )
    }
});

router.delete('/:id', async(request, response) => {
    const id = request.params.id;
    if (!id) {
        response.send(400);
        return;
    }
    response.send( {message:`weather data deleted on id: ${id}`} );
});

// // API Endpoint for '/weather'
// router.post('/',validationMiddleware( WeatherValidator ),async(request, response, next) => {

//     const model = request.body;

//     //  Call service
//     const [ newresponseource, error ] = await handleAsync( createresponseource( model ) );

//     if (error) return next (error);

//     response.send( newresponseource );
// });

// router.get('/', async(request, response, next) => {

//     // Retrieve fields from Query params
//     let options: any = request.query;

//     //  Call service
//     const [ allresponseources, error ] = await handleAsync( findresponseource( options ) );

//     if ( error ) return next ( error );

//     response.send( allresponseources );
// });

// router.get('/:id', async(request, response, next) => {
    
//     // Retrieve id from Route params
//     const id = Number( request.params.id );

//      // Retrieve fields from Query params
//      let options: any = request.query;

//     //  Call service
//     const [ responseource, error ] = await handleAsync( findOneresponseource( options, id ) );
//     if ( error ) return next ( error );
  
//     if ( responseource ) {
//       response.send( responseource );
//     } else {
//       next( new EntityNotFoundError(id, 'weather.route->get/:id') );  
//     }
// });

// router.patch('/:id',validationMiddleware( WeatherValidator, {skipMissingProperties: true} ), async(request, response, next) => {
    
//     const id = Number( request.params.id );
//     const patchedModel = request.body;

//     const [ responseource, error ] = await handleAsync( patchresponseource( id, patchedModel ) );

//     if (error) return next (error);
 
//     if ( responseource ) {
//       response.send( responseource );
//     } else {
//       next( new EntityNotFoundError( id, ' weather.route->patch/:id ') );  
//     }
//     response.send( `${request.method} method called on /weather${request.path}` );
// });

// router.delete('/:id', async(request, response, next) => {

//     const id = Number(request.params.id);

//     const [ responseult, error ] = await handleAsync( deleteresponseource( id ) );

//     if ( error ) return next ( error );
 
//     if ( responseult.affected ===1 ) {
//       response.send( {deleted: true} );
//     } else {
//       response.send( {deleted: true} );
//     }
// });

export default router;