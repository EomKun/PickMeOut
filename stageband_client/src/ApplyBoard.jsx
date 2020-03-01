import React, { Component } from "react";
import { Container, Nav, Button, Modal, Form, Table, Row, Badge} from "react-bootstrap";
import axios from "axios";

class ApplyBoard extends Component {
    state = {
        post_modal: false,
        posts: []
    };

    // render후 호출
    componentDidMount = () => {
        this.loadPosts("");
    }

    // 글 불러오기
    loadPosts = async (category) => {
        try {
            const post_result = await axios.post("http://localhost:8080/board", { category });
            if(post_result){
                this.setState({
                    posts: post_result.data.posts
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 글 등록
    post_register = async () => {
        const formData = new FormData();
        formData.append("title", this._post_title.value);
        formData.append("category", this._post_category.value);
        formData.append("content", this._post_content.value);
        formData.append("upload_file", this._post_file.files[0]);

        try {
            const result = await axios.post("http://localhost:8080/post/register", formData)
            if(result.data.msg) {
                alert("글 등록 완료");
                this.setState({
                    post_modal: false
                });
            }
        }catch (err) {
            console.log(err);
        }
    }

    // post modal status
    post_modal_status = (status) => {
        this.setState({
            post_modal: status
        });
    }

    render (){
        const registerBtn_style = {
            textAlign: "right",
            margin: "1vw 0"
        }

        let post_data = this.state.posts.length === 0?
                    <tr><td colSpan="5">게시글이 없습니다.</td></tr>:
                    this.state.posts.map((post) => {
                        return (
                            <tr key={post.id}>
                                <td>{post.category}</td>
                                <td>{post.title}</td>
                                <td><Badge variant="primary">구인 중</Badge></td>
                                <td>{post.nickname}</td>
                                <td>{post.createdAt}</td>
                            </tr>
                        );
                    });

        return (
            <div>
                <Container fluid>
                    <div style={registerBtn_style}><Button  onClick={() => this.post_modal_status(true)} className="mr-5" variant="light">글 작성</Button></div>
                    <Nav justify variant="tabs" defaultActiveKey="whole" className="mx-5 mb-5">
                        <Nav.Item><Nav.Link onClick={() => this.loadPosts("")} eventKey="whole">전체</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link onClick={() => this.loadPosts("보컬")} eventKey="vocal">보컬</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link onClick={() => this.loadPosts("기타")} eventKey="guitar">기타</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link onClick={() => this.loadPosts("베이스")} eventKey="bass">베이스</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link onClick={() => this.loadPosts("키보드")} eventKey="keyboard">키보드</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link onClick={() => this.loadPosts("드럼")} eventKey="drum">드럼</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link onClick={() => this.loadPosts("Etc.")} eventKey="etc">Etc.</Nav.Link></Nav.Item>
                    </Nav>
                    <Row>
                        <Table hover className="mx-5 text-center">
                            <thead>
                                <tr>
                                    <th>카테고리</th>
                                    <th>제목</th>
                                    <th>상태</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {post_data}
                            </tbody>
                        </Table>
                    </Row>
                </Container>

                {/* post modal */}
                <Modal show={this.state.post_modal} onHide={() => this.post_modal_status(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>구인 글 작성</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>제목</Form.Label>
                                <Form.Control ref={ref=>this._post_title=ref} type="text" placeholder="글 제목" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>카테고리</Form.Label>
                                <Form.Control as="select" ref={ref=>this._post_category=ref}>
                                    <option>보컬</option>
                                    <option>기타</option>
                                    <option>베이스</option>
                                    <option>키보드</option>
                                    <option>드럼</option>
                                    <option>Etc.</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control ref={ref=>this._post_content=ref} as="textarea" placeholder="글 내용" rows="5" />
                            </Form.Group>
                            <Form.Group>
                            <Form.Control type="file" ref={ref=>this._post_file=ref} name="upload_file" placeholder="Upload" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.post_register}>
                            등록
                        </Button>
                        <Button variant="secondary" onClick={() => this.post_modal_status(false)}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ApplyBoard;