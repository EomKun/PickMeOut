import React, { Component } from "react";
import { Container, Nav, Button, Modal, Form, Card, Accordion } from "react-bootstrap";

class ApplyBoard extends Component {
    state = {
        post_modal: false
    };

    // post modal status
    post_modal_status = (status) => {
        this.setState({
            post_modal: status
        });
    }

    render (){
        return (
            <div>
                <Container fluid>
                    <Button onClick={() => this.post_modal_status(true)} variant="light" className="ml-5 my-3">글 작성</Button>
                    <Nav justify variant="tabs" defaultActiveKey="/home" className="mx-5">
                        <Nav.Item>
                            <Nav.Link href="/home">전체</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">보컬</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">기타</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3">베이스</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-4">키보드</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-5">드럼</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-6">Etc.</Nav.Link>
                        </Nav.Item>
                    </Nav>
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
                                <Accordion>
                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            영상 직접 업로드
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form.Control type="file" placeholder="영상 업로드" />
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Card.Header} eventKey="1">
                                            유투브 링크 업로드
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <Form.Control ref={ref=>this._youtube_link=ref} type="input" placeholder="영상 업로드" />
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.upload}>
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