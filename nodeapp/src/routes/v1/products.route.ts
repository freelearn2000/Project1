import express from 'express';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/products.service';
// import { handleAsync, EntityNotFoundError } from '../../shared/common';
// import authMiddleware from '../../middlewares/auth.middleware';
// import { ProductValidator } from '../../models/product.entity';
// import  validationMiddleware  from '../../middlewares/validation.middleware';

 
let router = express.Router( );

// API Endpoint `/products`(temporary)
router.post(`/`,(req, res) => {
	res.send( `${req.method} method called on products ${req.path}` );
});

router.get(`/`,(req, res) => {
	res.send( `${req.method} method called on products ${req.path}` );
});
 
router.get(`/:id`,(req, res) => {
	res.send( `${req.method} method called on products ${req.path}` );
});

router.patch(`/:id`,(req, res) => {
	res.send( `${req.method} method called on products ${req.path}` );
});

router.delete(`/:id`,(req, res) => {
	res.send( `${req.method} method called on products ${req.path}` );
});

// API Endpoint `/products`

// Protect ALL CRUD operations
// router.use(authMiddleware() );

// router.post(`/`, validationMiddleware( ProductValidator ),async (req, res, next) => {

// 	const model = req.body;
	
// 	// Call service
// 	const [ newResource, error ] = await handleAsync( createResource(model) );
// 	if ( error ) return next( error );
	
// 	res.send( newResource );
// });

// router.get(`/`, async(req, res, next) => {
    
// 	let options = req.query;
// 	 // Call Service
//      const [ allResources, error ] = await handleAsync( findResource( options ) );
// 	 if ( error ) return next( error );

// 	 res.send( allResources );
// });

// router.get(`/:id`, async(req, res, next) => {

// 	const id = Number(req.params.id);

// 	// Call Service
// 	const [ resource, error ] = await handleAsync( findOneResource(id) );
// 	if ( error ) return next( error );

// 	if( resource ) {
// 		res.send( resource );
// 	} else {
// 		next( new EntityNotFoundError(id , `Products.route->get/:id`) );
// 	}
// });

// router.patch(`/:id`, validationMiddleware( ProductValidator, { skipMissingProperties: true } ), async(req, res, next) => {

// 	const id = Number( req.params.id );
// 	const patchedModel = req.body;

// 	// Call Service
// 	const [ resource, error ] = await handleAsync( patchResource(id, patchedModel) );
// 	if ( error ) return next( error );

// 	if ( resource ) {
// 		res.send( resource );
// 	} else {
// 			next( new EntityNotFoundError(id , `Products.route->patch`) );
// 	}
// });

	
// router.delete(`/:id`, authMiddleware( ), async(req, res, next) => {

// 	const id = Number(req.params.id);

// 	// Call service
// 	const [ result, error ] = await handleAsync( deleteResource(id) );
// 	if ( error ) return next( error );

// 	if( result.affected === 1 ) {
// 		res.send( {deleted: true} );
// 	} else {
// 		next( new EntityNotFoundError(id , `Products.route->delete`) );
// 	}
// });


export default router;
