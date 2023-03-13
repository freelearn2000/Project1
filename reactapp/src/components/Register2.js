import React, { useState } from 'react'
import axios from "axios";
import "bulma/css/bulma.css";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confPassword, setConfPassword] = useState('');
     const [msg, setMsg] = useState('');
    // const history = useHistory();

    // const Register = async (e) => {
    //     e.preventDefault();
    //     console.log('Divya')
    //     // try {
    //     //     await axios.post('http://localhost:5000/users', {
    //     //         name: name,
    //     //         email: email,
    //     //         password: password,
    //     //     });
    //     //    // history.push("/");
    //     // } catch (error) {
    //     //     if (error.response) {
    //     //         setMsg(error);
    //     //     }
    //     // }
    // }

    const onRegister = (e) => {
        e.preventDefault()
        const userObject = {
            name: name,
            email: email,
            password: password,


        };
        axios.post('http://localhost:3001/api/v1/users', userObject)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name)
                setEmail(res.data.email)
                setPassword(res.data.password)
            }).catch((error) => {
                console.log(error)
            });
       

        console.log('first')
    }
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={onRegister} className="box">
                                <p className="has-text-centered"></p>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}