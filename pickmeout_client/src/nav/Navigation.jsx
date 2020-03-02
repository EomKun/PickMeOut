import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "react-bootstrap";
import NotLoginedMenu from "./NotLoginedMenu";
import LoginedMenu from "./LoginedMenu";
import { mapStateToProps, mapDispatchToProps } from "../reduxCon";

class Navigation extends Component{
    render (){
        let menu;
        switch(this.props.pageValue) {
            case "not_logined":
                menu = <NotLoginedMenu 
                    login={this.props.logined}
                />;
                break;

            default:
                menu = <LoginedMenu 
                    userinfo = {this.props.userinfo} 
                    logout={this.props.notLogined} 
                />;
                break;
        }

        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="" className="mr-auto">LOGO</Navbar.Brand>
                {menu}
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);