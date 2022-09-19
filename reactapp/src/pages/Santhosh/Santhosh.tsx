import { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { retriveDataFromRoute } from '../../utils/hoc';

interface IProps {
    title: string;
    location: any;   
}

class Santhosh extends Component<IProps> {
      
    render( ) {

        return(
            <div>
                <h2 className="ui center aligned blue header message">{ this.props.title }</h2>         
                <div className="ui grid" style={{ backgroundColor: 'lightblue'}}>
                    <div className="four wide column">
                        <div className="ui secondary vertical menu"> 
                        <Link to='/Santhosh/Home' className={ this.props.location.pathname.includes('Home')? 'active item': 'item'}>Home</Link>
                        <Link to='/Santhosh/Routings' className={ this.props.location.pathname.includes('routings')? 'active item': 'item'}>Routings</Link>
                        <Link to='/Santhosh/Axios' className={ this.props.location.pathname.includes('Axios')? 'active item': 'item'}>Axios</Link>
                        <Link to='/Santhosh/Context' className={ this.props.location.pathname.includes('Context')? 'active item': 'item'}>Context</Link>
                        <Link to='/Santhosh/Ref' className={ this.props.location.pathname.includes('Ref')? 'active item': 'item'}>Ref</Link>
                        </div>
                    </div>
                <div className="twelve wide stretched column">
                    <div className="ui segment">                     
                        <Outlet/>                  
                    </div>
                </div>
                </div> 
            </div>     
        );
    }
}

export default retriveDataFromRoute( Santhosh ) ;