import { Component, useEffect, useState } from "react";
import axios from '../../axios';

interface IProps {
    title: any;
}

// Axios implemented through Class Component

export class Business extends Component<IProps> {

    state = { loading: true, products: null, error: null }

	componentDidMount( ) {

		axios.get('/posts')
			.then(response => {
				this.setState( {loading: false, products: response.data.splice(0,5), error: null} );
			})
			.catch(error => {
				this.setState( {loading: false, products: null, error: error} );
		});   
    }

	renderLoading( ) {

		const loadingJSX = 
			<div className="ui horizontal divider header">
				<h4 className="ui secondary elastic loading button">Loading....</h4> 
			</div>
		return loadingJSX;
	}

	renderError( ) {

		const message = this.state.error? this.state.error[ 'message' ] : '';
		const errorJSX = 
			<div>
				<h4 className="negative ui button">{ message }</h4>
			</div>
		return errorJSX;
	}

	renderServicesData( ) {

		const datas = this.state.products ? this.state.products : [ ];
		const dataJSX = datas.map( (products: {id: number, title: string}) => {
			return(
				<div key={ products.id } className='ui segment'>
					<p>{products.title}</p>
				</div>
			);	
		});
		return dataJSX;
	}

	render( ) {

		return(
            <div>
                <h2 className="ui center aligned green message">Class Component</h2>      
				
					{	this.state.loading ? this.renderLoading( ) :
                		this.state.products ? this.renderServicesData( ):
               			this.renderError( )
					}                        
			</div>
        )		
	}	
}

//  Axios in Functional Component
export const Education  = ( props: any ) => {

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
        <h2 className="ui center aligned green message">Functional Component</h2>                                         
            {
                loading ? renderLoading( ):
                data ? <> { renderUserdata( ) }</>:
                <><h2>Error Data</h2>{ renderError( )}</>
            }          
        </>
    );
}
export const Axios1 =( ) => {
    return (
        <div className="ui segments">
            <div className="ui segment">
                <Business title="Class Component"/>
            </div>
            <div className="ui segment">
                <Education/>
            </div>
        </div>
      );

}

