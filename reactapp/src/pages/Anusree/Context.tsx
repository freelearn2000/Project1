import { Component, createContext, useContext } from "react";
import { NewContext, NewTheme } from '../../context/global'

interface IProps {
    title: any;
}


export class ContextSample extends Component<IProps> {
 
    render( ) {
        //console.log('context sample');
        return( 
            <div className="ui segment">
            <h2 className="ui center aligned header">{ this.props.title }</h2>
                <NewContext.Provider value={'Anu'}>
                    <Child2/>
                </NewContext.Provider>
                <Child4/> 
                <Child5/>
            </div>
        );
    }
}

class Child2 extends Component {

    render( ) {

        return(
            <div>
                <Child3/>
            </div>
        );
    }
}

class Child3 extends Component {

    render( ) {

        return(
            <div>
                <NewContext.Consumer>
                    {
                        value => (<>Context value accessed from child3:{value}</>)
                    }
                </NewContext.Consumer>
            </div>
        );
    }
}

class Child4 extends Component {

    static contextType = NewContext;
    render( ) {

        return(
            <>
                Context value accessed from contexttype : {this.context}
            </>
        );
    }
}

const Child5 = ( ) => {
    const context = useContext(NewTheme);
    return (
        <p>  Context value using useContext : {context}</p>
    )
}