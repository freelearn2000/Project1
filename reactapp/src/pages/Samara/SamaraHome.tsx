import WeatherImage from '../Samara/weather.jpg';
import { connect } from 'react-redux';


const SamaraHome = ( props: any ) => {

    const onClickHandler = ( ) => {
        props.onUserSave('Bill Gates', 65)
    }
    
    return(
        <div>     
            <h1 className = "ui center aligned blue header"><i>{ props.title }</i></h1>
            <div className="ui labeled button" >
                <div className="ui blue button" onClick={ onClickHandler }>Change</div>        
                <h1 className="ui basic blue left pointing label">Hello { props.userDetails }!</h1>
            </div>
            <img className="ui fluid image" src={ WeatherImage } alt=""/>
        </div>
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


export default connect(mapStateToProps,mapDispatchToProps)(SamaraHome);    