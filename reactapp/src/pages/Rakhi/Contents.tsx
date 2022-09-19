export const Contents = ( props: any ) => {
    return(
        <>
            <div className="ui segment">
                <img className="ui center aligned icon header" alt={ props.image } src={ props.image }/>
                <h4 className="ui center aligned icon header">
                    { props.title }
                </h4>
                <p>{ props.content }</p>
            </div>
        </>
    )
}