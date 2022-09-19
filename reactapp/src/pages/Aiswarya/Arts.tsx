import { useEffect, useState } from "react"; 
import { Link, Outlet, useLocation,useParams } from "react-router-dom"; 
import { Component, createContext, useContext } from "react";
import { UserContext } from "../../context/global"; 
import axios from '../../axios';

 // Axios in Class Component 

export const Arts = ( props: any) => { 

    const [loading, setLoading] = useState<boolean>(true); 
    const [datavalue, setData] = useState<any>(true); 
    const [error, setError] = useState<any>(true);

    const location = useLocation( );
    const routeData = useParams( ); 

useEffect( ( ) => { 
    axios.get('/comments') 
        .then(response => { setLoading(false);
            setData(response.data.slice(0,5)); 
            setError(null)}) 
        .catch(error => { setLoading(true); 
            setData(null); 
            setError(error)}) 
        }, []); 

    const renderLoading= ( ) => {

        const loadingJSX = 
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading User Data..!!</div>
            </div>  
        return loadingJSX;
    }

    const rendererror = ( ) => {

        const message = error ? error['message'] : '';
        const errorJSX = 
            <div>
                <h4>{ message }</h4>
            </div>
        return errorJSX;
    }

    const renderUserdata = ( ) => {
        
        const culture = datavalue ? datavalue : [ ];
        const DataJSX = culture.map( (cultures: any) => {
            return(
                <div key={ cultures.id } className="ui segment">
                   <h3>{ cultures.title}</h3>
                   <p> { cultures.body}</p>
                    </div>
            )
        });
    return DataJSX;
    }

        return (
            <>
                <h2 className="ui center aligned header">{ props.title }</h2>

                {
                    loading ? renderLoading( ):
                    datavalue ? renderUserdata( ):
                    <><h2> Error Data !!!!</h2>{rendererror( )}</>
                }
            </>
        )
    }
