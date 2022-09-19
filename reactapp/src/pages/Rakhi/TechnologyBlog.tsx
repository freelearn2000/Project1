import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import axios from '../../axios';
import {UserContext } from "../../context/global";

// Axios in Functional Component
export const Technology = ( props: any ) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const location = useLocation( );
    const routeData = useParams( );

    useEffect(( ) => {

        axios.get('/comments')
            .then( response => { 
                setLoading(false);
                setData(response.data.slice(0,5));
                setError(null)})
            .catch( error => { 
                setLoading(false);
                setData(null);
                setError(error)} )

    }, []);

    const renderLoading = ( ) => {

        const loadingJSX =
            <div className = "ui icon message">
                <i className = "notched circle loading icon"></i>
                <div className = "content">
                    <div className = "header">
                        Just one second
                    </div>
                    <p>We're fetching that content for you.</p>
                </div>
            </div>
        return loadingJSX;
    }

    const renderData = ( ) => {

        const technologyData = data ? data : [ ];
        const dataJSX = technologyData.map( (data: any ) => {
           return(
            <div key={ data.id } className="ui segment">
                <h4>{ data.name }</h4>
                <p>{ data.body }</p>
            </div>
           )
        });
        return dataJSX;
    }

    const renderError = ( ) => {

        const message = error ? error[ 'message' ] : '';
        const errorJSX = 
        <div className='ui negative message'>
            <h4>{ message }</h4>
        </div>
        return errorJSX;
    }

    return(
        <>
            <div className="ui segment block header inverted blue center aligned">
                <UserContext.Consumer>
                    { user =>
                        (
                            <> 
                                {user.name}'s Blog
                            </>
                        )
                    }
                </UserContext.Consumer>
            </div>
            <h2 className="ui center aligned header red">{props.title }</h2>
            <Link to='trending' className = "ui label red">Trending</Link>
            {
                location.pathname.includes('trending')?<Outlet/>:
                <>
                    {	
                        loading ? renderLoading( ) :
                        data ? renderData( ) :
                        renderError( )
                    }
                </>
            }
        </>
    )
}
