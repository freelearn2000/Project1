import { Component } from 'react';
import { useContext } from 'react';
import { ContextTravel } from '../../context/global';


// Provider
export class TravelContext extends Component {

    render( ) {
        return(
            <>
                < ContextTravel.Provider value={'Helsinki'}>
                    <Middle/>
                </ ContextTravel.Provider>
                <Child2/>
            </>
        );
    }
}

export class Middle extends Component {

    render( ) {
        return(
            <Child2/>
        );
    }
}

// a. Consumer
export class Child extends Component {

    render( ) {
        return(
            <ContextTravel.Consumer>
            {
                value => (
                    <h3> Context value accessed from Child : { value }</h3>
                )
            }
            </ContextTravel.Consumer>
        );
    }
}
// b. Consumer
export class Child1 extends Component {

    static contextType = ContextTravel;

    render( ) {
        return(
            <>Context value accessed from Child1 : { this.context }</>
        );
    }
}

//c. Consumer
export const Child2 = ( props: any ) => {

    const context = useContext(ContextTravel);

    return(
        <h3>Context value accessed from Child2 : { context }</h3>
    );
} 


