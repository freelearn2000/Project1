import { Component } from 'react';
import { retriveDataFromRoute } from '../../utils/hoc';
import { Link, Outlet } from 'react-router-dom';


interface IProps {
    routeData: any;
}

class Routingz extends Component<IProps> {

    render( ) {
        return(
            <div>  
                <div>     
                    <Link to='/parvathy/routing/class' className="ui pointing green basic label">class</Link>&emsp;
                    <Link to='/parvathy/routing/functional' className="ui pointing green circular label">Functional</Link>
                </div>
                <br/>
                <div >
                    <Outlet/> 
                </div>
            </div>      
        );
    }
}  


export default retriveDataFromRoute( Routingz );