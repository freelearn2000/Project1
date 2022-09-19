import { Component, useContext } from "react";
import { PetsWorldContext } from "../../context/global";


// Provider
class PetsContext1 extends Component {

    render() {

        return (

            <div className="ui inverted segment">
                <PetsWorldContext.Provider value={'welcome'}>
                    <span className="ui inverted blue text" >
                        <Middle />
                        <Child1 />
                        <Child2 />
                    </span>
                </PetsWorldContext.Provider>
            </div>
        )
    }
}

class Middle extends Component {

    render() {
        return (
            <Child />
        );
    }
}

class Child extends Component {

    render() {
        return (

            <PetsWorldContext.Consumer>
                {
                    value => (

                        <> Context value accessed from Child &nbsp;&nbsp; :&nbsp;&nbsp;<span className="ui inverted yellow text" > {value} </span><br /></>

                    )
                }
            </PetsWorldContext.Consumer>

        );
    }
}

// b. Consumer
class Child1 extends Component {

    static contextType = PetsWorldContext;

    render() {
        return (
            <>Context value accessed from Child1 : &nbsp;&nbsp;{ this.context }</>

        );
    }
}

//c. Consumer
const Child2 = ( props: any ) => {

    const context = useContext( PetsWorldContext );

    return (
        <p>Context value accessed from Child2 :&nbsp;&nbsp;<span className="ui inverted yellow text" > { context }</span> </p>
    );
}


// Functional Component

const PetsContext2 = () => {

    return (

        <div className="ui inverted segment">
            <PetsWorldContext.Provider value={'Parvathy'}>
            <span className="ui inverted blue text" >
                <Pet1 />
            </span>
            </PetsWorldContext.Provider>
        </div>
    );
}

const Pet1 = () => {

    return (
        <Pet2 />
    );
}

const Pet2 = ( props: any ) => {

    const context = useContext(PetsWorldContext);

    return (
        <p>Context value accessed from pet2&nbsp;&nbsp; : &nbsp;&nbsp;<span className="ui inverted yellow text" > {context}</span> </p>
    );
}

const PetsContext = () => {

    return (
        <div>
            <h4 className="ui horizontal divider header">Class Component</h4>
            <PetsContext1 />
            <h4 className="ui horizontal divider header">Functional Component</h4>
            <PetsContext2 />
        </div>
    );
}

export default (PetsContext);