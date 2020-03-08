import React, { Component } from "react";
import { Container, Jumbotron, Row, Col, Table, Badge } from "react-bootstrap";
import Holder from 'react-holder-component';
import axios from "axios";

class UserInfo extends Component {
    state = {
        nickname: "",
        intro: "",
        posts: [],
    };

    // 나의 유저 정보와 내가 쓴 글 불러오기
    componentDidMount = async () => {
        try {
            const result = await axios.get("http://localhost:8080/user/userinfo");
            if(result.data.resultCode) {
                console.log(result.data.nickname);
                console.log(result.data.posts);
                this.setState({
                    nickname: result.data.nickname,
                    intro: result.data.intro,
                    posts: result.data.posts
                });
            } else {
                console.log("");
            }
        }catch (err) {
            console.log(err);
        }
    }

    render (){
        let post_list = this.state.posts.map((post) => {
            let status;
            switch(post.status){
                case "register": 
                    status = <Badge variant="primary">구인 중</Badge>;
                    break;

                default:
                    break;
            }

            return (
                <tr>
                    <td>{post.category}</td>
                    <td>{post.title}</td>
                    <td>{status}</td>
                    <td>{post.createdAt}</td>
                </tr>
            );
        });

        return (
            <Container>
                <Jumbotron className="my-5">
                    <Row>
                        <Col><Holder className="mx-5 background-color:white" width="300px" height="300px" />{this.props.email}의 프로필사진</Col>
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
                        {post_list}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default UserInfo;