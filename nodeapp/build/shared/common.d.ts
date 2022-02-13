export declare const handleAsync: (promise: Promise<any>) => Promise<any[]>;
export declare const fieldFilter: (options: any) => any;
export declare const paging: (options: any) => {
    offset: any;
    limit: any;
};
export declare class MyError extends Error {
    status: number;
    origin: string;
    clientMessage: string;
    constructor(status: number, message: string, origin: string, clientMessage: string);
}
export declare class ServerError extends MyError {
    constructor(message: string, origin: string);
}
export declare class DataValidationError extends MyError {
    constructor(message: string, origin: string);
}
export declare class EntityNotFoundError extends MyError {
    constructor(id: number, origin: string);
}
export declare class AuthenticationError extends MyError {
    constructor(error: any, origin: string);
}
export declare class ApiNotImplementedError extends MyError {
    constructor(message: string, origin: string);
}
export declare class NotImplementedError extends MyError {
    constructor(message: string, origin: string);
}
