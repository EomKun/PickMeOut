import React, { Component } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import axios from "axios";

import NotLoginContainer from "./NotLoginContainer";
import ApplyBoard from "./ApplyBoard";
import VideoContainer from "./VideoContainer";
import UserInfo from "./UserInfo";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Navigation extends Component {
    state = {
        page_status: "not_login",
        signup_modal: false
    };

    //signup
    signup = async () => {
        try{
            const send_param = {
                headers,
                email: this._signup_email.value,
                pw: this._signup_pw.value,
                nickname: this._signup_nickname.value,
                intro: this._signup_intro.value
            };

            const result = await axios.post("http://localhost:8080/user/signup", send_param);
            if(result.data.resultCode) {
                alert(result.data.msg);

                this.signup_modal_status(false);
            } else {
                alert(result.data.msg);

                this._signup_email.value = "";
                this._signup_pw.value = "";
                this._signup_nickname.value = "";
                this._signup_intro.value = "";
            }
        } catch (err) {
            console.log("signup error");
            console.log(err);
        }
    }

    //signup modal status
    signup_modal_status = (status) => {
        this.setState({
            signup_modal: status
        });
    }

    //user info
    user_info = () => {
        this.setState({
            page_status: "user_info"
        });
    }

    //logout
    logout = async () => {
        try {
            const result = await axios.get("http://localhost:8080/user/logout", {})
            if(result.data.msg){
                localStorage.setItem("login_email", "");        

                this.setState({
                    user_email: "",
                    logined: false,
                    page_status: "not_login"
                });    
            }
        }catch (err) {
            console.log(err);
        }
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
            if(result.data.resultCode) {
                localStorage.setItem("login_email", this._login_email.value);

                this.setState({
                    user_email: this._login_email.value,
                    logined: true,
                    page_status: "logined"
                });

                alert(result.data.msg);
            } else {
                alert(result.data.msg);

                this._login_email.value = "";
                this._login_pw.value = "";
            }
        } catch (err) {
            console.log("Login Error");
            console.log(err);
        }
    }

    // page 전환
    pageStatus = () => {
        let page_status = this.state.page_status;

        if((localStorage.getItem("login_email") !== "") && 
        (page_status === "not_login"))
            page_status = "logined";

        switch(page_status){
            case "not_login": 
                return <NotLoginContainer />;

            case "logined":
                return (
                <div>
                    <VideoContainer />
                    <ApplyBoard />
                </div>
                );

            case "user_info":
                return (
                    <UserInfo email={localStorage.getItem("login_email")} />
                );

            default :
                return <div>error</div>;
        }
    }

    render (){
        console.log(localStorage.getItem("login_email"));

        let login_form;
        if(localStorage.getItem("login_email") !== ""){
            login_form = 
            <div>
                <Button onClick={this.user_info} variant="outline-default">{localStorage.getItem("login_email")}</Button>
                <Button onClick={this.logout} variant="outline-default">로그아웃</Button>
            </div>;
        } else {
            login_form = 
            <Form inline>
                <FormControl type="text" ref={ref=>this._login_email=ref} placeholder="email" className="mr-sm-2" />
                <FormControl type="password" ref={ref=>this._login_pw=ref} placeholder="password" className="mr-sm-2" />
                <Button onClick={this.login} variant="outline-default">로그인</Button>
                <Button onClick={() => this.signup_modal_status(true)} variant="outline-default">회원가입</Button>
            </Form>;
        }

        const page = this.pageStatus();

        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="" className="mr-auto">LOGO</Navbar.Brand>
                    {login_form}
                </Navbar>
                {/* signup modal */}
                <Modal show={this.state.signup_modal} onHide={() => this.signup_modal_status(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>회원가입</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control ref={ref=>this._signup_email=ref} type="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={ref=>this._signup_pw=ref} type="password" placeholder="password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control ref={ref=>this._signup_nickname=ref} type="text" placeholder="닉네임" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>소개글</Form.Label>
                                <Form.Control ref={ref=>this._signup_intro=ref} as="textarea" rows="5" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.signup}>
                        가입
                        </Button>
                        <Button variant="secondary" onClick={() => this.signup_modal_status(false)}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
                {page}
            </div>
        );
    }
}

export default Navigation;