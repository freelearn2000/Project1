import { Component } from "react";
import { retriveDataFromRoute } from '../../utils/hoc';

interface IProps {
    title: any;
    location: any;
}



class SubPage extends Component<IProps> {
    search = this.props.location.search;
    content = new URLSearchParams(this.search).get('content');
    contents = String(this.content).repeat(10)
    // console.log(content);

    render( ) {

        return(
            <div className="ui segment">
                <h2 className="ui center aligned header">{ this.props.title }</h2>
                <p className="paragraph">{ this.contents }</p>
                
            </div>
        );
    }
}



export default retriveDataFromRoute(SubPage);