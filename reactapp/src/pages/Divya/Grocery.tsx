import  { Component } from 'react';
import axios from '../../axios';
import { User } from '../../context/global';


interface IProps {
    
}

interface IState {
	loading: boolean;
	products: { } [ ] | null;
	error: { message: string } | null;
}

// Axios Class Component
export class Grocery extends Component<IProps, IState> {

    state = { loading: true, products: null, error: null };

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

	renderProductData( ) {

		const datas = this.state.products ? this.state.products : [ ];
		const dataJSX = datas.map( (product: {id: number, title: string} ) => {
			return(
				<div key={ product.id } className='ui segment'>
					<p>{product.title}</p>
				</div>
			
			);
		});

		return dataJSX;
	}

	render( ) {

		return(
            <div>
				<User.Consumer>
                    {user => (
                        <>  
                            <h5> Hi, {user.name} !!!</h5>
                        </>
                    )}
                </User.Consumer>
                <h2 className="ui horizontal divider header">List of Groceries</h2> 
		
					
					{	this.state.loading ? this.renderLoading( ) :
                		this.state.products ? this.renderProductData( ) :
               			this.renderError( )	}                       
			</div>
        )		
	}	
}

