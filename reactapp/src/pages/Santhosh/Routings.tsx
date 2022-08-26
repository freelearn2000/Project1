import { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { retriveDataFromRoute } from '../../utils/hoc';
import RImage from '../Santhosh/Resources/img-2.jpg';


interface IProps {
    routeData: any;
    location: any;
}

class Routings extends Component<IProps> {

    render( ) {

        return(
            <>
              <div className="ui two item menu">
                        <Link to='/Santhosh/Users' className={ this.props.location.pathname.includes('users')? 'active item': 'item'}>
                            <i className="icon"></i>Users</Link>
                        <Link to='/Santhosh/Posts' className={ this.props.location.pathname.includes('posts')? 'active item': 'item'}><i className="icon"></i>Posts</Link>
                    </div>
                    <div className="twelve wide  column"> 
                        <div className="ui segment">
                            <Outlet/>
                            { (this.props.location.pathname.includes('users') || this.props.location.pathname.includes('posts') )||
                            <img className="ui fluid image" src={ RImage } alt={""}></img> }
                        </div>	
                    </div>        
            </>     
        );
    }
}  


export default retriveDataFromRoute( Routings );