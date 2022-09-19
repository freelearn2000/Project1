import { Component, createRef, useRef, useEffect } from 'react';


export class Ref extends Component {

    inputRef: any = null;

    constructor( props: any ) {
        super(props);

        this.inputRef = createRef( );
    }

    render( ) {
        return (
            <>
                <h3>Ref Component</h3>
                <input type="text" value="Steve" ref={this.inputRef} />
            </>
        );
    }

    componentDidMount( ) {
        // Web API
        // document.getElementById("id1");

        // React API
        console.log(this.inputRef);
        this.inputRef.current?.focus();
    }
}

export const Ref1 = ( props: any ) => {

    const inputRef: any = useRef( );

    useEffect( () => {
        console.log(inputRef);
    }, []);

    return (
        <>
            <h3>Ref Component</h3>
            <input type="text" value="Mike" ref={inputRef} />
        </>
    );
}
