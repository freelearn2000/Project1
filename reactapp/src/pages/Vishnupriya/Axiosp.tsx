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

// Axios - Class Component
export class AxiosMobiles extends Component<IProps, IState> {

    state = { loading: true, content: null, error: null };

    componentDidMount( ) {

        axios.get('/api/v1/blogs')
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
        const dataJsx = datas.map( ( item: {id: number, name: string, content: string } ) => {
            return (
                <div className='ui two segment'>
                    <p key={ item.id }>{ item.name }</p>
                    <p>{item.content}</p>
                </div>
            )
        });
        return dataJsx;
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
     
//Axios - Functional Component

export const AxiosLaptops = ( props: any ) => {

    const [loading, setLoading] = useState<any>(true);
    const [content, setContent] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect( () => {
        axios.get('/api/v1/projects')
            .then(response => {
                setLoading(false);
                setContent(response.data.splice(0,5));
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
        const dataJsx = data.map( ( item: {id: number, name: string, duration: string} ) => {
            return (
                <div key={ item.id } className="ui two segment">
                    <h5>Name: { item.name }</h5>
                    <p>Body: { item.duration }</p>
                </div>
            )
        });
        return dataJsx;
    }

    return(
        <div>
            <h2 className="ui center aligned header">{ props.title }</h2>
                
                {
                    loading ? renderLoading( ) :
                    content ? renderData( ) :
                    renderError( )    
                }
        </div>
    );
}

export const Axiosp = () => {
    return(
        <div>
            <div>               
                <AxiosMobiles title="Class Component"/>
            </div>
            <div className='ui segment'>
                <AxiosLaptops title=" Functional Component"/>
            </div>
        </div>
    );
}

