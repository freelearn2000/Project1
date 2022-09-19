import { Component } from "react";
import { Link, Outlet } from 'react-router-dom';
import { User } from "../../context/global";
import { retriveDataFromRoute } from '../../utils/hoc';
import  ImLogo  from '../Vishnupriya/images/logo.png';


interface IProps {
    title: string; 
    location: any; 
}

class Vishnupriya extends Component<IProps> {

    render( ) {

        return (
            <div>
                <h2 className="ui center aligned gray header message">{ this.props.title }</h2>
                    <div className="column">
                        <div className="ui stackable container menu">
                            <div className="item">
                                <img src={ImLogo} alt={ImLogo} ></img>
                            </div>
                                <Link to='shoppingcart' className={this.props.location.pathname.includes('shoppingcart')? "active item" : "item"}>Shopping Cart</Link>
                                <Link to='axiosp' className={this.props.location.pathname.includes('axiosp')? "active item" : "item"}>Axios</Link>
                                <Link to='electronics' className={this.props.location.pathname.includes('electronics')? "active item" : "item"}>Routing</Link>
                                <Link to='contextz' className ={this.props.location.pathname.includes('contextz')? "active item" : "item"}>Context</Link>
                                <Link to='refz' className={this.props.location.pathname.includes('refz')? "active item" : "item"}>Ref</Link>
                            </div>
                        <div className="four wide raw">
                            <User.Provider value={{name:"Vishnupriya", userRole:'Admin'}}>
                                <Outlet/>
                            </User.Provider>
                        </div>
                    </div>
            </div>
        )   
    }
}

export default retriveDataFromRoute( Vishnupriya );