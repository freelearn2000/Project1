import { useParams, useLocation } from "react-router-dom";

export function retriveDataFromRoute( Component: any) {

    return ( props: any ) => {
        
        const routeData = useParams( );
        const location = useLocation( );
       
        return <Component { ...props } routeData={ routeData } location={ location }/>
    }
}