import { Component, useEffect, useState } from 'react';
import axios from '../../axios';


interface IProps {
    title: string;
}

interface IState {
    loading: boolean;
    data: { } [ ] | null;
    error: { message: string } | null;
}

export class AxiosSample1 extends Component<IProps, IState> {

    state = { loading: true, data: null, error: null };

    componentDidMount( ) {

        axios.get('/posts')
        .then(response => {
            this.setState( {loading: false, data: (response.data).splice(0, 5), error: null} );
        })
        .catch(error => {
            this.setState( {loading: false, data: null, error: error} );
        })
    }

    renderLoading( ) {

        const loadingJSX = 
            <div className = "ui segment">
                <div className = "ui active inverted dimmer">
                    <div className = "ui text loader">Loading</div>
                </div>
            </div>
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error? this.state.error[ 'message' ] : '';
        const errorJSX = 
            <div>
                <h3 className = "ui red message">{ message }</h3>
            </div>
        return errorJSX;
    }

    renderData( ) {

        const datas = this.state.data ? this.state.data : [ ];
        const dataJSX = datas.map( (item: any) => {
                return (
                    <div key = { item.id } className="ui floating message">
                        <h4>Title : { item.title }</h4>
                        <p>Content : { item.body }</p>
                    </div>
                );
            }
        );
        return dataJSX
    }
    
    render( ) {
        
        return(
            <div>
                <h2 className="ui center aligned header">{ this.props.title }</h2>
                    {
                        this.state.loading ? this.renderLoading( ):
                        this.state.data ? <>{ this.renderData( ) }</>:
                        <><h2>Error Data</h2>{ this.renderError( )}</>
                    }
            </div>
        );
    }
}

// Axios in Functional Component
export const AxiosSample2 = ( props: any ) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect( ( ) => {

        axios.get('/albums')
            .then( response => { 
                setLoading(false);
                setData((response.data).splice(0, 5));
                setError(null)})
            .catch( error => { 
                setLoading(false);
                setData(null);
                setError(error)} )

    }, [] );


    const renderLoading = ( ) => {

        const loadingJSX = 
            <div className = "ui segment">
                <div className = "ui active inverted dimmer">
                    <div className = "ui text loader">Loading</div>
                </div>
            </div>
        return loadingJSX;
    }

    const renderError = ( ) => {

        const message = error? error[ 'message' ] : '';
        const errorJSX = 
            <div>
                <h3 className = "ui red message">{ message }</h3>
            </div>
        return errorJSX;
    }

    const renderData = ( ) => {

        const datas = data ? data : [ ];
        const dataJSX = datas.map( (item: any) => {
                return (
                    <div key = { item.id } className="ui floating message">
                        <h4>ID : { item.id }</h4>
                        <p>Title : { item.title }</p>
                    </div>
                );
            }
        );
        return dataJSX
    }

    return (

        <div>
            <h2 className="ui center aligned header">{ props.title }</h2>
                {
                    loading ? renderLoading( ):
                    data ? <>{ renderData( ) }</>:
                    <><h2>Error Data</h2>{ renderError( )}</>
                }
        </div>
    );
}

export const AxiosSample = ( ) => {
    return (
        <div className="ui basic segments">
            <div className="ui segment">
                <AxiosSample1 title="Class Component" />
            </div>
            <div className="ui segment">
                <AxiosSample2 title="Functional Component"/>
            </div>
        </div>
    );
}


