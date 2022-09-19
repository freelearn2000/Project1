import { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { retriveDataFromRoute } from '../../utils/hoc';
import { UserContext } from '../../context/global';


interface IProps {
    title: string;
    location: any;
}

class Rakhi extends Component<IProps> {

    render( ) {

        return(
            <div className= "ui basic segments">
                <h1 className = "ui inverted header center aligned segment">{ this.props.title }</h1><br/>                
                <div className="ui basic segment">
                    <div className= "ui two column stackable grid container">
                        <div className="row">
                            <div className= "four wide column ">
                                <div className="ui inverted vertical fluid menu">
                                    <Link className={ this.props.location.pathname.includes('science')? 'active item': 'item'} to='science'>Axios - Class Component<i className="atom icon"></i></Link>
                                    <Link className={ this.props.location.pathname.includes('technology')? 'active item': 'item'} to='technology'>Axios - Functional Component<i className="keyboard outline icon"></i></Link>
                                    <Link to='/rakhi/users' className = "item">Route Params</Link>
                                    <Link to='context' className = "item">Context</Link>
                                    <Link to='refs' className = "item">Ref</Link>
                                </div>
                            </div>
                            <div className= "twelve wide column">
                                <div className='ui segment'>
                                    <UserContext.Provider value={{name:'Rakhi', viewMode:'Admin'}}>
                                        <Outlet/>
                                    </UserContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default retriveDataFromRoute( Rakhi );


