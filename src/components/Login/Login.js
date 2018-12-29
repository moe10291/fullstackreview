import React, { Component } from 'react';
import logo from './communityBank.svg';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
    }

    async login() {
        let {email, password}= this.state
        let res= await axios.post ('/auth/login', {email, password});
        this.setState({email:"", password:""})
        if(res.data.loggedIn){
            this.props.history.push('/private')    
    }
}


    async signup() {
        let {email, password}= this.state
        let res= await axios.post('/auth/signup', {email, password})
        this.setState({email:"", password:""})
        if(res.data.loggedIn){
            this.props.history.push('/private')
        }
    }



    render() {
        return (
            <div className="login-wrapper">
            <img src={logo} alt=""/>
            <p>Email: 
            <input onChange={(e) => this.setState({email: e.target.value})}
            type="text"
            value={this.state.email}/>
            </p>

            <p>Password:
                <input onChange={(e) => this.setState({password: e.target.value})}
                type="password"
                value={this.state.password}/>
            </p>

            <button onClick={() => this.login()}>Login</button>
            <button onClick={() => this.signup()}>Sign up</button>
            </div>
        )
    }
}

export default Login;