import { Component } from 'react';
import axios from '../../axios';


interface IProps {
    
}
interface IState {
    loading: boolean;
    blogs: {}[] | null;
    error: {message: string} | null
}

export class FoodBlog extends Component<IProps, IState> {

    state = {loading: true, blogs: null, error: null};

    componentDidMount( ) {

        axios.get(`/posts`)
            .then(response => this.setState({loading: false, blogs: response.data, error: null}))
            .catch(error => this.setState({loading: false, blogs: null, error: error}));
    }

    renderLoading( ) {

        const loadingJSX = <h4>Loading...</h4>
        return loadingJSX;
    }

    renderBlogs( ) {

        const datas = this.state.blogs ? this.state.blogs : [ ];
        const dataJSX = datas.map( (item: any) => {
            return(
                    <p key={item.id}>{ item.title }</p>
            )
        });
        return dataJSX;
    }

    renderError( ) {

        const message = this.state.error ? this.state.error[`message`] : '';
        const errorJSX = (
            <div className="ui warning message">
                <div className="header">
                   {message}
                </div>
            </div>
        );
        return errorJSX;
    }

    render( ) {

      return (
        <div>
            <h2 className = "ui center aligned header">Food Blogs</h2>
            <br/>
            {
                this.state.loading ? this.renderLoading( ):
                this.state.blogs ? this.renderBlogs( ):
                <><h2> Error Data !!!!</h2>{this.renderError( )}</>
            }
        </div>
      );
    }
}
