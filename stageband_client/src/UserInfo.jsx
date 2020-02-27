import React, { Component } from "react";
import { Container, Jumbotron, Row, Col, Table, Badge } from "react-bootstrap";
import Holder from 'react-holder-component';
import axios from "axios";

class UserInfo extends Component {
    state = {
        userInfo: undefined,
    };

    onLoad = () => {
        /* $.get("http://localhost:8080/user/info", (returnData) => {
            this.setState({
                userInfo: returnData
            });

            console.log(this.state.userInfo);
        }); */
    }

    render (){
        const Info = this.onLoad();

        return (
            <Container>
                <Jumbotron className="my-5">
                    <Row>
                        <Col><Holder className="mx-5 background-color:white" width="300px" height="300px" />{this.props.email}의 프로필사진</Col>
                        <Col>
                            <h1>플레임스틱</h1>
                            <p>
                                안녕하세요 플레임스틱입니다
                                스틱이 불탈만큼 빠른 속주 연주 가능합니다
                                잘 부탁드립니다!
                            </p>
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
                        <tr>
                            <td>드럼</td>
                            <td>들어갈 밴드 찾습니다!</td>
                            <td><Badge variant="success">구인완료</Badge></td>
                            <td>2020.02.20 18:20</td>
                        </tr>
                        <tr>
                            <td>드럼</td>
                            <td>나의 스틱이 불타오른다!</td>
                            <td><Badge variant="primary">구인 중</Badge></td>
                            <td>2020.02.18 15:10</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default UserInfo;