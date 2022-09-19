import { Component, useState, useEffect } from "react";
import axios from '../../axios';


interface IProps {
    title: string;
}

interface IState {
    loading: boolean;
    content: { } [ ] | null;
    error: { message: string } | null;
}

////Axios - Class Component

export class Nepal extends Component<IProps, IState> {

    state = { loading: true, content: null, error: null };

    componentDidMount( ) {

        axios.get('/comments')
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
        const errorJsx =
            <div>
                <div className="ui negative message">
                <i className="close icon"></i>
                    { message }
                </div>
            </div>
        return errorJsx;
    }

    renderData( ) {

        const datas = this.state.content ? this.state.content : [ ];
        const userJsx = datas.map( ( item: {id: number, name: string, email: string} ) => {
            return (
                <div key={ item.id } className="ui left aligned blue header message">
                    <h5>Name: { item.name }</h5>
                    <p>Email: { item.email }</p>
                </div>
            )
        });
        return userJsx;
    }

    render( ) {

        return (
            <div className="ui segment">
                <h2 className="ui center aligned header">{ this.props.title }</h2>
                {
                    this.state.loading ? this.renderLoading( ) :
                    this.state.content ? this.renderData( ) :
                    this.renderError( )    
                }
            </div>
        )   
    }
}

export const Bangladesh = ( props: any ) => {

    const [loading, setLoading] = useState<any>(true);
    const [content, setContent] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect( () => {
        axios.get('/todos')
            .then(response => {
                setLoading(false);
                setContent(response.data.splice(1,5));
                setError(null);
            })
            .catch(error => {
                setLoading(false);
                setContent(null);
                setError(error);
            })
    }, [] ) 

    const renderLoading = ( ) => {

        const loadingJSX = 
            <div>
                {/* <h2>{ props.title }</h2> */}
                <div className="ui segment">
                    <p>Loading...</p>
                    <div className="ui active dimmer">
                        <div className="ui loader">Please wait...</div>
                    </div>
                </div>
            </div>
        return loadingJSX;
    }

    const renderError = ( ) => {

        const message = error ? error[ `message` ] : '';
        const errorJSX =
            <div>
                <div className="ui negative message">
                <i className="close icon"></i>
                    { message }
                </div>
            </div>
        return errorJSX;
    }

    const renderData = ( ) => {

        const data = content ? content : [ ];
        const dataJsx = data.map( ( item: {id: number, title: string} ) => {
            return (
                <div key={ item.id } className="ui left aligned blue header message">
                    <h5>Id: { item.id }</h5>
                    <p>Title: { item.title }</p>
                </div>
            )
        });
        return dataJsx;
    }

    return(
        <div>
            <h4 className="ui center aligned header">{ props.title }</h4>
                
                {
                    loading ? renderLoading( ) :
                    content ? renderData( ) :
                    renderError( )    
                }
        </div>
    );
}

export const Country = ( ) => {
    return(
        <div> 
            <div className='ui segment'>
                <Nepal title=" Class Component"/>
            </div>
            <div className='ui segment'>
                <Bangladesh title=" Functional Component"/>
            </div>
        </div>
    );
}