import { Component } from "react";
import axios from  '../../axios';
import { Link } from "react-router-dom";
import { retriveDataFromRoute } from '../../utils/hoc';



interface IState {
    loading: boolean, 
    users: { } [ ] | null, 
    error: { message: string } | null;
}

interface IProps {
    title: string;
    routeData: any;
}

export class Viji1 extends Component <IProps, IState> {

    state = { loading: true, users: null, error: null };

    componentDidMount( ) {

        // Intitiate API call from here
        axios.get('/users')
            .then(response => {
                this.setState( {loading: false, users: response.data, error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, users: null, error: error} );
            })               
    }
        
    renderLoading( ) {

        const loadingJSX = <h4>Loading....</h4>
        return loadingJSX;
    }
        
    renderError( ) {

        const message = this.state.error? this.state.error[ 'message' ] : '';
        const errorJSX =
        <div>
        <h2>This is Viji's Component</h2>
        <h4>{ message }</h4>
        </div> 
        return errorJSX;
    }
        
    renderUsersData( ) {

        const users = this.state.users ? this.state.users : [ ];
        const userJSX = users.map( (items: {id: number, name: string, email: string}, index) => {
        return (
            <div key = { items.id } className = 'ui red segment'>
            <div className = "ui tertiary inverted segment">
                <span className = "ui black text">
                    <h5>Name: { items.name }</h5>
                    <h5>Email: { items.email }</h5>
                </span>
            </div>
            </div>
        )
        });
        return userJSX;
    }
        
    render( ) {

        return (
            <div>
            <h2 className = "ui center aligned green header">{ this.props.title }</h2>
            <br/>
            <h4>Route Data: { this.props.routeData.id }</h4>
            <button className = "ui button"><Link to='/' className="item">Home</Link></button>
            <button className = "ui button"><Link to='/news/business' className="item">News</Link></button>
            <br/>
            {
                this.state.loading ? this.renderLoading( ):
                this.state.users ? this.renderUsersData( ):
                this.renderError( )    
            }
            </div>
        )   
    }
} 

export default retriveDataFromRoute(Viji1);