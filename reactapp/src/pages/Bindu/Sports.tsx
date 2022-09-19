import { Component, useContext } from "react";
import axios from '../../axios';
import { SportsContext } from   '../../context/global';


interface IProps {
    title: any;
}

export class Sports extends Component<IProps> {

    state={ loading: true, sports: null, error: null };
    
    componentDidMount( ) {

        axios.get('/todos')
            .then(response => {
                this.setState( {loading: false, sports: response.data, error: null} );
            })
            .catch(error => {
                this.setState( {loading: false, sports: null, error: error} );
            })
    }

    renderLoading( ) {

        const loadingJSX =
        <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading user data...</div>
        </div>
        return loadingJSX;
    }

    renderError( ) {

        const message = this.state.error ? this.state.error[ 'message' ] : '';
        const errorJSX = 
        <div className='ui negative message'>
            <h4>{ message }</h4>
        </div>
        return errorJSX;
    }

    renderUserdata( ) {

        //const sports = this.state.sports ? this.state.sports : [ ];
        // const dataJSX = sports.map( (sports: any ) => {
        //    return(  
            
        //     <div key={ sports.id } className="ui segment">
        //         <h4>{ sports.title }</h4>
        //     </div>
        //    )
        // });
        // return dataJSX;
    }
    
    render( ) {

        return(
                <>
                    <SportsContext.Provider value = {'P.T.Usha'}>
                        <Athletics/>
                    </SportsContext.Provider>
                    
                    <h2 className="ui center aligned header"> </h2>
                        {
                            this.state.loading ? this.renderLoading( ):
                            this.state.sports ? <> { this.renderUserdata( ) }</>:
                            <><h2>Error Data</h2>{ this.renderError( )}</>
                         }
                </>
            )   
        }
 }      

class Athletics extends Component {
    

    render() {

        return(      
             <>  
                <h5><big>Class Component</big></h5>
                <Running/>
             </>
        )
    }
}

class Running extends Component {

   render() {

        return(
                <>
                 <SportsContext.Consumer>
                    { value => (
                      <>
                        Best Athlet :  <span style={{color: 'blue'}}>{ value } </span>                      
                      </>
                     )
                    }
                 </SportsContext.Consumer>
                  <Sprint />
                </>
            )
        }  
}            

class Sprint extends Component {
    static contextType = SportsContext;
            render() {
        
                return(
        
                    <>
                        <br/>
                        <br/>
                         Olympian Bronze medal winner :  <span style={{color: 'blue'}}></span> {this.context}
                        <Marathon />
                    </>
                )
            } 
}  

const Marathon = () => {     
    const context = useContext(SportsContext);

         return(

                <>
                   <hr color = "blue" />
                   <h5><big>Functional Component</big></h5>
                  Best Athlet :<span style={{color: 'blue'}}>{ context } </span> 
                   
                </>
             )        
  }                          