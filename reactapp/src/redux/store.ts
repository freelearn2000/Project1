import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserReducer';


const Store = configureStore( {
    reducer: {
        userKey: userReducer
    }
} );

export default Store;
