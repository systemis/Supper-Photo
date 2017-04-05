import React, { Component } from 'react';
import $ from 'jquery';

class SignInPage extends Component {
    checkValidValue(){
        $(document).ready(() => {
            $("#form-input-login").submit(function(){
                var username = $("#input-username-login").val();
                var password = $("#input-password-login").val();
                if(username && username.indexOf(" ") === -1 && password){
                    return true;
                }

                alert("Một số thông tin còn sai, vui lòng kiểm tra lại !");
                return false;
            })
        })
    }

    render() {
        return (
            <div className="page sign-in-page">
                <div className="main-this">
                    <h3 className="title-page"> Login </h3>
                    <form id="form-input-login" action="/sign-in" method="POST">
                        <input type="text" name="username" id="input-username-login" placeholder="Input username here ..."/>
                        <br />
                        <input type="password" name="password" id="input-password-login" placeholder="Input password here ..."/>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Login"/>
                        <p className="label-small"> Or </p>
                        <a href="/sign-up" className="btn red"> 
                            Sign Up
                        </a>
                        {this.checkValidValue()}
                    </form>
                </div>
            </div>
        );
    }
}

export default SignInPage;