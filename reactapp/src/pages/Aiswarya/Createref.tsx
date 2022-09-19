import { Component, createRef, useEffect, useRef } from "react";

class CreateRef extends Component {
   
    focusElement:any;
    
    constructor( props: any  ) {
        super( props );
        this.focusElement = createRef<any>();
    }
    
    render( ) {

        return(
        <div className="ui basic segment">
            <h4 className="ui left aligned heading "><u>CreateRef in class component </u></h4> 
                <h4 className="ui primary header"> Login Page</h4>
                <form className="ui form formStyle attached fluid">
                    <div className="two fields">
                        <div className="field">
                            <label htmlFor="">UserId</label>
                            <input type="text" placeholder="Johnmathew@gmail.com" ref={ this.focusElement }/>
                        </div>
                        <div className="field">
                            <label htmlFor="">Password</label>
                            <input type="text" placeholder="********"/>
                        </div>
                    </div>
                        <button className="ui submit button">Submit</button>
                    </form>
                </div>
            );
    }

    componentDidMount( ) {
        
        this.focusElement.current.focus();
    }

}

const Useref = ( ) => {

    const focusElement = useRef<any>();

    useEffect( ( ) => {

        focusElement.current.focus();
    }, [])

    return( 
        <>
          <h4 className="ui left aligned header"><u>UseRef in Functional component</u></h4>  
          <input type="text" placeholder="Search..."  ref = { focusElement }></input>
          <button className="ui submit button">Search</button>
        </>
    );
}

export const Createref =( ) => {
    return (
        <div className="ui segments">
            <div className="ui segment">
                <CreateRef/>
            </div>
            <div className="ui segment">
                <Useref/>
            </div>
        </div>
      );

}

