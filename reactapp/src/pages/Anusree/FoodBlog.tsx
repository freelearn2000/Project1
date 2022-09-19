import { Component } from "react";
import { Link, Outlet } from "react-router-dom";

import { retriveDataFromRoute } from '../../utils/hoc';
import axios from '../../axios';
import FoodImage from '../Anusree/Images/food-blog.jpg';
import { UserContext } from "../../context/global";


interface IProps {
    title: any;
    location: any;
}

class FoodBlog extends Component<IProps> {

    state={ loading: true, foods: null, error: null };
    
    componentDidMount( ) {

        axios.get('/posts')
            .then(response => {
                this.setState( {loading: false, foods:  (response.data).splice(0,5), error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, foods: null, error: error} );
            })
    }

    renderLoading( ) {

        const loadingJSX =

            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading user data...</div>
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

        const foods = this.state.foods ? this.state.foods : [ ];
        const dataJSX = foods.map( (food: any ) => {
           return( 
                <div key={ food.id } className="ui segment">
                    <h4>{ food.title }</h4>
                    <p>{ food.body }</p>
                </div>
           )
        });
        return dataJSX;
    }

    render( ) {

        return(
            <>
                <h2 className="ui center aligned header">{ this.props.title }</h2>
                <div className="ui segment block center aligned grid">
                        <UserContext.Consumer>
                            { user =>
                                (
                                    <> 
                                        Welcome {user.name}!<br/>
                                        You are viewing {user.viewMode}
                                    </>
                                )
                            }
                        </UserContext.Consumer>
                    </div>
                <div className="ui basic segment">
                    <Link to='pizza?content=laudantium enim quasi est quidem magnam voluptate ipsam eos' className="ui yellow label"><i className="pizza slice icon"></i>Pizza</Link>
                </div>
                { this.props.location.pathname.includes('pizza') || <img className="ui fluid image" alt="Foodimage" src={ FoodImage }/>}
                { this.props.location.pathname.includes('pizza') ? <Outlet/>:
                    (this.state.loading ? this.renderLoading( ):
                    this.state.foods ? <>{ this.renderData( ) }</>:
                    <><h2>Error Data</h2>{ this.renderError( )}</>) 
                }
                   
            </>
        )
    }
}


export default retriveDataFromRoute( FoodBlog );