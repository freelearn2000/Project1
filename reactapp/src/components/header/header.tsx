import { Menu } from '../menu/menu';


export const Header = ( props: any ) => {
    return (
        <Menu/>
    );
}

export const Header1 = ( props: any ) => {
    return (
        <h2 className="ui header">{props.title}</h2>
    );
}

export const Header2 = ( props: any ) => {
    return (
        <h2 className="ui block header">{props.title}</h2>
    );
}