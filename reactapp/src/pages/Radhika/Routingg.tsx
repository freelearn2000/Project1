import { Component } from 'react';
import { retriveDataFromRoute } from '../../utils/hoc';
import { Link, Outlet } from 'react-router-dom';


interface IState {
    loading: boolean,
    users: { } [ ] | null,
    error: { message: string } | null, 
}

interface IProps {
    title: string;
    routeData: any;
    location: any;
}

class Routingg extends Component<IProps, IState> {

    render( ) {

        return(
            <div className="ui two column stackable grid container">
                <div className="four wide  column">
                    <div className="ui vertical fluid menu">
                        <div className="ui segment">
                            <Link to='/radhika/routingg/art' className={ this.props.location.pathname.includes('Art')? 'active item': 'item'}>News</Link>
                            <Link to='/radhika/routingg/dance' className={ this.props.location.pathname.includes('Dance')? 'active item': 'item'}>Posts</Link> 
                        </div>
                    </div>
                </div>
                <div className="twelve wide  column"> 
                    <div className="ui segment">
                        <Outlet/>
                    </div>
                </div>
            </div>
        );
    }
}

export default retriveDataFromRoute( Routingg );