import { Component } from "react";
import { Link, Outlet } from 'react-router-dom';
import { retriveDataFromRoute } from '../../utils/hoc';
import axios from '../../axios';
import { UserContext } from "../../context/global";


interface IProps {
    title: any;
    location: any;
}

// Axios in Class Component
class ScienceBlog extends Component<IProps> {

    state = { loading: true, science: null, error: null };
    
    componentDidMount( ) {

        axios.get('/posts')
            .then(response => {
                this.setState( {loading: false, science: (response.data).splice(0, 5), error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, science: null, error: error} );
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

        const message = this.state.error? this.state.error[ 'message' ] : '';
        const errorJSX = 
            <div className='ui negative message'>
                <h4>{ message }</h4>
            </div>
        return errorJSX;
    }

    renderData( ) {

        const science = this.state.science ? this.state.science : [ ];
        const dataJSX = science.map( (data: any ) => {
           return( 
                <div key={ data.id } className="ui segment">
                    <h4>{ data.title }</h4>
                    <p>{ data.body }</p>
                </div>
           )
        });
        return dataJSX;
    }

    render( ) {

        return(
            <>
                <div className="ui segment block header inverted blue center aligned">
                    <UserContext.Consumer>
                        { user =>
                            (
                                <> 
                                    Welcome {user.name}!<br/>
                                    Enjoy the {user.viewMode}'s View!
                                </>
                            )
                        }
                    </UserContext.Consumer>
                </div>
                <h2 className= "ui center aligned header red">{ this.props.title }</h2>
                <Link to='top' className = "ui label red">Week's top</Link>
                    {
                        this.props.location.pathname.includes('top')?<Outlet/>:
                        <>
                            {	
                                this.state.loading ? this.renderLoading( ) :
                                this.state.science ? this.renderData( ) :
                                this.renderError( )
                            }
                        </>
                    }
            </>
        )
    }
}

export default retriveDataFromRoute(ScienceBlog);