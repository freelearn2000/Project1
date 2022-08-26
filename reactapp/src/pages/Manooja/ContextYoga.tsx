import { Component } from "react";
import { YogaContext, CContext } from '../../context/global';


// Providing the Context object in class component
class Child1 extends Component {

    render( ) {
        return(
            <>
                <h4 className="ui center aligned header green">Class Component</h4>
                <YogaContext.Provider value={{instructor: 'Michale', type: 'Meditation'}}>
                    <Middle/>
                </YogaContext.Provider>
            </>
        );
    }
}

class Middle extends Component {

    render( ) {
        return(
            <Child/>
        );
    }
}

// a. Consumer
export class Child extends Component {

    render( ) {
        return(
            <YogaContext.Consumer>
                { value => 
                    (
                        <> <h4 className="ui left aligned blue header message">Instructor Name: {value.instructor } <br/> Type: {value.type} </h4></>
                    )
                }
            </YogaContext.Consumer>
        );
    }
}

// Consuming the Context object in Functional component
const Child2 = (props: any) => {

    return (
        <>
            <h4 className="ui center aligned header green">Functional component</h4>
            <CContext.Consumer>
                { value =>
                    (
                        <> 
                            <h4 className="ui left aligned blue header message">Instructor Name: {value.instructor } <br/> Type: {value.type} </h4> 
                        </>
                    )
                }
            </CContext.Consumer>
        </>
    );
}

export const ContextYoga= ( ) => {

    return (
        <div className="ui basic segments">
            <div className="ui segment">
                <Child1/>
            </div>
            <div className="ui segment">
                <Child2/>
            </div>
        </div>
    );
}

