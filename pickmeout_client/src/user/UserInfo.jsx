import React, { Component } from "react";
import { Container, Jumbotron, Row, Col, Table, Badge } from "react-bootstrap";
import axios from "axios";

class UserInfo extends Component {
    state = {
        nickname: "",
        intro: "",
        profile_file: "",
        posts: [],
    };

    // 유저 정보 불러오기
    componentDidMount = async () => {
        try {
            const result = await axios.get("http://localhost:8080/user/userinfo");
            if(result.data.resultCode) {
                this.setState({
                    nickname: result.data.nickname,
                    intro: result.data.intro,
                    profile_file: "http://localhost:8080/profile/" + result.data.profile_file,
                    posts: result.data.posts,
                });
            } else {
                alert(result.data.msg);
            }
        }catch (err) {
            // 에러 처리
            console.log(err);
        }
    }

    render (){
        const imgStyle = {
            width: 300,
            height: 300
        };

        let src = <img style={imgStyle} src={this.state.profile_file} alt="Profile" />;
        let posts = this.state.posts.length === 0?
        <tr><td colSpan="5">게시글이 없습니다.</td></tr> :
        /* posts 대해 map */
        this.state.posts.map((post) => {
            let status;
            switch(post.status){
                case "register": 
                    status = <Badge variant="primary">구인 중</Badge>;
                    break;

                default:
                    break;
            }

            return (
                <tr key={post.id}>
                    <td>{post.category}</td>
                    <td>{post.title}</td>
                    <td>{status}</td>
                    <td>{post.createdAt}</td>
                </tr>
            );
        });

        console.log(this.state.posts); 

        return (
            <Container>
                <Jumbotron className="my-5">
                    <Row>
                        <Col>{src}</Col>
                        <Col>
                            <h1>{this.state.nickname}</h1>
                            <p>{this.state.intro}</p>
                        </Col>
                    </Row>
                </Jumbotron>

                <Table hover>
                    <thead>
                        <tr>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>상태</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default UserInfo;