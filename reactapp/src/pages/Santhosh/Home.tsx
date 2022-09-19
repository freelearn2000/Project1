import { connect } from 'react-redux';

const Home = ( props: any ) => {      

    const onClickHandler = ( ) => {
        props.onUserSave('Bill Gates', 65)
    }    
     
    return (
        <>
            <h2 className="ui center aligned blue header message">Welcome {props.userDetails}</h2>                 
                <div className="ui form formStyle attached fluid">                    
                    <div className="ui buttons">
                        <button className="ui positive button" onClick={ onClickHandler }>Change</button>                        
                    </div>
                </div> 
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userDetails: state.userKey.name
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
       onUserSave: (name: string, age: number) => dispatch({type: 'ADD_USER', payload: {Name: name, Age: age}} )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);  