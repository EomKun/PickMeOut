import React, { Component } from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";

class UserInfo extends Component {
    render (){
        return (
            <Container>
                <Jumbotron className="my-5">
                    <Row>
                        <Col>프로필사진</Col>
                        <Col>
                            <h1>닉네임</h1>
                            <p>소개글</p>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
        );
    }
}

export default UserInfo;