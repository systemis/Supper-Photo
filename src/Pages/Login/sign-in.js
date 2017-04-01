import React, { Component } from 'react';

class SignInPage extends Component {
    render() {
        return (
            <div className="page sign-in-page">
                <div className="main-this">
                    <h3 className="title-page"> Login </h3>
                    <form action="/sign-in" method="POST">
                        <input type="text" name="username" id="input-username-login" placeholder="Input username here ..."/>
                        <br />
                        <input type="password" name="password" id="input-password-login" placeholder="Input password here ..."/>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Login"/>
                        <p className="label-small"> Or </p>
                        <a href="/sign-up" className="btn red"> 
                            Sign Up
                        </a>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignInPage;