import React, { Component } from "react";
import { Jumbotron, Col, Row } from "react-bootstrap";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import axios from "axios";

class VideoContainer extends Component {
    state = {
        title: "",
        content: "",
        category: "",
        nickname: "",
        createdAt: "",
        video_link: "",
        v: "http://localhost:8080/upload_video/drum_2020031_165341.mp4"
    };

    componentDidMount = async () => {
        const post_result = await axios.get("http://localhost:8080/videopost");

        if(post_result.data) {
            this.setState({
                title: post_result.data.title,
                content: post_result.data.content,
                category: post_result.data.category,
                nickname: post_result.data.nickname,
                createdAt: post_result.data.createdAt,
                video_link: "http://localhost:8080/upload_video/" + post_result.data.file_name,
            });
        }
    }

    render (){      
        let src = this.state.video_link !== ""? <source src={this.state.video_link} type="video/mp4" /> :
        <div>비디오</div>

        return (
            <Jumbotron className="mt-5 mx-5">
                <Row>
                    <Col>
                    <Video autoPlay loop
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
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default VideoContainer;