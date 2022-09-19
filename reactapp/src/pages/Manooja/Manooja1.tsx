import { Link, Outlet, useLocation } from 'react-router-dom';


const Manooja1 = ( props: any ) => {
    const location = useLocation();

        return (
            <div>
                <h2 className="ui center aligned blue header message">This is Manooja's Component  </h2>         
                <div className="ui grid" style={{ backgroundColor: 'lightgreen'}}>
                    <div className="four wide column">
                        <div className="ui secondary vertical menu">                         
                        { (location.pathname.includes(`/MHome`))?
                            <Link to='/Manooja/MHome' className="active item">Routing</Link>
                        :   <Link to='/Manooja/MHome' className="item">Routing</Link>}
                        { (location.pathname.includes(`/axios1`))?
                            <Link to='/Manooja/axios1' className="active item">Axios</Link>
                        :   <Link to='/Manooja/axios1' className="item">Axios</Link>}
                        { (location.pathname.includes(`/Context`))?
                            <Link to='/Manooja/ContextYoga' className="active item">Context</Link>
                        :   <Link to='/Manooja/ContextYoga' className="item">Context</Link>}
                        { (location.pathname.includes(`/Ref`))?
                            <Link to='/Manooja/Ref' className="active item">Ref</Link>
                        :   <Link to='/Manooja/Ref' className="item">Ref</Link>}                    
                        </div>
                    </div>
                <div className="twelve wide stretched column">
                    <div className="ui segment">                     
                        <Outlet/>                  
                    </div>
                </div>
                </div> 
            </div>     
        )   
}

export default Manooja1;