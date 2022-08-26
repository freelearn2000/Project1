import { Component, useEffect, useState } from "react";
import axios from '../../axios';
// import { retriveDataFromRoute } from '../../utils/hoc';

interface IProps {
    title: string;
}


interface IState {
    loading: boolean,
    users: {}[] | null,
    error: { message: string } | null;
}

// Axios in Class Component
export class Axiosclasz extends Component<IProps, IState> {

    state = { loading: true, users: null, error: null };

    // initialization
    componentDidMount() {

        // Intitiate API call from here
        axios.get('/users')
            .then(response => {
                this.setState({ loading: false, users: response.data.splice(0, 3), error: null });
            })
            .catch(error => {
                this.setState({ loading: false, users: null, error: error });
            });
    }

    renderLoading() {

        const loadingJSX =
            <div className="ui segment">
                <p>Please wait a little...</p>
                <div className="ui active inverted dimmer">
                    <div className="ui green text loader">Loading</div>
                </div>
            </div>
        return loadingJSX;
    }

    renderError() {

        const message = this.state.error ? this.state.error['message'] : '';
        const errorJSX =
            <div>
                <br />
                <h4>{message}</h4>
            </div>
        return errorJSX;
    }

    renderData() {

        const users = this.state.users ? this.state.users : [];
        const dataJSX = users.map((item: { name: string, email: string, id: number }) => {
            return (
                <div key={item.id} className="ui center aligned message">
                    <h4>{item.name}</h4>
                    <p>Email : {item.email}</p>
                </div>
            );
        });
        return dataJSX;
    }

    render() {

        return (
            <div>
                <h3 className="ui center aligned header  olive inverted segment">{this.props.title}</h3>

                {
                    this.state.loading ? this.renderLoading() :
                        this.state.users ? this.renderData() : this.renderError()
                }
            </div>
        )
    }
}


// Axios in Functional Component
export const AxiosFns = (props: any) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {

        axios.get('/users')
            .then(response => {
                setLoading(false);
                setUsers(response.data.slice(0, 5));
                setError(null)
            })
            .catch(error => {
                setLoading(false);
                setUsers(null);
                setError(error)
            })
    }, []);

    const renderLoading = () => {

        const loadingJSX =
            <div className="ui segment">
                <p>Please wait a little...</p>
                <div className="ui active inverted dimmer">
                    <div className="ui green text loader">Loading</div>
                </div>
            </div>

        return loadingJSX;
    }

    const renderData = () => {

        const users1 = users ? users : [];
        const dataJSX = users1.map((item: { name: string, id: number }) => {
            return (
                <div key={item.id} className="ui center aligned message">
                    <h4>{item.name}</h4>
                </div>
            );
        });

        return dataJSX;
    }

    const renderError = () => {

        const message = error ? error['message'] : '';
        const errorJSX =
            <div>
                <br />
                <h4>{message}</h4>
            </div>

        return errorJSX;
    }

    return (
        <div>
            <h3 className="ui center aligned header teal inverted segment">{props.title}</h3>
            {
                loading ? renderLoading() :
                    users ? renderData() : renderError()
            }
        </div>

    )
}

export const Books = () => {

    return (
        <div className="ui basic segments">
            <div className="ui segment">
                <Axiosclasz title="Class Component" />
            </div>
            <div className="ui segment">
                <AxiosFns title="Funtional Component" />
            </div>
        </div>
    );
}


