import React, { Component } from 'react';
import $ from 'jquery';

class MainHeader extends Component {
    constructor(props){
        super(props);
    }
    handlingRenderButtonLogin(){
        $(document).ready(() => {
            $.ajax({
                url: '/check-login', type: 'post', 
                success: (data) => {
                    if(data.result){
                        console.log('OK');
                        $("#right-menu-header").append("<li><a href='/log-out'><span class='glyphicon glyphicon-log-out'></span> Log out</a></li>")
                        $("#myNavbar").append("<li><a href='/my-gallerys'>My gallery</a></li> ")
                    }else{
                        $("#right-menu-header").append("<li><a href='/sign-up'><span class='glyphicon glyphicon-user'></span> Sign Up</a></li>")
                        $("#right-menu-header").append("<li><a href='/sign-in'><span class='glyphicon glyphicon-log-in'></span> Sign In</a></li>")
                    }
                }
            })
        })
    }

    render() {
        return (
            <div className="header main-header">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span> 
                            </button>
                            <a className="navbar-brand show-app-name" href="#">Supper photo</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav" id="myNavbar">
                                <li className="active"><a href="/">Home</a></li>
                                <li><a href="/charts">Chart</a></li>
                                
                            </ul>
                            <ul className="nav navbar-nav navbar-right" id="right-menu-header">
                                {this.handlingRenderButtonLogin()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default MainHeader;