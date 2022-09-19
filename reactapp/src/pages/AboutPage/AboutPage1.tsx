import { Component, useContext, Fragment } from 'react';
import { MyContext } from '../../context/theme-context';


// Create Context object
// const MyContext = createContext(``);
// MyContext.displayName = 'MyContextName';
// const MyThemeContext = createContext(`dark`);

// Provider
export class AboutPage1 extends Component {

    render( ) {
        return (
            <>
                <MyContext.Provider value={`Steve`}>
                    <Middle/>
                </MyContext.Provider>
                <Child2/>
            </>
        );
    }
}


class Middle extends Component {

    render( ) {
        return (
            <Child2/>
        );
    }
}

// a. Consumer
class Child extends Component {

    render( ) {
        return (
            <MyContext.Consumer>
                {value => 
                    (
                        <div>Context value accessed from Child : {value}</div>
                    )
                }
            </MyContext.Consumer>
        );
    }
}

// b. Consumer
class Child1 extends Component {

    static contextType = MyContext;

    render( ) {
        return (
            <Fragment>
                <>Context value accessed from Child1 : {this.context}</>
            </Fragment>
        );
    }
}

// c. Consumer
const Child2 = (props: any) => {

    const context = useContext(MyContext);

    return (
        <div>Context value accessed from Child2 : {context}</div>
    );
}
