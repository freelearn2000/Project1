import  HealthImage  from '../Bindu/Images/Health.jpg';
import { connect } from 'react-redux';

 const Bhome = ( props: any ) => {

    return (
        <div>

            {/* <div className="ui buttons">
                <button className="ui pink button">Cancel</button>
                <div className="or"></div>
                <button className="ui green button" >Submit</button>
            </div> */}

            <div>
                <h4 className="ui center aligned grey header message">{ props.title }
                &nbsp;&nbsp;&nbsp; { props.userDetails}</h4>
                 
            </div>
            <img src ={ HealthImage } className = "ui fluid image" alt={"HealthImage"} height={5}  width={5}/>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        userDetails: state.userKey.name
    }
}
export default connect(mapStateToProps)(Bhome);