import { Component } from "react";
import { Link,  Outlet } from "react-router-dom";
import { retriveDataFromRoute } from "../../utils/hoc";


interface IProps {
    title: string
    routeData: any;
    location : any;
}

interface IState {
    loading: boolean,
    users: { } [ ] | null,
    error: { message: string } | null;
}

class Rootingb extends Component <IProps, IState> {


   render( ) { 

        return( 
                <>            
                  <div className="ui two item menu"  style={{ backgroundColor: 'wheat'}}>
                            <>  
                            <Link to='/bindu/rootingb/nature' className={ this.props.location.pathname.includes('Nature')? 'active item': 'item'}>Nature</Link>
                            <Link to='/bindu/rootingb/prakarthi' className={ this.props.location.pathname.includes('Prakarthi')? 'active item': 'item'}>Wealth</Link> 
                            </>
                    </div>
                            
                    <Outlet/>
                </>
        )
   }    
} 

export default retriveDataFromRoute ( Rootingb );
