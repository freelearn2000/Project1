import { Component } from 'react';
import { Link, Outlet } from "react-router-dom";
import { retriveDataFromRoute } from '../../utils/hoc';


interface IProps {
    title: string;
    location: any;
}

class Bindu extends Component<IProps> {

    render( ) {
        return (
            <div className="ui internally celled grid">
                <div className="row">
                    <div className="sixteen wide column">
                        <h2 className="ui center aligned brown header message">{this.props.title}</h2>
                    </div>
                </div>
                <div className="row"  >
                    <div className="three wide column"  style={{ backgroundColor: 'wheat'}}>
                        <div className="ui secondary vertical menu">
                            <Link to='/bindu/bhome' className={ this.props.location.pathname.includes('bhome')? 'active item': 'item'}>Home</Link>
                            <Link to='/bindu/api' className={ this.props.location.pathname.includes('api')? 'active item': 'item'}>Axios</Link>
                            <Link to='/bindu/sports' className={ this.props.location.pathname.includes('sports')? 'active item': 'item'}>Context</Link>
                            <Link to='/bindu/Ref' className={ this.props.location.pathname.includes('Ref')? 'active item': 'item'}>Ref</Link>
                            <Link to='/bindu/Rootingb' className={ this.props.location.pathname.includes('Rootingb')? 'active item': 'item'}>Routing</Link>
                        </div>
                    </div>
                    <div className="thirteen wide column">
                        <Outlet/>
                    </div>
                </div>
            </div>
        );
    }
}
export default retriveDataFromRoute( Bindu );