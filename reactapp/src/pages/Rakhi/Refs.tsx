import { Component, createRef, useEffect, useRef } from "react";


// createRef in Class component
export class CreateRef extends Component {
   
    scrollElement:any;
    
    constructor( props: any  ) {
        super( props );
        this.scrollElement = createRef<any>();
    }
    
    render( ) {

        return(
            <div className="ui basic segment">
                <h4 className="ui primary header">User Login</h4>
                <form className="ui form formStyle attached fluid">
                    <div className="field">
                        <label htmlFor="">User Name:</label>
                        <input type="text" placeholder="User Name or Email Id" ref={ this.scrollElement }/>
                    </div>
                    <div className="field">
                        <label htmlFor="">Password:</label>
                        <input type="text" placeholder="Password"/>
                    </div>
                    <button className="ui blue submit button">Submit</button>
                </form>
            </div>
        );
    }

    componentDidMount( ) {
        
        this.scrollElement.current.scrollIntoView ();
    }

}

// useRef in Functional component
export const UseRef = ( ) => {

    const focusElement = useRef<any>();

    useEffect( ( ) => {

        focusElement.current.focus();
    }, [])

    return( 
        <div className="ui basic segment">
            <div className="ui input focus">
                <input 
                    type="text" 
                    placeholder="Search..."
                    ref={focusElement} />
            </div>
        </div>
    );
}

export const Refs= ( ) => {
    return (
        <div className="ui basic segments">
            <div className="ui basic segment">
                <UseRef/>
            </div>
            <div className="ui segments">
                <CreateRef/>
            </div>
        </div>
    );
}

