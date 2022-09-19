import { Component, useContext } from 'react';
import { MyMusic, Musictype } from '../../context/global';

// Class Component

class MusiccContext extends Component { 

    render( ) {
        return (
            <div>
                <Child1/>
                <MyMusic.Provider value={'Hindustani'}>
                    <Child2/> 
                </MyMusic.Provider>  
            </div>
        );
    }
}

class Child1 extends Component {

    render ( ) {
        return (
            <div>
                <Musictype.Consumer>
                   {
                        musicdata => (
                           <><h3>Class Component</h3>
                           Context value from Child1 : <b>{ musicdata.content }</b> </>
                        )
                   }
                </Musictype.Consumer>
            </div>
        );
    }
}

class Child2 extends Component {

    static contextType = MyMusic;

    render( ) {
         return (
            <> 
            Context value from Child2 : {this.context}
            </>
         );
    }
}

// Functional Component 

const  Ghazal = ( props: any ) => {

    return(
        <>   
            <Ghazal1/>
            <MyMusic.Provider value={'Hindustani'}>
                <Ghazal2/>  
            </MyMusic.Provider>  
        </>
    );
}

const Ghazal1 = ( props: any ) => {

    const context = useContext(Musictype);

    return (
        <>
         <h3>Functional Component</h3>
        <>Context value from Child3 : <b>{ context.content }</b></>
        </>
    );
}

const Ghazal2 = (props: any) =>{

    const context = useContext(MyMusic);

    return (
        <>
        <p>Context value from Child4 : <b>{ context }</b></p>
        </>
    );
}

// Wrapper Class 

export class MusicContext extends Component {

    render ( ) {

        return (
            <div className="ui segments">
                <div className="ui grey segment">
                    <MusiccContext/>
                </div>
                <div className="ui grey segment">
                    <Ghazal/>
                </div>
            </div>
        );
    }
}