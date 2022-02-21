import dotenv from 'dotenv';
import nconf from 'nconf';
import path from 'path';


// Read .env file & populate Environment variables
dotenv.config( );


nconf.argv().env();

switch ( process.env.NODE_ENV ) {
    case `production`:
        nconf.file(`prod`, path.resolve(__dirname, `../../config/production.json`));
        break;
    case `staging`:
        nconf.file(`prod`, path.resolve(__dirname, `../../config/staging.json`));
        break;
    default:
        nconf.file(`prod`, path.resolve(__dirname, `../../config/default.json`));
}

export default nconf;
