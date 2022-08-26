import { Component, createRef, useEffect, useRef } from 'react' ;


export class  RefCreateExample extends Component { 

    inputRef : any;
    constructor(props:any) {
         super(props);

         this.inputRef = createRef<any>()          
        } 
    componentDidMount() {
            this.inputRef = this.inputRef.current.focus();
        }

    render( ) {
        return(
            <>
             <h4 className="ui left aligned blue header message">Class Component</h4>
             Search<input type="text" placeholder="Search..."  ref = { this.inputRef }></input>
            </>
        );
    }
} 

export const  RefUseExample = ( ) => {

    const inputRef = useRef<any>();

    useEffect(()=>{ inputRef.current = inputRef.current.focus() },[] )
    
    return(
        <>
          <h4 className="ui left aligned blue header message">Functional Component</h4>  
          Search<input type="text" placeholder="Search..."  ref = { inputRef }></input>
        </>
    )
}

export const ExampleRef = ( ) => { 
    console.log("refexample1");
    return (
        <div className="ui segments">
            <div className="ui segment">
                <RefCreateExample/>
            </div>
            <div className="ui segment">
                <RefUseExample/>
            </div>
        </div>
      );

}