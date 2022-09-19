import { Link, Outlet, useLocation } from 'react-router-dom';


export const Samara = ( props: any) => {

    const location = useLocation();

    return(
        <div>
            <h2 className="ui center aligned header message">{ props.title }</h2>
            <Link to='/' className="ui purple button">Home</Link>
            <Link to='/about/ContactNo/8456' className="ui purple button">About</Link>
            <div className="ui aligned grid">
                <div className="four wide column">
                    <div className="ui secondary vertical pointing menu">                       
                        { (location.pathname.includes(`/routing`))?
                            <Link to='/samara/routing' className="active item">Routing</Link>
                        :   <Link to='/samara/routing' className="item">Routing</Link>}
                        { (location.pathname.includes(`/axios`))?
                            <Link to='/samara/axios' className="active item">Axios</Link>
                        :   <Link to='/samara/axios' className="item">Axios</Link>}
                        { (location.pathname.includes(`/context`))?
                            <Link to='/samara/context' className="active item">Context</Link>
                        :   <Link to='/samara/context' className="item">Context</Link>}
                        { (location.pathname.includes(`/ref`))?
                            <Link to='/samara/ref' className="active item">Ref</Link>
                        :   <Link to='/samara/ref' className="item">Ref</Link>}    
                    </div>
                </div>
                <div className="twelve wide stretched column">
                    <div className="ui segment">
                        <Outlet/> 
                    </div>
                </div>
            </div>
        </div>
    );
}



