import { Component } from "react";
import axios from '../../axios';

interface IProps {
    title: any;
}

export class Nature extends Component<IProps> {

    state={ loading: true, nature: null, error: null };
    
    componentDidMount( ) {

        axios.get('/posts')
            .then(response => {
                this.setState( {loading: false, nature: response.data.splice(0,3), error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, nature: null, error: error} );
            })
    }

    renderLoading( ) {

        const loadingJSX =
        <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading ..</div>
        </div>
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error? this.state.error[ 'message' ] : '';
        const errorJSX = 
        <div className='ui negative message'>
            <h4>{ message }</h4>
        </div>
        return errorJSX;
    }

    renderUserdata( ) {

        const nature = this.state.nature ? this.state.nature : [ ];
        const dataJSX = nature.map( (nature: any ) => {
           return( 
            <div key={ nature.id } className="ui segment">
                <h4>{ nature.title }</h4>
                <p>{ nature.body }</p>
            </div>
           )
        });
        return dataJSX;
    }

    render( ) {

        return(
            <>
                <h2 className="ui center aligned header">Class Component</h2>
                    {
                        this.state.loading ? this.renderLoading( ):
                        this.state.nature ? <>{ this.renderUserdata( ) }</>:
                        <><h2>Error Data</h2>{ this.renderError( )}</>
                    }
            </>
        )
    }
}
