import express, {Request, Response} from 'express';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/books.service';
// import { handleAsync, EntityNotFoundError } from "../../shared/common";
// import validationMiddleware from '../../middlewares/validation.middleware';
// import { BookValidator } from '../../models/book.entity';


let router = express.Router( );

// API Endpoint '/books'

router.post(`/`, async(request: Request, response: Response) => {

    
    // Retreive name & price from body
    const {name, price} = request.body;

    // Validate the data retreived
    if (!name || !price) {
        response.send(400);
        return;
    }

    // Save to db & collect books info & send to client
    response.send( {message: 'book data saved to database'} );     
});

router.get(`/`, async(request: Request, response: Response) => {

response.send( {message: `book data fetched from database`} );
});

router.get(`/:id`, (request: Request, response: Response) => {

const id = request.params.id;
if (!id) {
    response.send(404);
    return;
}
response.send( {message : `book data fetched from database`} );
});

router.patch(`/:id`, async(request: Request, response: Response) => {

const id = request.params.id;
const {name, price} = request.body;
if (!id) {
    response.send(404);
    return;
}
if( name && price ) {
    response.send( {message: `name and price updated on id: ${id}`} )
}
else if( name ) {
    response.send( {message:`name updated on id: ${id}`} )
    }
else if( price ) {
    response.send( {message:`price updated on id: ${id}`} )
}
});

router.delete(`/:id`, async(request: Request, response: Response) => {

const id = request.params.id;
if (!id) {
    response.send(404);
    return;
}
response.send( {message:`book data deleted on id: ${id}`} );
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