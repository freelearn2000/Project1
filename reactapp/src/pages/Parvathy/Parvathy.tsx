import { Link, Outlet, useLocation } from 'react-router-dom';


export const Parvathy = (props: any) => {

    const location = useLocation();

    const renderSideMenu = () => {

        const sideMenuJSX =
            <div className="ui fluid inverted vertical menu">
                {(location.pathname.includes(`/home`)) ?
                    <Link to='/parvathy/home' className=" active item">Home</Link>
                    : <Link to='/parvathy/home' className="item">Home</Link>}
                {(location.pathname.includes(`/routing`)) ?
                    <Link to='/parvathy/routing' className=" active item">Routing</Link>
                    : <Link to='/parvathy/routing' className="item">Routing</Link>}
                {(location.pathname.includes(`/books`)) ?
                    <Link to='/parvathy/books' className="active item">Axios</Link>
                    : <Link to='/parvathy/books' className="item">Axios</Link>}
                {(location.pathname.includes(`/petsContext`)) ?
                    <Link to='/parvathy/petsContext' className="active item">Context</Link>
                    : <Link to='/parvathy/petsContext' className="item">Context</Link>}
                {(location.pathname.includes(`/ref`)) ?
                    <Link to='/parvathy/ref' className="active item">Ref</Link>
                    : <Link to='/parvathy/ref' className="item">Ref</Link>}
            </div>

        return sideMenuJSX;
    }


    const renderContentBox = () => {

        const contentJSX =
            <div>
                <Outlet />
            </div>

        return contentJSX;
    }


    return (
        <div>

            <h2 className="ui center aligned header message">{props.title}</h2>
            <Link to='/' className="ui teal basic tag label">Goto HomePage</Link> &nbsp;&nbsp;
            <Link to='/news/100$' className="ui basic olive tag label">News</Link>&nbsp;&nbsp;
            <div className="ui secondary segment">
                <div className="ui internally celled grid">
                    <div className="row">
                        <div className="four wide column">
                            {renderSideMenu()}
                        </div>
                        <div className="twelve wide column">
                            {renderContentBox()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
