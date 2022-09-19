import { Component, useContext } from 'react';
import { User }  from '../../context/global';
import { Pcontext } from '../../context/global';


// Class Component
export class UserCont extends Component {

    render( ){
        return(
            <div className="ui segment">
                <User.Provider value={{name: 'Accessories', userRole: 'Admin'}}>
                    <User2/>
                </User.Provider>
            </div>
        )
    }
}

export class User2 extends Component {

    render( ){
        return(
            <User3/>
        )
    }
}

export class User3 extends Component {

    render( ){
        return(
            <User.Consumer>
                { user  => (
                    <div>
                        <h4>Class Component</h4>
                        <h6>Context value:{user.name}</h6>
                    </div>
                )}
            </User.Consumer>
        )
    }
}

// b.Consumer
// class User3 extends Component {

//     render( ) {
//         return(
//             <User.Consumer>
//                 {user => 
//                     (
//                         <> <h3> Context user: {user.name} </h3></>
//                     )
//                 }
//             </User.Consumer>
//         )
//     }
// }

// c.Consumer
// class User3 extends Component {

//     static contextType = User;

//     render( ) {
//         return(
//             <> Context value: {this.context} </>
//         )
//     }
// }


// Functional Component

const  Accessories = ( ) => {

        return(
            <Pcontext.Provider value={'Accessories'}>
                <Headset1/>
            </Pcontext.Provider>
        );
    }

const Headset1 = ( ) => {
    return(
        <Headset2/>
    )
}

const Headset2 = (props: any) => {

    const context = useContext(Pcontext);

    return(
        <div>
        <h4>Functional Component</h4>
        <h6> Context value: {context}</h6>
        </div>
    );
}

export const Contextz = ( ) => {
    return(
        <div>
            <div>
                <UserCont/>
            </div>
            <div className='ui segment'>
                <Accessories/>
            </div>
        </div>
    );
}