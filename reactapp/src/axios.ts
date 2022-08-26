import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const instance = axios.create( {
    baseURL: 'http://localhost:3001',
    // baseURL: 'https://jsonplaceholder.typicode.com/'
} );

//Request interceptor
instance.interceptors.request.use( (request: AxiosRequestConfig) => {

    return request;

}, (error) => {
 
} );

//Response interceptor
instance.interceptors.response.use( (response : AxiosResponse) => {

    return response;

}, (error) => {

} );


export default instance;