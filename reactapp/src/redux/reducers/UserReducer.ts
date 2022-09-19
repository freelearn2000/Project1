// STATE
const initialState = {
    name: 'Steve Jobs',
    age: 0
}

// REDUCER
const userReducer = (state: any = initialState, action: any ) => {

    switch(action.type) {

        case 'ADD_USER':
            return {name: action.payload.Name, age: action.payload.Age};
        default:
            return state;
    }
}

export default userReducer;


// action = {type: 'ADD', payload: {Name: Steve, Age: 23}}