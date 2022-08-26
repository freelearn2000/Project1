import { Component } from 'react';
import { connect } from 'react-redux';


interface IProps {
    title: string;   
    userName: any;
    onUserSave: any;
}

class Entertainment extends Component<IProps> {

    onClickHandler = ( ) => {

        this.props.onUserSave( 'Jovan');
    }

    render( ) {

        return (
            <div>
                <h2 className="ui center aligned grey header message">{ this.props.title }
                &nbsp;&nbsp;&nbsp; {this.props.userName}</h2>
                <button className="ui positive button" onClick={ this.onClickHandler }>Change</button>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        userName: state.userKey.name
    }
}

const mapDispatchToProps = (dispatch: any) => {

    return {
        
            onUserSave: (name: String) => dispatch({type: 'ADD_USER',payload: {Name: name}})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Entertainment);