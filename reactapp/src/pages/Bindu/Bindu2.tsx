import { Component } from "react";
import { Link,Outlet } from "react-router-dom";
import axios from '../../axios';
import { retriveDataFromRoute } from "../../utils/hoc";


interface IProps {
    title: any
    routeData: any;
}

interface IState {
    loading: boolean,
    users: { } [ ] | null,
    error: { message: string } | null;
}

class Bindu extends Component <IProps, IState> {

    state = { loading: true, users: null, error: null };

    componentDidMount ( ) {

        axios.get('/users') 
            .then(response => {
                this.setState( { loading: false, users: response.data, error: null } );
            } )
            .catch(error => { 
                this.setState( { loading: false, users: null, error: error } );
             } )
    }
             
    renderLoading( ) {

        const loadingJSX = <h4> Loading!!!!! </h4>
        return loadingJSX;
    }

    rendererror( ) { 

    const message = this.state.error ? this.state.error[ 'message' ] : '';
    const errorJSX = 
        <div>
            <div className="ui negative message">
               <h4> { message } </h4>
            </div>
            
        </div>
            return errorJSX;
    } 
    renderUserdata( )  {

        const users = this.state.users ? this.state.users : [ ];
        const dataJSX = users.map( (user: { name: string, email: string, id: number } ) => {
        return(
            <div key={ user.id } className="ui brown segment">
                <h4>{ user.name }</h4>
                <p>{ user.email }</p>
            </div>
            )
        });
        return dataJSX;
    }
        
   render( ) { 

        return( 
                <>            
                    <Link to='/' className="ui green button">Home</Link>
                    <Link to='/news/trendynews' className="ui orange button">News</Link>
                    <Link to='/Bindu/health' className="ui blue button">Health</Link>
                    <Link to='/Bindu/sports' className="ui pink button">Sports</Link>
                    { 
                        this.props.routeData.id ?
                            <>  
                                <h2 className="ui center aligned header">{ this.props.title }</h2>
                                <h3 className='ui header blue'>Route Data: { this.props.routeData.id }</h3>
                                {
                                    this.state.loading ? this.renderLoading( ) : 
                                    this.state.users ? <><h2> Datas of Users</h2>{ this.renderUserdata( )}</> : 
                                    <><h2>Error Data</h2>{ this.rendererror( ) }</>
                                }
                            </>:
                            <Outlet/>
                                
                    }
                </>
        )
   }    
} 

export default retriveDataFromRoute ( Bindu );
