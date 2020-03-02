import React, { Component } from "react";
import { Button } from "react-bootstrap";

class LoginedMenu extends Component{
    render (){
        return (
            <div>
                <Button onClick={this.props.userinfo} variant="outline-default">사용자계정@example.com</Button>
                <Button onClick={this.props.logout} variant="outline-default">로그아웃</Button>
            </div>
        );
    }
}

export default LoginedMenu;