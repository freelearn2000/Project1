import { Component, createContext, useContext } from "react";

interface IProps {
    title: any;
}

//Create Content object
const MyContext = createContext('Admin');
const NewTheme = createContext('Poerty');

export class Contextpage extends Component<IProps> {
 
    render( ) {
        //console.log('context Example');
        return( 
            <div className="ui segment">
            <h2 className="ui center aligned header">{ this.props.title }</h2>
                <MyContext.Provider value={'Aiswarya'}>
                    <Child2/>
                </MyContext.Provider>
                <Child4/> 
               
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
                <MyContext.Consumer>
                    {
                        value => (<>Name:{value}</>)
                    }
                </MyContext.Consumer>
            </div>
        );
    }
}

class Child4 extends Component {

    static contextType = MyContext;
    render( ) {

        return(
            <>
                Desigination: {this.context}
            </>
        );
    }
}

