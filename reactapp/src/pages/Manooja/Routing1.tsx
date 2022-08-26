import { Component } from 'react';
import { retriveDataFromRoute } from '../../utils/hoc';


interface IState {
    loading: boolean,
    users: { } [ ] | null,
    error: { message: string } | null, 
}

interface IProps {
    title: string;
    routeData: any;
}

class Routing1 extends Component<IProps, IState> {

    render( ) {

        return(
            <div className="ui center aligned message">
                <div className="content">
                    <div className="header">
                        <p>Route Data: { this.props.routeData.id }</p>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default retriveDataFromRoute( Routing1 );