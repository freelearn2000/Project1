import { Component } from "react";
import { Link, Outlet } from 'react-router-dom';
import axios from '../../axios';
import { retriveDataFromRoute } from '../../utils/hoc';
import Imelec from '../Vishnupriya/images/elecimg.jpg';
import { User } from '../../context/global';


interface IProps {
    title: string;
    location: any;
}

interface IState {
    loading: boolean;
    content: { } [ ] | null;
    error: { message: string } | null;
}

class Electronics extends Component<IProps, IState> {

    state = { loading: true, content: null, error: null };

    componentDidMount( ) {

        axios.get('/comments')
            .then(response => {
                this.setState( {loading: false, content: response.data, error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, content: null, error: error} );
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
        const errorJsx =
            <div>
                <div className="ui negative message">
                <i className="close icon"></i>
                    { message }
                </div>
            </div>
        return errorJsx;
    }

    renderData( ) {

        const datas = this.state.content ? this.state.content : [ ];
        const ElectronicsJsx = datas.map( ( item: any ) => {
            return (
                <div key={ item.id } className="ui two segment">
                    <h5>Name: { item.name }</h5>
                    <p>Body: { item.body }</p>
                </div>
                    
               
            )
        });
        return ElectronicsJsx;
    }

    render( ) {

        return (
            
            <>
                <User.Consumer>
                    {user => (
                        <>  
                            <h4 className = "ui header blue"> Hi {user.name} !</h4>
                        </>
                    )}
                </User.Consumer>

                <h4 className="ui center aligned header">{this.props.title}</h4> 
                    <div className="row">
                        <div className="ui two column stackable grid container">
                            <div className="four wide  column">
                                <div className="ui vertical fluid menu">
                                    <div className="ui segment">
                                        <Link to='mobiles'className={this.props.location.pathname.includes('mobiles')? "active item" : "item"}><i className="mobile icon"></i>Mobiles</Link>
                                        <Link to='laptops'className={this.props.location.pathname.includes('laptops')? "active item" : "item"}><i className="laptop icon"></i>Laptops</Link>
                                    </div>
                                </div>
                            </div>   
                            <div className="twelve wide  column"> 
                                <div className="ui segment">
                                    <Outlet/>
                                    { (this.props.location.pathname.includes('mobiles') || this.props.location.pathname.includes('laptops') )||
                                    <img className="ui fluid image" src={Imelec} alt={"ProImage"}></img> }
                                </div>	
                            </div>
                        </div>
                    </div>
            </>
        )   
    }
}

export default retriveDataFromRoute( Electronics );