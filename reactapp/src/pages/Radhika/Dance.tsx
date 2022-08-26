import {  useState, useEffect } from 'react';
import axios from '../../axios';

// Axios implemented through Functional Component

export const Dance = ( props: any ) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    
    useEffect( ( ) =>  {
        axios.get('/posts')
            .then(response => {
                setLoading(false);
                setData(response.data.slice(0,5));
                setError(null);
            })
            .catch(error => {
                setLoading(false);
                setData(null);
                setError(error);
            })
    }, []);

    const renderLoading = ( ) => {

        const loadingJSX = 
        <div>
            <i className="notched circle loading icon"></i>
            <div className="content">
                <h4>Loading ....</h4>
            </div>
        </div> 
        return loadingJSX;
    }

    const renderError = ( ) => {
        
        const message = error ? error[ 'message' ] : '';
        const errorJSX = 
                <div className="ui red message">
                    <h4>{ message }</h4>
                </div>
        return errorJSX;

    }

    const renderUserdata = ( ) => {

        const posts = data ? data : [ ];
        const dataJSX = posts.map( ( post: any ) => {
            return (
                <div key={ post.id } className="ui grey segment">
                    <p><b>Posts:</b>{ post.body }</p>
                </div>
            );
        });
        return dataJSX;
    }   

    return(
        <div>
        <h4 className="ui center aligned header">{ props.title }</h4>
            {
                loading ? renderLoading( ): 
                data ? renderUserdata( ):
                renderError( )
            }
        </div>
    );
}