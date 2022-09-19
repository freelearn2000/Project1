import  { Component } from 'react';
import 	{ Link, Outlet } from 'react-router-dom';
import axios from '../../axios';
import { retriveDataFromRoute } from '../../utils/hoc';


interface IProps {
    title: any;
	routeData: any;
}

interface IState {
	loading: boolean;
	users: { } [ ] | null;
	error: { message: string } | null;
}

class Divya extends Component<IProps, IState> {

    state = { loading: true, users: null, error: null };

	componentDidMount( ) {

		axios.get('/users')
			.then(response => {
				this.setState( {loading: false, users: response.data, error: null} );
			})
			.catch(error => {
				this.setState( {loading: false, users: null, error: error} );
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

	renderData( ) {

		const users = this.state.users ? this.state.users : [ ];
		const dataJSX = users.map( (user: {id: number, name: string, email: string} ) => {
			return(
				<div key={ user.id } className='ui segment'>
					<table className="ui definition table">
						<tbody>
							<tr>
								<td className="five wide column">Name : { user.name }</td>
								<td>Email : { user.email }</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		});
		return dataJSX;
	}

	render( ) {

		return(
            <div>
                <h2 className="ui horizontal divider header">{this.props.title}</h2> 
				<br/>
				<Link to='/' className="ui button">Home</Link>
				<Link to='/news/latest' className="ui button">News</Link>
				<Link to='/divya/product' className="ui button">Products</Link>
					{
                        this.props.routeData.id ?
                            <>
								<h4>Route Data: { this.props.routeData.id }</h4>
								<br/>
								{	this.state.loading ? this.renderLoading( ) :
                					this.state.users ? this.renderData( ) :
               						this.renderError( )	}
                            </>:
                            <Outlet/>
                    }    	
			</div>
        )		
	}	
}

export default retriveDataFromRoute(Divya);