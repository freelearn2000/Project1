import { Component } from 'react';
import Imshopcart from '../Vishnupriya/images/shopcartimg.jpg';
import { connect } from 'react-redux';


interface Props {
    userName: any;
    onUserSave: any;
}

class ShoppingCart extends Component<Props> {   
    
    onClickHandler = () => {
        // Dispatch ADD_USER action
        this.props.onUserSave('Bill Gates', 65)
    }
    
    render() {
        return (
            <>
                 <h2 className="ui center aligned grey header message"><span className="ui inverted black text" >Welcome!!&emsp;</span>{this.props.userName}</h2>
                 <button className="ui grey basic button" onClick={this.onClickHandler}>Change State</button><br/><br/>                
                <img className="ui fluid image" src={ Imshopcart } alt=""/>
            </>
        );
    }
} 
    

const mapStateToProps = (state: any) => {
    return {
        userName: state.userKey.name
    }
}

const mapDispatchToProps = ( dispatch: any ) => {
    return {
        onUserSave: (name: string, age: number) => dispatch({type: 'ADD_USER', payload: {Name: name, Age: age}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);

