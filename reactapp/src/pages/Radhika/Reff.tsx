import { Component, createRef, useRef, useEffect } from "react";

// Class Components

class SearchReff extends Component {

    searchRef: any = null;

    constructor( props: any ) {

        super(props);

        this.searchRef = createRef( );

    }

    render( ) {

        return ( 
            <>
                <h3>Class Component</h3>
                <div className="ui inverted segment">
                    <div className="ui inverted input">
                        <input type="text" placeholder="Search..." ref={ this.searchRef } />
                    </div>
                </div>
            </>
        );
    }

    componentDidMount( ) {

        this.searchRef.current.focus();
    }
}

// Functional Component

const  SearchReff1 = ( ) => {

    const searchRef: any = useRef( );

    useEffect( ( ) => {

        searchRef.current = searchRef.current.focus();
         }, [] );
    
    return(
        <>
            <h3>Functional Component</h3>
            <div className="ui labeled input">
                <div className="ui label">
                     http:// 
                </div>
                <input type="text" placeholder="mysite.com" ref = { searchRef } />
            </div>
        </>
    )
}

export class SearchRef extends Component {

    render ( ) {
        return (
            <div className="ui segments">
                <div className="ui grey segment">
                    <SearchReff/>
                </div>
                <div className="ui grey segment">
                    <SearchReff1/>
                </div>
            </div>
        );
    }
}