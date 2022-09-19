import { Component, useContext } from 'react';
import { User }  from '../../context/global';


export class AuthUser extends Component {

    render( ) {
        return(
            <div className="ui segment">
                <User.Provider value={{name: 'Divya', userRole: 'Admin'}}>
                    <AuthUser2/>
                    <UserCon/>
                </User.Provider>
            </div>
        )
    }
}

export class AuthUser2 extends Component {

    render( ){
        return(
            <AuthUser3/>
        )
    }
}

export class AuthUser3 extends Component {

    render( ) {
        return(
            <User.Consumer>
                { user  => (
                    <div>
                        <h4>Class Component</h4>
                        <h2>Welcome!! {user.name}</h2>
                    </div>
                )}
            </User.Consumer>
        )
    }
}


// a.Consumer
const UserCon = ( ) => {

    const context = useContext(User);

    return(
        <>
            <h4>Functional Component</h4>
            <User.Consumer>
                { user =>
                    (
                        <> 
                            <h2>Welcome!! {context.name} </h2>
                        </>
                    )
                }
            </User.Consumer>
        </>
    );
}

export const ContextDiv = ( ) => {
    return (
        <div className="ui segment">
            <div className="ui segment">
                <AuthUser/>
            </div>
        </div>
    );
}