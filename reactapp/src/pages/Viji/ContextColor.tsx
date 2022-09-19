import { Component } from "react";
import { ColorContext, ColContext } from '../../context/global';


// Class Component

export class Child1 extends Component {

    render( ) {
        return(
            <>
                <h4 className="ui center aligned header red">Class Component</h4>
                <ColorContext.Provider value={{color: 'Red', type: 'VIBGYOR'}}>
                    <Middle/>
                </ColorContext.Provider>
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
            <ColorContext.Consumer>
                { value => 
                    (
                        <> <h4 className="ui left aligned blue header message">Color Name: {value.color } <br/> Type: {value.type} </h4></>
                    )
                }
            </ColorContext.Consumer>
        );
    }
}

const Child2 = (props: any) => {

    return (
        <>
            <h4 className="ui center aligned header red">Functional component</h4>
            <ColContext.Consumer>
                { value =>
                    (
                        <> 
                            <h4 className="ui left aligned blue header message">Color Name: {value.color } <br/> Type: {value.type} </h4> 
                        </>
                    )
                }
            </ColContext.Consumer>
        </>
    );
}

export const ContextColor= ( ) => {

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