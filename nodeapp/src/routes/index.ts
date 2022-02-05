import { Router } from 'express';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import routerNews from '../routes/v1/news.route';
import routerWeather from '../routes/v1/weather.route'
// import routerUsers from '../routes/v1/users.route';
// import routerAuthV1 from '../routes/v1/auth.route';
// import routerAuthV2 from '../routes/v2/auth.route';
import routerProjects from '../routes/v1/projects.route';
import routerProducts from '../routes/v1/products.route';
import routerBooks from '../routes/v1/books.route';
import routerBlogs from '../routes/v1/blogs.route';

const API_PREFIX_V1 = `/v1`;
const API_PREFIX_V2 = `/v2`;


// User-route

// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);


// Export the base-router
const baseRouter = Router();
// baseRouter.use('/users', userRouter);
// baseRouter.use( `${API_PREFIX_V1}/auth`, routerAuthV1 );
// baseRouter.use( `${API_PREFIX_V2}/auth`, routerAuthV2 );
baseRouter.use( `${API_PREFIX_V1}/news`, routerNews );
baseRouter.use( `${API_PREFIX_V1}/projects`, routerProjects );
baseRouter.use( `${API_PREFIX_V1}/products`, routerProducts );
// baseRouter.use( `${API_PREFIX_V1}/users`, routerUsers );
baseRouter.use( `${API_PREFIX_V1}/blogs`, routerBlogs );
baseRouter.use( `${API_PREFIX_V1}/weather`, routerWeather );
baseRouter.use( `${API_PREFIX_V1}/books`, routerBooks );
export default baseRouter;
