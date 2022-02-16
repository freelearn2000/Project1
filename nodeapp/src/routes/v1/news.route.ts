import express from 'express';
// import { createResource, findResource, findOneResource, patchResource, deleteResource } from '../../services/news.service';
// import { handleAsync, EntityNotFoundError } from '../../shared/common';
// import valMiddleware from '../../middlewares/validation.middleware'
// import { NewsValidator } from '../../models/news.entity'


let router = express.Router( );
router.post('/', async(request, response) => {

    // Retreive title & content from body
    const { title, content } = request.body;

    // Validate the data retreived
    if (!title || !content) {
        response.send(400);
        return;
    }

   //  // Save to db & collect user info & send to client
    response.send( { message : `news data saved to database` } );
});

router.get('/', async(request, response) => {
   
   response.send({ message : `news data fetched from database` });
});

router.get('/:id', async(request, response) => {
   const id = request.params.id;
   if (!id) {
       response.send(404);
       return;
   }
   response.send( { message : `news data fetched from database` } );
});

router.patch('/:id', async(request, response) => {

   const id = request.params.id;
   const {title, content} = request.body;
   if (!id) {
       response.send(404);
       return;
   }
   if( title && content ) {
       response.send( { message: `title and content updated on id: ${id}` } )
   }
   else if( title ) {
       response.send( {message:`title updated on id: ${id}`} )
   }
   else if( content ) {
       response.send( {message:`content updated on id: ${id}`} )
   }
});

router.delete('/:id', async(request, response) => {
   const id = request.params.id;
   if (!id) {
       response.send(400);
       return;
   }
   response.send( {message:`news data deleted on id: ${id}`} );
});


export default router;