import { Component } from 'react';
import { connect } from 'react-redux';


interface IProps {
    title: string;   
    userDetails: any;
}

class Mhome extends Component<IProps> {

    render( ) {

        return (
            <div>
                <h2 className="ui center aligned green header message">{ this.props.title }
                &nbsp;&nbsp;&nbsp;{this.props.userDetails}</h2>
                 
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        userDetails: state.userKey.name
    }
}

export default connect(mapStateToProps)(Mhome);