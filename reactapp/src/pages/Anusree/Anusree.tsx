import { Component } from 'react';
import { Link, Outlet } from "react-router-dom";
import { retriveDataFromRoute } from '../../utils/hoc';
import BlogImage from '../Anusree/Images/blog-image.jpg';
import { UserContext } from '../../context/global';


interface IProps {
    title: any;
    routeData: any;
    location: any;
}

interface IState {
    loading: boolean;
    users: { } [ ] | null;
    error: { message: string } | null;
}

class Anusree extends Component<IProps, IState> {
    
    render( ) {
        
        return(
                <>  
                    <h2 className="ui center aligned block header">{ this.props.title }</h2>
                    <Link to='context'><button className="ui button">Context</button></Link>
                    <Link to='useref'><button className="ui button">UseRef</button></Link>
                    <Link to='createref'><button className="ui button">CreateRef</button></Link>
                    
                    <div className="ui two item menu">
                        <Link to='travelblog' className={ this.props.location.pathname.includes('travel')? 'active item': 'item'}>
                            <i className="car icon"></i>Travell Blog</Link>
                        <Link to='foodblog' className={ this.props.location.pathname.includes('food')? 'active item': 'item'}><i className="mug hot icon"></i>Food Blog</Link>
                    </div>
                    <div className="segment">
                    { (this.props.location.pathname.includes('food') || this.props.location.pathname.includes('travel') || this.props.location.pathname.includes('context') || this.props.location.pathname.includes('useref') || this.props.location.pathname.includes('createref')) ||
                    <img className="ui fluid image" alt="Foodimage" src={ BlogImage }/> }
                        <UserContext.Provider value={{name:'Anusree', viewMode:'Admin'}}>
                            <Outlet/>
                        </UserContext.Provider>
                    </div>   
                    { this.props.routeData.travel && <p className='paragraph'>Route Data: { this.props.routeData.travel }</p> }
                </>
        )
    }
}

export default retriveDataFromRoute( Anusree );
