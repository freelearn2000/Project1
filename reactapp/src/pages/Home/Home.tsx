import { useState, useRef, useEffect } from 'react';


export const HomePage = ( props: any ) => {

    const [state, setState] = useState({data: 'Welcome to our component state.', xyz: {name: 'steve'}});

    const firstRun = useRef(true);

    const onClickHandler = ( ) => {
        // console.log(`HomePage button clicked!!!`);
        setState({data: 'Bye from our component state.', xyz: {name: 'tom'}});
    }

    // Initialization
    // useEffect( () => {
    //     console.log(`HomePage componentDidMount`);
    // }, []);

    // State Update
    // useEffect( () => {
    //     // Fix: Make useEffect hook not run on initial render!
    //     if ( firstRun.current ) {
    //         firstRun.current = false;
    //         return;
    //     }
    //     console.log(`HomePage componentDidUpdate `, state.data);
    // }, [state.data]);

    // Destructor
    // useEffect( () => {
    //     return ( ) => console.log(`HomePage componentWillUnmount `, state.data);
    // });

    // console.log(`HomePage render`);

    return (
        <div>
            <h1>This is Home Component</h1>
            <br/>
            <p>{state.data} !!!</p>
            <br/>
            <div className="ui buttons">
                <button className="ui button">Cancel</button>
                <div className="or"></div>
                <button className="ui positive button" onClick={onClickHandler}>Save</button>
            </div>
        </div>
    );
}