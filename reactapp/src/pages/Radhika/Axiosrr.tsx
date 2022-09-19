import { Component, useState, useEffect } from 'react';
import axios from '../../axios';


interface IProps {
    title: string;
}

// Axios implemented through Class Component

export class Art extends Component<IProps> {

    state = { loading: true, posts: null, error: null };

    componentDidMount( ) {

        axios.get('/posts')
            .then(response => {
                this.setState( { loading: false, posts: response.data.slice(0,5), error: null } );
            })
            .catch(error => {
                this.setState( { loading: false, posts: null, error: error } );
            })
    }
     
    renderLoading( ) {

        const loadingJSX = 
            <div>
                <i className="notched circle loading icon"></i>
                <div className="content">
                    <h4>Loading ....</h4>
                </div>
            </div> 
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error ? this.state.error[ 'message' ] : '';
        const errorJSX = 
                <div className="ui red message">
                    <h4>{ message }</h4>
                </div>
        return errorJSX;
    }

    renderUserdata( ) {

        const posts = this.state.posts ? this.state.posts : [ ];
        const dataJSX = posts.map( ( posts: any ) => {
                return (
                    <div key={ posts.id } className="ui grey segment">
                        <p><b>Headline:</b>{ posts.title }</p>
                    </div>
                );
        });
        return dataJSX;
    }
    
    render( ) {

        return(
            <div>
                <h2 className="ui center aligned header">{ this.props.title }</h2>
                {
                    this.state.loading ? this.renderLoading( ): 
                    this.state.posts ? this.renderUserdata( ):
                    this.renderError( )
                }
            </div>
        );
    }
}


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
                    <p><b>News:</b>{ post.body }</p>
                </div>
            );
        });
        return dataJSX;
    }   

    return(
        <div>
        <h2 className="ui center aligned header">{ props.title }</h2>
            {
                loading ? renderLoading( ): 
                data ? renderUserdata( ):
                renderError( )
            }
        </div>
    );
}


export const Axiosrr =( ) => {
    return (
        <div className="ui segments">
            <div className="ui segment">
                <Art title="Class Component"/>
            </div>
            <div className="ui segment">
                <Dance title="Functional Component"/>
            </div>
        </div>
      );

}