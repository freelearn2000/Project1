import { Component, useContext } from 'react';
import { MyMusic } from '../../context/global';

// Class Component

class MusiccContext extends Component { 

    render( ) {
        return (
            <div>
                <MyMusic.Provider value={'Context'}>
                    <Music/>
                </MyMusic.Provider>  
            </div>
        );
    }
}

class Music extends Component {

    render ( ) {
        return (
            <div>
                <Classical/>
                <MyMusic.Provider value={'Hindustani'}>
                    <Hindustani/>  
                </MyMusic.Provider>
            </div>
        );
    }
}

class Classical extends Component {

    render ( ) {
        return ( 
            <div>
                <MyMusic.Consumer>
                    { value =>
                        (
                            <> 
                            <h3>Class Component</h3>
                            <p>
                            Music : { value } 
                            </p>
                            </>
                        )
                    }
                </MyMusic.Consumer>
            </div>
        );
    }
}


class Hindustani extends Component {

    static contextType = MyMusic;

    render( ) {
         return (
            <> 
            Play the music from : {this.context};
            </>
         );
    }
}

// Functional Component 

const  Ghazal = ( ) => {

    return(
        <MyMusic.Provider value={'Ghazal'}>
            <Ghazal1/>  
        </MyMusic.Provider>  
    );
}

const Ghazal1 = ( ) => {

    return(
        <Ghazal2/>
    )
}

const Ghazal2 = (props: any) =>{

    const context = useContext(MyMusic);

    return (
        <>
        <h3>Functional Component</h3>
        <p>Play the music from :  {context}; </p>
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