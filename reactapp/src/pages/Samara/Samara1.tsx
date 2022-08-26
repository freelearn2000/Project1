import { Component } from 'react';
import axios from '../../axios';
import { Link, Outlet } from 'react-router-dom';
import { retriveDataFromRoute } from '../../utils/hoc'


interface IProps {
    title: string;
    routeData: any;
}

interface IState {
    loading: boolean;
    data: { } [ ] | null;
    error: { message: string } | null;
}

class Samara1 extends Component<IProps, IState> {

    state = { loading: true, data: null, error: null };

    componentDidMount( ) {

        axios.get('/users')
        .then(response => {
            this.setState( {loading: false, data: response.data, error: null} );
        })
        .catch(error => {
            this.setState( {loading: false, data: null, error: error} );
        })
    }

    renderLoading( ) {

        const loadingJSX = 
            <div className = "ui segment">
                <div className = "ui active inverted dimmer">
                    <div className = "ui text loader">Loading</div>
                </div>
            </div>
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error? this.state.error[ 'message' ] : '';
        const errorJSX = 
            <div>
                <h3 className = "ui red message">{ message }</h3>
            </div>
        return errorJSX;
    }

    renderData( ) {

        const data = this.state.data ? this.state.data : [ ];
        const dataJSX = data.map( (item: {id: number, name: string, email: string} ) => {
            return (
                <div key = { item.id } className="ui floating message">
                    <h4>{ item.name }</h4>
                    <p>Email : { item.email }</p>
                </div>
            );
        });
        return dataJSX
    }
    
    render( ) {
        
        return(
            <div>  
                <h2 className="ui center aligned header message">{ this.props.title }</h2>
                <Link to='/' className="ui purple button">Home</Link>
                <Link to='/about/ContactNo/8456' className="ui purple button">About</Link>
                &emsp;&emsp;&emsp;&emsp;
                <Link to='/samara/canadaweather' className="ui teal button">Canada</Link>
                <Link to='/samara/polandweather' className="ui teal button">Poland</Link>
                {
                    this.props.routeData.id ?
                        <>
                            <h4 className='ui header blue'>Route Data: { this.props.routeData.id }</h4>
                                    {
                                        this.state.loading ? this.renderLoading( ) : 
                                        this.state.data ? <>{ this.renderData( ) }</>: 
                                        this.renderError( )
                                    }
                        </>:<Outlet/>
                }
            </div>
        );
    }
}


export default retriveDataFromRoute( Samara1 );