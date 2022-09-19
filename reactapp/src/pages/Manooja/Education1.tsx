import  { Component } from 'react';
import axios from '../../axios';


interface IProps {
    title: any;
    
}

interface IState {
	loading: boolean;
	products: { } [ ] | null;
	error: { message: string } | null;
}

export class Education extends Component<IProps, IState> {

    state = { loading: true, products: null, error: null };

	componentDidMount( ) {

		axios.get('/comments')
			.then(response => {
				this.setState( {loading: false, products: response.data, error: null} );
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
		const dataJSX = datas.map( (product: {id: number, name: string} ) => {
			return(
				<div key={ product.id } className='ui segment'>
					<p>{product.name}</p>
				</div>
			);
		});
		return dataJSX;
	}

	render( ) {

		return(
            <div>
                <h2 className="ui center aligned header">List of Educational Institutions</h2> 
				
					{	this.state.loading ? this.renderLoading( ) :
                		this.state.products ? this.renderServicesData( ) :
               			this.renderError( )	}                        
			</div>
        )		
	}	
}