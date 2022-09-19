import { Component } from "react";
import { Link, Outlet } from 'react-router-dom';
import axios from '../../axios';
import { retriveDataFromRoute } from '../../utils/hoc';
import Imkerala from '../Viji/images/kerala.png';


interface IProps {
    title: string;
    location: any;
}

interface IState {
    loading: boolean;
    content: { } [ ] | null;
    error: { message: string } | null;
}

class State extends Component<IProps, IState> {

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
        const StateJsx = datas.map( ( item: any ) => {
            return (
                <div key={ item.id } className="ui two segment">
                    <h5>Name: { item.name }</h5>
                    <p>Body: { item.body }</p>
                </div>
                    
               
            )
        });
        return StateJsx;
    }

    render( ) {

        return (
            
            <>
                <h4 className="ui center aligned header">{this.props.title}</h4> 
                    <div className="row">
                        <div className="ui two column stackable grid container">
                            <div className="four wide  column">
                                <div className="ui vertical fluid menu">
                                    <div className="ui segment">
                                        <Link to='kollam'className={this.props.location.pathname.includes('kollam')? "active item" : "item"}>Kollam</Link>
                                        <Link to='kottayam'className={this.props.location.pathname.includes('kottayam')? "active item" : "item"}>Kottayam</Link>
                                    </div>
                                </div>
                            </div>   
                            <div className="twelve wide  column"> 
                                <div className="ui segment">
                                    <Outlet/>
                                    { (this.props.location.pathname.includes('kollam') || this.props.location.pathname.includes('kottayam') )||
                                    <img className="ui fluid image" src={Imkerala} alt={"ProImage"}></img> }
                                </div>	
                            </div>
                        </div>
                    </div>
            </>
        )   
    }
}

export default retriveDataFromRoute( State );