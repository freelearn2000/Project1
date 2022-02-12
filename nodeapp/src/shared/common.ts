
export const handleAsync = ( promise: Promise<any> ) => {

    return promise
        .then( (data: any) => [data, null] )
        .catch( (error: any) => [null, error] );
}

// 1. Filter (based on fields)
// Format: ?fields=id,title
export const fieldFilter = ( options: any ) => {

    let fields: any = options.fields;
    return fields = fields?.split(`,`).map( (item: string) => `entity.${item}` );
 }

// 2. Pagination (based on offset and limit) 
// offset : start of record
// limit : number of records
// Format : offset=0&limit=5
export const paging = ( options: any ) => {
    
    let offset: any = options.offset ?? 0;
    let limit: any = options.limit; 
    return { offset, limit };
}   

export class MyError extends Error {

    status: number;
    origin: string;
    clientMessage: string;


    constructor( status: number, message: string, origin: string, clientMessage: string ) {
        super( message );
        this.status = status;
        this.origin = origin;
        this.clientMessage = clientMessage;
    }
}

export class ServerError extends MyError {

    constructor( message: string, origin: string ) {
        super( 500, message, origin, 'Server Error!' );
    }
}

export class DataValidationError extends MyError {

    constructor( message: string, origin: string ) {
        super( 400, message, origin, 'Data is not valid!' );
    }
}

export class EntityNotFoundError extends MyError {

    constructor( id: number, origin: string ) {
        super( 400, `Entity with id: ${id} not found!`, origin, `Entity with id: ${id} not found!` );
    }
}

export class AuthenticationError extends MyError {

    constructor( error: any, origin: string ) {
        super( 401, error ?? `Authentication Error!`, origin, `Authentication Error!` );
    }
}

export class ApiNotImplementedError extends MyError {

    constructor( message: string, origin: string ) {
        super( 404, message, origin, `API is not implemented` );
    }
}

export class NotImplementedError extends MyError {

    constructor(  message: string, origin: string ) {
        super( 404, message, origin, `Not implemented` );
    }
}


