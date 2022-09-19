import { Component } from 'react';
import axios from '../../axios';
import { retriveDataFromRoute } from '../../utils/hoc';


interface IProps {
    title: string;
    routeData: any;
    location: any;
}

interface IState {
    loading: boolean;
    users: {}[] | null;
    error: {message: string} | null;
}

class RouteData extends Component<IProps, IState> {

    state = {loading: true, users: null, error: null};
    
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

    renderError( ) {

        const errorMessage = this.state.error? this.state.error['message'] : '';
        const errorJSX = 
            <div>
                <div className = "ui negative message">
                    <p>{ errorMessage }</p>
                </div>
            </div>
        return errorJSX;
    }

    renderUserdata( ) {

        const users = this.state.users ? this.state.users : [ ];
        const dataJSX = users.map( ( user: { id: number, name: string, email: string}, index ) => {
            return(
                <div key={user.id + index} className = 'ui segment'>
                    <h4>Name: {user.name}</h4>
                    <p>Email: {user.email}</p>
                </div>
            );
        });
        return dataJSX;
    }

    render( ) {

        return(
            <div className= "ui basic segments">
                {
                    this.props.routeData.id&&
                    <h4 className='ui header blue'>Route Data: {this.props.routeData.id}</h4>
                }
                <div className= "ui segment">
                    {
                        this.props.routeData.id&&
                            <>
                                {
                                    this.state.loading ? this.renderLoading( ) :
                                    this.state.users ? <><h2 className= "ui center aligned header red">User Information </h2>{ this.renderUserdata( ) }</> :
                                    this.renderError( )
                                }
                            </>
                    }
                </div>
            </div>
        )
    }
}

export default retriveDataFromRoute( RouteData );


