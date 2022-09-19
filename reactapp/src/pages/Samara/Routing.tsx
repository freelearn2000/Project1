import { Component } from 'react';
import { retriveDataFromRoute } from '../../utils/hoc';
import { Link, Outlet } from 'react-router-dom';
import WeatherImage from '../Samara/weather.jpg';


interface IProps {
    routeData: any;
    location: any;
}

class Routing extends Component<IProps> {

    render( ) {
        return(
            <div>  
                <div>     
                    <Link to='/samara/routing/class' className="ui blue button">Canada Weather</Link>
                    <Link to='/samara/routing/functional' className="ui blue button">Poland Weather</Link>
                </div>
                <br/>
                <div >
                    { this.props.location.pathname.endsWith('routing') ?
                        <img className="ui fluid image" src={ WeatherImage } alt=""/>:
                        <Outlet/> }
                </div>
            </div>      
        );
    }
}  


export default retriveDataFromRoute( Routing );
