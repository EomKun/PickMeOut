import React, { Component } from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";

import NotLoginContainer from "./NotLoginContainer";
import ApplyBoard from "./ApplyBoard";
import VideoContainer from "./VideoContainer";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Navigation extends Component {
    state = {
        logined: false,
        page_status: "not_login"
    };

    //logout
    logout = () => {
        this.setState({
            logined: false,
            page_status: "not_login"
        });
    }

    // login
    login = async () => {
        try{
            const send_param = {
                headers,
                email: this._login_email.value,
                pw: this._login_pw.value,
            };

            const result = await axios.post("http://localhost:8080/user/login", send_param);
            if(result.data.msg) {
                this.setState({
                    logined: true,
                    page_status: "logined"
                });
                alert(result.data.msg);
            } 
        } catch (err) {
            console.log("Login Error");
            console.log(err);
        }
    }

    // page 전환
    pageStatus = () => {
        switch(this.state.page_status){
            case "not_login": 
                return <NotLoginContainer />;

            case "logined":
                return <div>
                    <VideoContainer />
                    <ApplyBoard />
                </div>;

            default :
                return <div>error</div>;
        }
    }

    render (){
        const login_form = this.state.logined? 
            <div>
                <Button variant="outline-default">{this._login_email.value}</Button>
                <Button onClick={this.logout} variant="outline-default">로그아웃</Button>
            </div>
        : 
            <Form inline>
                <FormControl type="text" ref={ref=>this._login_email=ref} placeholder="email" className="mr-sm-2" />
                <FormControl type="password" ref={ref=>this._login_pw=ref} placeholder="password" className="mr-sm-2" />
                <Button onClick={this.login} variant="outline-default">로그인</Button>
                <Button variant="outline-default">회원가입</Button>
            </Form>

        const page = this.pageStatus();

        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#home" className="mr-auto">LOGO</Navbar.Brand>
                    {login_form}
                </Navbar>
                {page}
            </div>
        );
    }
}

export default Navigation;