import { Component, useContext } from "react";
import { CounterContext, UserContext } from '../../context/global';


//Providing the Context object in class component
class Counter extends Component {

    render( ) {
        return(
            <div className="ui basic segment">
                <h4 style={{color: 'blue'}}>Parent Component</h4>
                <p>Provided the counter value from context to Child1</p>
                <CounterContext.Provider value={1}>
                    <Child1/>
                </CounterContext.Provider> 
                <Child3/>              
            </div>
        )
    }
}

class Child1 extends Component {

    render( ) {
        return(
            <Child2/>
        )
    }
}

// Consuming the Context object in class component
class Child2 extends Component {

    render( ) {
        return(
            <CounterContext.Consumer>
                { counter =>
                    (
                        <> 
                            <h4 style={{color: 'blue'}}>Child2</h4>
                            <p>Counter value consumed from context : <span style={{color: 'red'}}>{counter} ( Provided value from child1 )</span></p>
                        </>
                    )
                }
            </CounterContext.Consumer>
        )
    }
}

// contextType to access the Context object in Class xomponent
class Child3 extends Component {
    
    static contextType = CounterContext;

    render( ) {
        return(
            <> 
                <h4 style={{color: 'blue'}}>Child3</h4>
                Counter value from context using contextType : {this.context} <span style={{color: 'red'}}>( Default value )</span>
            </>
        )
    }
}

// useContext hook to  access the Context object in Functional component
const Child4 = (props: any) => {

    const context = useContext(CounterContext);

    return (
        <>
            <h4 style={{color: 'blue'}}>Child4</h4>
            Counter value from context using useContext : <span style={{color: 'red'}}>{context} ( Default value )</span>
            <Child5/>
        </>
    );
}

// Consuming the Context object in Functional component
const Child5 = (props: any) => {

    return (
        <>
            <h4 style={{color: 'blue'}}>Child5</h4>
            <UserContext.Consumer>
                { user =>
                    (
                        <> 
                            <p>User name consumed from context : <span style={{color: 'red'}}>{user.name} ( Provided value for the Outlet )</span></p>
                        </>
                    )
                }
            </UserContext.Consumer>
        </>
    );
}

export const Context= ( ) => {
    return (
        <div className="ui basic segments">
            <div className="ui segment">
            <h4>Class Component</h4>
                <Counter/>
            </div>
            <div className="ui segment">
                <h4>Functional Component</h4>
                <Child4/>
            </div>
        </div>
    );
}