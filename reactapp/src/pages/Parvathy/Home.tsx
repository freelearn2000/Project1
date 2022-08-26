import { Component } from "react";
import picture from "./pictures/catimg1.png";
import { connect } from 'react-redux';


interface Props {
    userDetails: any;
    onUserSave: any;
}

class Home extends Component<Props> {

    onClickHandler = ( ) => {
        this.props.onUserSave('Bill Gates', 65)
    }

    render() {

        return (
            <div className="ui center aligned">
                <h2 className="ui center aligned header"><span className="ui inverted green text" >Welcome&emsp;</span>{this.props.userDetails}</h2>
                <button className="ui green basic button" onClick={ this.onClickHandler }>Change State</button><br/><br/>
                {/* <h3 className="ui center aligned teal header">A room without books is like a body without a soul.</h3> */}
                <div className="ui image">
                    <img alt={ picture } src={ picture } />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        userDetails: state.userKey.name
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
       onUserSave: (name: string, age: number) => dispatch({type: 'ADD_USER', payload: {Name: name, Age: age}} )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);