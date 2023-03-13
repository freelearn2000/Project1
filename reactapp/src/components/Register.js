import React, { useState } from "react";
import { Link } from 'react-router-dom'
import mail from "./images/email.png";
import profile from "./images/icon.jpg";
import lock from "./images/lock.png";
import axios from 'axios';


export const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpwd, setConfpwd] = useState('');
    const [msg, setMsg] = useState('');
    // const history = useHistory();

   
    // const onRegister = (e) => {
    //     e.preventDefault()
    //     const userObject = {
    //         name: name,
    //         email: email,
    //         password: password,


    //     };
    //     axios.post('http://localhost:3001/api/v1/users', userObject)
    //         .then((res) => {
    //             console.log(res.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         });
       

    //     console.log('first')
    // }

     const onRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/v1/users', {
                name: name,
                email: email,
                password: password,
                
            });
            // history.push("/");
        } catch (error) {
            // if (error.response) {
            //     setMsg(error.response.data.msg);
            // }
        }
    }
    return(
        // <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div>
            <form onSubmit={onRegister}>
                <div className="main">
                    <div className="sub-main">
                        <div> <h1>Registration</h1>
                            <div>
                                <img src={profile} alt="profile" className="email" />
                                <input type="text" placeholder="Name" className="fill" value={name} onChange={(e) => {setName(e.target.value)}}/>
                            </div> 
                            <div className="mail-id">
                                <img src={mail} alt="mail" className="email" />
                                <input type="email" placeholder="Email" className="fill" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                            </div>
                           <div className="mail-id">
                                <img src={lock} alt="lock" className="email" />
                                <input type="password" placeholder="********" className="fill" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                           </div>
                            <div className="mail-id">
                                <img src={lock} alt="lock" className="email" />
                                <input type="password" placeholder="********" className="fill" value={confpwd} onChange={(e) => {setConfpwd(e.target.value)}}></input>    
                            </div>
                            <div className="mail-id">
                                <button>Register</button>  
                            </div> 
                            <div className="reg-link">
                                <p>If Account exist then</p>
                                    <Link to= "/login">
                                        <li>Login!!!</li>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        // </section>
    )
}