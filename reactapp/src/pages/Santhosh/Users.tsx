import { Component, useEffect, useState } from "react";
import axios from '../../axios';

interface IProps {
    title: any;
}

// Axios in Class component
export class Users extends Component<IProps> {

    state = {loading: true, users: null, error: null};
    
    componentDidMount( ) {
        
        axios.get('/users')
            .then(response => {
                this.setState( {loading: false, users: response.data.slice(0,5), error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, users: null, error: error} );
            })
    }

    renderLoading( ) {

        const loadingJSX =  
            <div className = "ui icon message">
                <i className = "notched circle loading icon"></i>
                <div className = "content">
                    <div className = "header">
                        Just one second
                    </div>
                    <p>We're fetching that content for you.</p>
                </div>
            </div>
        return loadingJSX;
    }

    renderError( ) {

        const errorMessage = this.state.error? this.state.error['message'] : '';
        const errorJSX = 
            <div>
                <div className = "ui negative message">
                    <p>{ errorMessage }</p>
                </div>
            </div>
        return errorJSX;
    }

    renderUserdata( ) {

        const users = this.state.users ? this.state.users : [ ];
        const dataJSX = users.map( ( user: { id: number, name: string, email: string}, index ) => {
            return(
                <div key={user.id + index} className = 'ui segment'>
                    <h4>Name: {user.name}</h4>
                    <p>Email: {user.email}</p>
                </div>
            );
        });
        return dataJSX;
    }

    render( ) {

        return(
            <>    
                <h1 className="ui center aligned header teal inverted segment">Class Component</h1>                                 
                {
                    this.state.loading ? this.renderLoading( ):
                    this.state.users ? <> { this.renderUserdata( ) }</>:
                    <><h2>Error Data</h2>{ this.renderError( )}</>
                }          
            </>
        );
    }
}

//  Axios in Functional component
export const Posts  = ( props: any ) => {

    const [loading, setloading] = useState<any>(true);
    const [data, setdata] = useState<any>(null);
    const [error, seterror ] = useState<any>(null);

    useEffect( ( ) => {

        axios.get('/posts')
        .then(response => {
            setloading(false);
            setdata(response.data.slice(0,5));
            seterror(null);
        })
        .catch(error => {
            setloading(false);
            setdata(null);
            seterror(error);
        })
    }, []);


    const renderLoading = ( ) => {

        const loadingJSX =  
            <div className = "ui icon message">
                <i className = "notched circle loading icon"></i>
                <div className = "content">
                    <div className = "header">
                        Just one second
                    </div>
                    <p>We're fetching that content for you.</p>
                </div>
            </div>
        return loadingJSX;

    }
    const renderUserdata = ( ) => {

        const data1 = data ? data : [ ];
        const dataJSX = data1.map( ( item: any ) => {
                return(
                    <div key={ item.id } className = 'ui segment'>
                        <h4>Id: {item.id}</h4>
                        <p>Title: {item.title}</p>
                    </div>
                );
        });
        return dataJSX;

        
    }
    const renderError = ( ) => {
        
        const errorMessage = error? error['message'] : '';
        const errorJSX = 
            <div>
                <div className = "ui negative message">
                    <p>{ errorMessage }</p>
                </div>
            </div>
        return errorJSX;

    }

    return(
        <>
        <h1 className="ui center aligned blue message">Functional Component</h1>                                         
            {
                loading ? renderLoading( ):
                data ? <> { renderUserdata( ) }</>:
                <><h2>Error Data</h2>{ renderError( )}</>
            }          
        </>
    );
}
export const Axios =( ) => {
    return (
        <div className="ui segments">
            <div className="ui segment">
                <Users title="Class Component"/>
            </div>
            <div className="ui segment">
                <Posts/>
            </div>
        </div>
      );

}
