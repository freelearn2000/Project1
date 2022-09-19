import { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { retriveDataFromRoute } from '../../utils/hoc';

interface IProps {
    title: string;
    location: any;   
}

class Radhika extends Component<IProps> {
      
    render( ) {

        return(
            <div>
                <h2 className="ui center aligned grey header message">{ this.props.title }</h2>
                <div className="ui grid"  style={{ backgroundColor: 'grey'}}>
                    <div className="four wide column">
                        <div className="ui secondary vertical menu">
                            <Link to='/radhika/axiosrr' className={ this.props.location.pathname.includes('axiosrr')? 'active item': 'item'}>Axios</Link>
                            <Link to='/radhika/routingg' className={ this.props.location.pathname.includes('routingg')? 'active item': 'item'}>Routing</Link>
                            <Link to='/radhika/musiccontext' className={ this.props.location.pathname.includes('musiccontext')? 'active item': 'item'}>Context</Link>
                            <Link to='searchref' className={ this.props.location.pathname.includes('searchref')? 'active item': 'item'}>Ref</Link>
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
export default retriveDataFromRoute( Radhika );
