import React, { Component } from "react";
import { Form, FormControl, Button, Modal } from "react-bootstrap";

class NotLoginedMenu extends Component{
    state = { modal_active: false };

    ModalSwitch = (value) => { this.setState({ modal_active: value }); }

    render (){
        return (
            <div>
                {/* form */}
                <Form inline>
                    <FormControl type="text" placeholder="email" className="mr-sm-2" />
                    <FormControl type="password" placeholder="password" className="mr-sm-2" />
                    <Button onClick={this.props.login} variant="outline-default">로그인</Button>
                    <Button onClick={() => { this.ModalSwitch(true) }} variant="outline-default">회원가입</Button>
                </Form>

                {/* signup modal */}
                <Modal show={this.state.modal_active} onHide={() => { this.ModalSwitch(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="email" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="password" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control type="text" placeholder="닉네임" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>소개글</Form.Label>
                            <Form.Control as="textarea" rows="5" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { this.ModalSwitch(false) }}>
                    가입
                    </Button>
                    <Button variant="secondary" onClick={() => { this.ModalSwitch(false) }}>
                    취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}

export default NotLoginedMenu;