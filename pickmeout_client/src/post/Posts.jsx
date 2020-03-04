import React, { Component } from "react";
import { Container, Nav, Button, Table, Row, Modal, Form } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;		// 같은 경로라고 설정하는 부분
const headers = { withCredentials: true };

class ApplyBoard extends Component {
    state = { modal_active: false };

    // Modal state function
    ModalSwitch = (value) => { this.setState({ modal_active: value }); }

    // post register request
    PostRegister = async () => {
        const formData = new FormData();
        formData.append("headers", headers);
        formData.append("title", this._post_title.value);
        formData.append("category", this._post_category.value);
        formData.append("content", this._post_content.value);
        formData.append("video_upload", this._post_file.files[0]);

        try {
            const result = await axios.post("http://localhost:8080/post/register", formData)

            alert(result.data.msg);
            if(result.data.resultCode) {
                this.ModalSwitch(false)    
            } else { 
                this._post_title.value = "";
                this._post_category.value = "보컬";
                this._post_content.value = "";
                this._post_file.value = "";
            }
        }catch (err) {
            // 에러 처리
            console.log(err);
        }
    }

    render (){
        return (
            <div>
                {/* posts */}
                <Container fluid>
                    <div className="mr-5 my-3 text-right"><Button onClick={() => this.ModalSwitch(true)} variant="light">글 작성</Button></div>
                    <Nav justify variant="tabs" defaultActiveKey="whole" className="mx-5 mb-5">
                        <Nav.Item><Nav.Link eventKey="whole">전체</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="vocal">보컬</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="guitar">기타</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="bass">베이스</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="keyboard">키보드</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="drum">드럼</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="etc">Etc.</Nav.Link></Nav.Item>
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
                                <tr><td colSpan="5">게시글이 없습니다</td></tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>

                {/* post modal */}
                <Modal show={this.state.modal_active} onHide={() => this.ModalSwitch(false)}>
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
                            <Form.Control type="file" ref={ref=>this._post_file=ref} placeholder="Upload" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.PostRegister}>
                            등록
                        </Button>
                        <Button variant="secondary" onClick={() => this.ModalSwitch(false)}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ApplyBoard;