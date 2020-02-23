import React, { Component } from "react";
import { Jumbotron, Col, Row } from "react-bootstrap";
import Holder from 'react-holder-component';
 
class VideoContainer extends Component {
    render (){
        return (
            <Jumbotron className="mt-5 mx-5">
                <Row>
                    <Col><Holder className="mx-5 background-color:white" width="300px" height="300px" updateOnResize={true} /></Col>
                    <Col>
                        <h1>기타리프장인</h1>
                        <p>
                            안녕하세요 기타리프장인입니다!
                            주로 속주와 빠른 음악을 좋아합니다!
                            열심히 할테니 contact 부탁드려요^^
                        </p>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default VideoContainer;