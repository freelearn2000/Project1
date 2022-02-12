import { Request, Response, RequestHandler } from 'express';
import mung from 'express-mung';
import xml2js from 'xml2js';


const responseMiddleware = ( ): RequestHandler => {

    return mung.json( (body: any, req: Request, res: Response) => {

        const accept = req.header(`Accept`);

        if ( accept === `application/xml` ) {
            // Convert to xml
            const builder = new xml2js.Builder( {rootName: `xml`} );
            body = builder.buildObject( body );
        }

        return body;
    })
}

export default responseMiddleware;
