import { Component } from "react";
import { Link } from 'react-router-dom';
import axios from '../../axios';
import { retriveDataFromRoute } from '../../utils/hoc';


interface IProps {
    title: string;
    routeData: any;
}

interface IState {
    loading: boolean;
    users: { } [ ] | null;
    error: { message: string } | null;
}

class Vishnupriya1 extends Component<IProps, IState> {

    state = { loading: true, users: null, error: null };

    componentDidMount( ) {

        axios.get('/users')
            .then(response => {
                this.setState( {loading: false, users: response.data, error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, users: null, error: error} );
            })
    }

    renderLoading( ) {

        const loadingJSX = 
            <div>
                <h2>{ this.props.title }</h2>
                <div className="ui segment">
                    <p>Loading...</p>
                    <div className="ui active dimmer">
                        <div className="ui loader">Please wait...</div>
                    </div>
                </div>
            </div>
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error ? this.state.error[ `message` ] : '';
        const errorJSX =
            <div>
                <div className="ui negative message">
                <i className="close icon"></i>
                    { message }
                </div>
            </div>
        return errorJSX;
    }

    renderUserData( ) {

        const users = this.state.users ? this.state.users : [ ];
        const userJSX = users.map( ( user: {id: number, name: string, email: string} ) => {
            return (
                <div key={ user.id } className="ui two segment">
                    <h5>Name: { user.name }</h5>
                    <p>Email: { user.email }</p>
                </div>
            )
        });
        return userJSX;
    }

    render( ) {

        return (
            <div>
                <h2 className="ui center aligned blue header message">{ this.props.title }</h2>
                <h4>Route Data: { this.props.routeData.id }</h4>
                <button className="ui button"><Link to='/' className="item">Home</Link></button>
                <button className="ui button"><Link to='/news/popular' className="item">News</Link></button>
                <button className="ui button"><Link to='/' className="item">Home</Link></button>
                <button className="ui button"><Link to='/' className="item">Home</Link></button>
                <br/>
                {
                    this.state.loading ? this.renderLoading( ) :
                    this.state.users ? this.renderUserData( ) :
                    this.renderError( )    
                }
            </div>
        )   
    }
}

export default retriveDataFromRoute( Vishnupriya1 );