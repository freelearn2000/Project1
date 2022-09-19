import { Component, useContext } from 'react';
import { ContextWeather, ContextRain } from '../../context/global';


// Context implemented using class component
class WeatherContext1 extends Component {

    render( ) {
        return(
            <>
                <Child1/>
                < ContextWeather.Provider value={'Rainy'}>
                 <Child2/>
                </ContextWeather.Provider>
            </>
        );
    }
}

class Child1 extends Component {

    render( ) {
        return(
            <div>
                <ContextRain.Consumer>
                {
                    weatherData => (
                        <>Context value accessed from Child1 : <b>{ weatherData.place }</b>'s weather is <b>{ weatherData.weather }</b></>
                    )
                }
                </ContextRain.Consumer>
            </div>
        );
    }
}

class Child2 extends Component {

    static contextType = ContextWeather;

    render( ) {
        return(
            <>Context value accessed from Child2 : { this.context }</>
        );
    }
}

// 1. Context implemented using functional component
const WeatherContext2 = ( props: any ) => {

    return(
        <>
            <Child3/>
            <ContextWeather.Provider value={'Rainy'}>
                 <Child4/>
            </ContextWeather.Provider>
        </>
    );
} 

const Child3 = ( props: any ) => {

    const context = useContext(ContextRain);

    return(
        <>Context value accessed from Child3 : <b>{ context.place }</b>'s weather is <b>{ context.weather }</b></>
    );
} 

const Child4 = ( props: any ) => {

    const context = useContext(ContextWeather);

    return(
        <p>Context value accessed from Child4 : { context }</p>
    );
} 



export const WeatherContext= ( ) => {
    return (
        <div className="ui basic segments">
            <div className="ui segment">
                <h4>Class Component</h4>
                <WeatherContext1/>
            </div>
            <div className="ui segment">
                <h4>Functional Component</h4>
                <WeatherContext2/>
            </div>
        </div>
    );
}


