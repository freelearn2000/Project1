import { Component } from 'react';
import { Link, Outlet } from "react-router-dom";


interface IProps {
    title: string;
}

export class Dhanya1 extends Component<IProps> {

    render( ) {
        return (
            <div className="ui internally celled grid">
                <div className="row">
                    <div className="sixteen wide column">
                        <h2 className="ui horizontal divider header">{this.props.title}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="sixteen wide column">
                        <Link to='/news/2' className="ui orange label">Go to News</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="three wide column">
                        <div className="ui vertical text menu">
                            <Link to='/dhanya/food' className="item">Food Blog</Link>
                            <Link to='/dhanya/travel' className="item">Travel Blog</Link>
                            <Link to='/dhanya/context' className="item">Context</Link>
                            <Link to='/dhanya/ref' className="item">Ref</Link>
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
