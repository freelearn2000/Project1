import { Component } from 'react';
import { connect } from 'react-redux';
// import { Link, Outlet } from "react-router-dom";


interface Props {
    userDetails: any;
}

class NewsPage extends Component<Props> {

    // state = {title: null, author: 'null};

    render( ) {
        return (
            <div className="ui internally celled grid">
                <div className="row">
                    <div className="three wide column">
                        <div className="ui vertical text menu">
                            Summary
                        </div>
                    </div>
                    <div className="thirteen wide column">
                        {this.props.userDetails}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        userDetails: state.userKey.name
    }
}

export default connect(mapStateToProps)(NewsPage);



// class NewsPage extends Component {

//     render( ) {
//         return (
//             <div className="ui internally celled grid">
//                 <div className="row">
//                     <div className="three wide column">
//                         <div className="ui vertical text menu">
//                             <Link to='/news/india' className="item">India</Link>
//                             <Link to='/news/us' className="item">US</Link>
//                         </div>
//                     </div>
//                     <div className="thirteen wide column">
//                         <Outlet/>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }