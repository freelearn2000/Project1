import { Component } from 'react';
import { retriveDataFromRoute } from '../../utils/hoc';

interface IProps {
    routeData: any;
}

class About extends Component<IProps> {

    state = {data: 'Welcome to our component state.', xyz: {name: 'steve'}};

    onClickHandler = ( ) => {
        // console.log(`NewsPage button clicked!!!`);
        this.setState({data: 'Bye from our component state.', xyz: {name: 'tom'}});
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if ( this.state.data !== nextState.data) {
            return true;
        }
        return false;
    }

    // Initialization
    componentDidMount( ) {
        // console.log(`NewsPage componentDidMount`);
    }

    // State Update
    componentDidUpdate( ) {
        // console.log(`NewsPage componentDidUpdate`);
    }

    // Destructor
    componentWillUnmount( ) {
        // console.log(`NewsPage componentWillUnmount`);
    }


    render( ) {
        // console.log(`NewsPage render`);
        
        const objLength = Object.keys(this.props.routeData).length

        return (
            <div>
                <h1>This is About Component</h1>
                <br/>
                { objLength > 0 &&
                    <h4 className='ui header blue'>{ this.props.routeData.contact } : { this.props.routeData.email }</h4>
                }
                <p>{this.state.data} !!!</p>
                <br/>
                <div className="ui buttons">
                    <button className="ui button">Cancel</button>
                    <div className="or"></div>
                    <button className="ui positive button" onClick={ this.onClickHandler }>Save</button>
                </div>
            </div>
        );
    }
}

export default retriveDataFromRoute( About );