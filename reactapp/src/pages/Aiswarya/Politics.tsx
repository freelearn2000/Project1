import { Component } from "react";
import axios from '../../axios';

interface IProps {
    title: any;
}

export class Politics extends Component <IProps> {

    state = { loading: true, politics: null, error: null };

    componentDidMount ( ) {

        axios.get('/todos')
            .then(response => {
                this.setState( { loading: false, politics: response.data.slice(0,5), error: null} );
            })
            .catch(error => {
                this.setState( { loading: false, politics: null, error: error} );
            })  
        }

    renderLoading( ) {

        const loadingJSX = 
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading User Data..!!</div>
            </div>  
        return loadingJSX;
    }

    rendererror( ) {

        const message = this.state.error? this.state.error['message'] : '';
        const errorJSX = 
            <div>
                <h4>{ message }</h4>
            </div>
        return errorJSX;
    }

    renderUserdata( ) {
        
        const politics = this.state.politics ? this.state.politics : [ ];
        const DataJSX = politics.map( (politic: any) => {
            return (
                <div key={ politic.id } className="ui segment">
                   <h4>{ politic.title}</h4>
                    </div>
            )
        });
    return DataJSX;
    }

    render( ) {

        return (
            <>
                <h2 className="ui center aligned header">{ this.props.title }</h2>
                {
                    this.state.loading ? this.renderLoading( ):
                    this.state.politics ? this.renderUserdata( ):
                    <><h2> Error Data !!!!</h2>{this.rendererror( )}</>
                }
            </>
        )
    }
}
