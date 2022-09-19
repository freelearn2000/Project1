import { useEffect, useState } from "react";
import axios from '../../axios';


export const Prakarthi = ( ) =>  {
    const [wealth, setWealth] = useState<any>( []);

    useEffect(( ) =>{
      
        axios.get('/todos')
        .then(response => {
           setWealth( response.data.splice(0,3) );
        })
        .catch(error => {
            console.log(error);
        })
    },[ ] )
   
    return(
           
        <> 
             <h2 className="ui center aligned header">functional Component</h2>
            {
                wealth.map((item: any)=>{

                    return( 
                        <div key={ item.id } className="ui segment">
                            <h4>{ item.title }</h4>
                        </div>
                       )
                })
            }
            
        </>
    )
}
