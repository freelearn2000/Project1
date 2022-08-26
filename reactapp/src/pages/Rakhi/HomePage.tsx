import techIMG from '../Rakhi/Resources/technology.jpg';


export const HomePage = ( props: any ) => {
    return(
        <>
            <h3 className = "ui center aligned red  header">
                { props.title }
            </h3>
            <img src={ techIMG } alt={'technology'}/>
            <p>Science and technology is the ultimate need of an hour that changes the overall perspective of the human towards life. Over the centuries, there have been new inventions in the field of science and technology that help in modernizing. Right from connecting with people to using digital products, everything involves science and technology. In other words, it has made life easy and simple. Moreover, humans now have to live a simple life. There is modern equipment explored by tech experts to find something new for the future.</p>
        </>
        
    )
}