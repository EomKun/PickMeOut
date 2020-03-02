import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./reduxCon";
import NotLoginedPage from "./NotLoginedPage";
import PopularPost from "./post/PopularPost";
import Posts from "./post/Posts";
import UserInfo from "./user/UserInfo";

class MainPage extends Component{
    render (){
        let page;
        
        switch(this.props.pageValue) {
            case "not_logined":      page = <NotLoginedPage />;                        break;
            case "logined":          page = <div><PopularPost /><Posts /></div>;       break;
            case "user_info":        page = <div><UserInfo /><Posts /></div>;          break;
            default:                 page = <div>Not Found Page</div>;
        }

        return (
            <div>
                {page}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);