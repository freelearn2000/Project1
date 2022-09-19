import { Component, createRef, useEffect, useRef } from "react";


export class TravelRef1 extends Component {
    inputRef: any;

    constructor( props: any ) {
        super( props );

        this.inputRef = createRef<any>( );
    }

    render( ) {
        return(
            <div>
                <h3>TravelRef1 Sample</h3>
                <form className="ui form">
                    <div className="field">
                        <label>Name</label>
                        <input type="text" placeholder="Name" ref={ this.inputRef }/>
                    </div>
                </form>    
            </div>    
        );
    }

    componentDidMount( ) {
        this.inputRef = this.inputRef.current.focus();
    }    
}

export const TravelRef2 = ( ) => {

    const inputRef = useRef<any>( );

    useEffect( () => {
        inputRef.current = inputRef.current.focus();
    }, [] );

    return(
        <div>
            <h3>TravelRef2 Sample</h3>
            <form className="ui form">
                <div className="field">
                    <label>Name</label>
                    <input type="text" placeholder="Name" ref={ inputRef }/>
                </div>
            </form>   
        </div>
    );
}

export const RefSample = ( ) => {
    return (
        <div className="ui segments">
            <div className="ui segment">
                <TravelRef1/>
            </div>
            <div className="ui segment">
                <TravelRef2/>
            </div>
        </div>
    );
}
