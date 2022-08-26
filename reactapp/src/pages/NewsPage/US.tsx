import { Component } from "react";
import axios from '../../axios';


interface IProps {
    
}
interface IState {
    loading: boolean,
    content: { } [ ] | null,
    error: { message: string } | null;
} 

export class US extends Component <IProps, IState> {

    state = { loading: true, content: null, error: null };

    componentDidMount ( ) {

        axios.get('/todos')
            .then(response => {
                this.setState( { loading: false, content: response.data, error: null} );
            })
            .catch(error => {
                this.setState( { loading: false, content: null, error: error} );
            })  
        }

    renderLoading( ) {

        const loadingJSX = 
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading Content..!!</div>
            </div>  
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error? this.state.error['message'] : '';
        const errorJSX = 
            <div>
                <h4>{ message }</h4>
            </div>
        return errorJSX;
    }

    renderContent( ) {
        
        const datas = this.state.content ? this.state.content : [ ];
        const dataJSX = datas.map( (item: any) => {
            return(
                    <p key={item.id}>{ item.title }</p>
            )
        });
        return dataJSX;
    }

    render( ) {

        return (  
            <div>
                <h2 className = "ui center aligned header">US</h2>
                <br/>
                {
                    this.state.loading ? this.renderLoading( ):
                    this.state.content ? this.renderContent( ):
                    <><h2> Error Data !!!!</h2>{this.renderError( )}</>
                }
            </div>
        )
    }
}
