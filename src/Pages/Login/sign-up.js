import React, { Component } from 'react';

class SignUpPage extends Component {
    render() {
        return (
            <div className="page sign-up-page">
                <div className="main-this">
                    <h3 className="title-page"> Retisger </h3>
                    <form action="/sign-up" method="POST">
                        <input type="text"     name="email"     id="input-email-retisger"    placeholder="Input email here ..."/>
                        <br />
                        <input type="text"     name="username"  id="input-username-retisger" placeholder="Input username here ..."/>
                        <br />
                        <input type="password" name="password"  id="input-password-retisger" placeholder="Input password here ..."/>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Retisger"/>
                        <p className="label-small"> Or </p>
                        <a href="/sign-in" className="btn red"> 
                            Sign In 
                        </a>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpPage;