import React, { Component } from "react";
import { Jumbotron, Col, Row, Button } from "react-bootstrap";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import axios from "axios";

class PopularPost extends Component {
    state = {
        title: "",
        content: "",
        category: "",
        nickname: "",
        createdAt: "",
        video_link: "",
    };

	// 게시글 정보에 대한 요청
    componentDidMount = async () => {
        const post_result = await axios.get(process.env.REACT_APP_REQ_ADDRESS + "post/popularpost");
        if(post_result.data.resultCode) {
            this.setState({
                title: post_result.data.title,
                content: post_result.data.content,
                category: post_result.data.category,
                nickname: post_result.data.nickname,
                video_link: process.env.REACT_APP_REQ_ADDRESS + "video/" + post_result.data.video_file,
                createdAt: post_result.data.createdAt,
            });
        } else {
            this.setState({
                title: post_result.data.msg,
            });
        }
    }

    render (){  
        // 비디오 링크에 대한 정적 파일 요청
        let src = this.state.video_link !== ""? <source src={this.state.video_link} type="video/mp4" /> :
        <div>비디오</div>

        return (
            <Jumbotron className="mt-5 mx-5">
                <Row>
                    <Col>
                        {/* 비디오 재생되는 부분 */}
                        <Video autoPlay loop muted
                            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                            onCanPlayThrough={() => {
                                // Do stuff
                            }}>
                            {src}
                        </Video>
                    </Col>
                    <Col>
                        <h1 className="mb-5">{this.state.title}<small> - {this.state.nickname}</small></h1>
                        <p>{this.state.category}</p>
                        <p>{this.state.createdAt}</p>
                        <p>{this.state.content}</p>
                        <Button>좋아요 버튼</Button>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default PopularPost;