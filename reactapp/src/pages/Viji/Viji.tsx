import { Component } from "react";
import { Link, Outlet } from 'react-router-dom';
import { retriveDataFromRoute } from '../../utils/hoc';


interface IProps {
    title: string;
    location: any;    
}

class Viji extends Component<IProps> {

    render( ) {

        return (
            <div>
                <h2 className="ui center aligned gray header message">{ this.props.title }</h2>
                    <div className="column">
                        <div className="ui stackable container menu">
                            <Link to='/Viji/gis' className ={this.props.location.pathname.includes('gis')? "active item" : "item"}>Map</Link>
                            <Link to='country' className={this.props.location.pathname.includes('country')? "active item" : "item"}>Axios</Link>
                            <Link to='state' className={this.props.location.pathname.includes('state')? "active item" : "item"}>Routing</Link>
                            <Link to='/viji/contextcolor' className ={this.props.location.pathname.includes('contextcolor')? "active item" : "item"}>Context</Link>
                            <Link to='/viji/MyRefExample' className ={this.props.location.pathname.includes('MyRefExample')? "active item" : "item"}>Ref</Link>
                            </div>
                        <div className="three wide raw">
                            <Outlet/>
                        </div>
                    </div>
            </div>
            
        )   
    }
}

export default retriveDataFromRoute( Viji );
//export default Viji;