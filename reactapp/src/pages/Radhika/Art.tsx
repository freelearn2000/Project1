import { Component } from 'react';
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
                        <p><b>News:</b>{ posts.title }</p>
                    </div>
                );
        });
        return dataJSX;
    }
    
    render( ) {

        return(
            <div>
                <h4 className="ui center aligned header">{ this.props.title }</h4>
                {
                    this.state.loading ? this.renderLoading( ): 
                    this.state.posts ? this.renderUserdata( ):
                    this.renderError( )
                }
            </div>
        );
    }
}