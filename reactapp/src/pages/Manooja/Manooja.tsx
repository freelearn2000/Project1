import { Component } from 'react';
import { Link, Outlet } from "react-router-dom";
import axios from '../../axios';
import { retriveDataFromRoute } from  '../../utils/hoc';


interface IState {
    loading: boolean, 
    users: { } [ ] | null, 
    error: { message: string } | null;
}

interface IProps {
    title: any;
    routeData: any;
    location: any;
}

class Manooja extends Component<IProps, IState> {

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

        const message = this.state.error? this.state.error[ 'message' ]: '';
        const errorJSX =
        <div>
            <h2 className = "ui center aligned header">
                { this.props.title }
            </h2>
            <div className = "ui negative message">
                <p>{ message }</p>
            </div>  
        </div> 
        return errorJSX;
    }

    renderUserdata( ) {

        const users = this.state.users ? this.state.users : [ ];
        const dataJSX = users.map( ( user: {name: string, email: string, id: number} ) => {

            return (
                <div className = "ui segment" key = { user.id }>
                    <h4>Name : { user.name } </h4>
                    <p>Email : { user.email } </p>
                </div>    
            );
        });
        return dataJSX;
    }

    render( ) {

        return(
            <div>
                <h2 className="ui center aligned green header">{ this.props.title }</h2>
                    <div className="ui grid">
                        <div className="four wide column">
                            <div className="ui vertical fluid menu">
                                <Link to='/manooja/index' className={ this.props.location.pathname.includes('Mhome')? 'active item': 'item'}>Home</Link>
                                <Link to='/manooja/axios1' className={ this.props.location.pathname.includes('axios1')? 'active item': 'item'}>Axios</Link>
                                <Link to='/manooja/routing1' className ={ this.props.location.pathname.includes('routing1')? 'active item': 'item'}>Route Params</Link>
                                <Link to='/manooja/contextyoga' className={ this.props.location.pathname.includes('contextyoga')? 'active item': 'item'}>Context</Link>
                                <Link to='/manooja/ref' className={ this.props.location.pathname.includes('ref')? 'active item': 'item'}>Ref</Link>
                            </div>
                        </div>
                        <div className="twelve wide stretched column">
                            <div className="ui segment">
                            {
                            this.props.routeData.id ?
                                <>    
                                    {
                                        this.state.loading ? this.renderLoading( ): 
                                        this.state.users ? <><h3 className="ui center aligned header">Details</h3>{ this.renderUserdata( ) }</>:
                                        this.renderError( )
                                    }
                                </>:
                                <Outlet/>
                            }
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default retriveDataFromRoute(Manooja);
