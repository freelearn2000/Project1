import  { Component, useEffect, useState } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';


interface IProps {

}

interface IState {
	loading: boolean;
	products: { } [ ] | null;
	error: { message: string } | null;
}

// Axios Class Component
export class AxiosGrocery extends Component<IProps, IState> {

    state = { loading: true, products: null, error: null };

	componentDidMount( ) {

		axios.get('/api/v1/projects')
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

	renderProductData( ) {

		const datas = this.state.products ? this.state.products : [ ];
		const dataJSX = datas.map( (product: {id: number, name: string, duration: string} ) => {
			return(
				<div key={ product.id } className='ui segment'>
					<p>{product.name}</p>
					<p>{product.duration}</p>
				</div>
			
			);
		});

		return dataJSX;
	}

	render( ) {

		return(
            <div>
				
                <h2 className="ui horizontal divider header">Class Component</h2> 
		
					
					{	this.state.loading ? this.renderLoading( ) :
                		this.state.products ? this.renderProductData( ) :
               			this.renderError( )	}                       
			</div>
        )		
	}	
}

// Axios Functional Component
export const AxiosSkincare = ( props: any ) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(( ) => {

        axios.get('/api/v1/users')
            .then( response => { 
                setLoading(false);
                setData(response.data.slice(0,5));
                setError(null)})
            .catch( error => { 
                setLoading(false);
                setData(null);
                setError(error)} )

    }, []);

	const renderLoading = ( ) => {

		const loadingJSX = 
			<div className="ui horizontal divider header">
				<h4 className="ui secondary elastic loading button">Loading....</h4> 
			</div>
		return loadingJSX;
	}

	const renderError = ( ) => {

		const message = error.error? error.error[ 'message' ] : '';
		const errorJSX = 
			<div>
				<h4 className="negative ui button">{ message }</h4>
			</div>
		return errorJSX;
	}

	const renderProductData = ( ) => {

		const datas = data ? data : [ ];
		const dataJSX = datas.map( (product: any ) => {
			return(
				<div key={ product.id } className='ui segment'>
					<p>{product.name}</p>
					<p>{product.email}</p>
				</div>
			);
		});
		return dataJSX;
	}

    return(
            <div>

                <h2 className="ui horizontal divider header">Functional Component</h2> 
				
					{	loading ? renderLoading( ) :
                		data ? renderProductData( ) :
						renderError( )	}                        
			</div>
        )		
    }

    const AxiosD = (props : any) => {
        return (
            <div className="ui segment">
				<h1>{props.userDetails}</h1>
                <div className="ui segment">
                    <AxiosGrocery/>
                </div>
                <div className="ui segments">
                    <AxiosSkincare/>
                </div>
            </div>
        );
    }

	const mapStateToProps = (state: any) => {
		return {
			userDetails: state.userKey.name
		}
	}
	
	export default connect(mapStateToProps)(AxiosD);