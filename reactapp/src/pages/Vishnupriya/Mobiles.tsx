import { Component } from "react";
import axios from '../../axios';


interface IProps {
    title: string;
}

interface IState {
    loading: boolean;
    content: { } [ ] | null;
    error: { message: string } | null;
}

// Axios - Class Component
export class Mobiles extends Component<IProps, IState> {

    state = { loading: true, content: null, error: null };

    componentDidMount( ) {

        axios.get('/todos')
            .then(response => {
                this.setState( {loading: false, content: response.data.splice(0,5), error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, content: null, error: error} );
            })
    }

    renderLoading( ) {

        const loadingJSX = 
            <div>
                <h2>{ this.props.title }</h2>
                <div className="ui segment">
                    <p>Loading...</p>
                    <div className="ui active dimmer">
                        <div className="ui loader">Please wait...</div>
                    </div>
                </div>
            </div>
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error ? this.state.error[ `message` ] : '';
        const errorJSX =
            <div>
                <div className="ui negative message">
                <i className="close icon"></i>
                    { message }
                </div>
            </div>
        return errorJSX;
    }

    renderData( ) {

        const datas = this.state.content ? this.state.content : [ ];
        const dataJsx = datas.map( ( item: {id: number, title: string} ) => {
            return (
                <div className='ui segment'>
                    <p key={ item.id }>{ item.title }</p>
                </div>
            )
        });
        return dataJsx;
    }

    render( ) {

        return (
            <div> 
                <h4 className="ui center aligned header">{ this.props.title }</h4>
                {
                    this.state.loading ? this.renderLoading( ) :
                    this.state.content ? this.renderData( ) :
                    this.renderError( )    
                }               
            </div>
        )   
    }
}

