export const ErrorPage = ( props: any ) => {
    return (
        <div className="ui negative message">
            <div className="header">
                { props.ErrorCode }
            </div>
            <p>{ props.ErrorMsg }</p>
        </div>
    );
}