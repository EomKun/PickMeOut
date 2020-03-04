import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

class LoginedMenu extends Component{
    // logout request
    Logout = async () => {
        try {
            const logout_result = await axios.get("http://localhost:8080/user/logout");
            if(logout_result.data.resultCode) {
                console.log(sessionStorage.getItem("login_email"));
                sessionStorage.clear();
                this.props.logout();
            }
        } catch (err) {
            // 에러 처리
            console.log(err);
        }
    }

    render (){
        const login_email = sessionStorage.getItem("login_email");

        return (
            <div>
                <Button onClick={this.props.userinfo} variant="outline-default">{login_email}</Button>
                <Button onClick={this.Logout} variant="outline-default">로그아웃</Button>
            </div>
        );
    }
}

export default LoginedMenu;