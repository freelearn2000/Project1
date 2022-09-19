import { Component, createRef, useEffect, useRef } from 'react' ;


export class  CreateRefExample1 extends Component { 

    inputRef : any;
    constructor(props:any) {
         super(props);

         this.inputRef = createRef<any>()  
                
        } 
    
    render( ) {

        return( 
            <>
             <h4><big> Class component</big></h4>
             <input type="text" placeholder="Search..."  ref = { this.inputRef }></input>
            </>
        );
    }
    componentDidMount() {
        this.inputRef = this.inputRef.current.focus();
    }
} 

export const  UserefExample = ( ) => {

    const inputRef = useRef<any>();

    useEffect(()=>{ inputRef.current = inputRef.current.focus() },[] )
    
    return(
        <>
          <h4><big>Functional Component</big></h4>  
          <input type="text" placeholder="Search..."  ref = { inputRef }></input>
        </>
    )
}

export const RefExample1 = ( ) => { 
    console.log("refexample1");
    return (
        <div className="ui segments">
            <div className="ui segment">
                <CreateRefExample1/>
            </div>
            <div className="ui segment">
                <UserefExample/>
            </div>
        </div>
      );

}