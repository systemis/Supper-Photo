import React, { Component } from 'react';
import $ from 'jquery';

class SignUpPage extends Component {
    checkValidValue(){
        $(document).ready(() => {
            $("#form-input-register").submit(function(){
                var email    = $("#input-email-register").val();
                var username = $("#input-username-register").val();
                var password = $("#input-password-register").val();
                if(email && username  && username.indexOf(" ") !== -1 && password){
                    if(email.indexOf("@") !== -1 && email.indexOf("@") !== email.length - 1 
                    && email.indexOf(".") !== -1 && email.indexOf(".") > email.indexOf("@")
                    && email.indexOf(".") !== email.length - 1){
                        return true;
                    }
                }
                
                alert("Một số thông tin còn sai, vui lòng kiểm tra lại !");
                return false;
            })
        })
    }

    render() {
        return (
            <div className="page sign-up-page">
                <div className="main-this">
                    <h3 className="title-page"> Retisger </h3>
                    <form id="form-input-register" action="/sign-up" method="POST">
                        <input type="text"     name="email"     id="input-email-register"    placeholder="Input email here ..."/>
                        <br />
                        <input type="text"     name="username"  id="input-username-register" placeholder="Input username here ..."/>
                        <br />
                        <input type="password" name="password"  id="input-password-register" placeholder="Input password here ..."/>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Register"/>
                        <p className="label-small"> Or </p>
                        <a href="/sign-in" className="btn red"> 
                            Sign In 
                        </a>
                        {this.checkValidValue()}
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpPage;