import React, { Component } from "react";
import { Jumbotron, Col, Row, Button } from "react-bootstrap";

class VideoContainer extends Component {
    render (){      
        return (
            <Jumbotron className="mt-5 mx-5">
                <Row>
                    <Col>
                        <p>비디오 나오는 부분</p>
                    </Col>
                    <Col>
                        <h1>글 제목 - <small>글 쓴 시간</small></h1>
                        <p>닉네임</p>
                        <p>글 내용</p>
                        <Button>좋아요 버튼</Button>
                        <Button>Pick!</Button>
                        <Button>신고</Button>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default VideoContainer;