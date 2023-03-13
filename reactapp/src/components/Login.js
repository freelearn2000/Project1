import React, {useState} from "react";
import { Link } from 'react-router-dom'
import mail from "./images/email.png";
import profile from "./images/icon.jpg";
import lock from "./images/lock.png";


export const Login = () => {

    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");

    return(
        <div>
             <form>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div className='imgs'>
                            <div className='container-image'>
                                <img src={profile} alt='profile' className='profile'/>
                            </div>
                        </div>
                        <div>
                            <h1 className='LHeader'>Login</h1>
                            <div>
                                <img src={mail} alt="mail" className='email' />
                                <input type="email" placeholder='Email' className='fill' onChange={(e) => setEmail(e.target.value) }/>
                            </div>
                            <div className='second-input'>
                                <img src={lock} alt='password' className='email' />
                                <input type="password" placeholder='Enter Password' className='fill' onChange={(e) => setPassword(e.target.value) }/>
                            </div>
                            {/* HERE WITH THE HELP OF LINK PROVIDED BY REACT-ROUTER WE CAN NAVIGATE TO OTHER PAGES 
                                IN LINK WE HAVE TO PASS LOCATION OF THE NAVIGATING PAGE AS PATH IS DEFINED IN THE APP.JS*/}
                            <div className='login-btn'>
                                <Link to='/dashboard'>
                                    <button type="button">Login</button>
                                </Link>
                            </div>
                            <div className='reg-link'>
                                <Link className='link' to='/registration'>
                                    <li>Register Now</li>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    
        </div>
    )
}