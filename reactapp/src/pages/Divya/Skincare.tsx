import axios from '../../axios';
import { useEffect, useState } from "react";


// Axios Functional Component
export const Skincare = ( props: any ) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(( ) => {

        axios.get('/comments')
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
				</div>
			);
		});
		return dataJSX;
	}

    return(
            <div>

                <h2 className="ui horizontal divider header">List of Skincare Products</h2> 
				
					{	loading ? renderLoading( ) :
                		data ? renderProductData( ) :
						renderError( )	}                        
			</div>
        )		
    }


