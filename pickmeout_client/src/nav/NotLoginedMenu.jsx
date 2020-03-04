import React, { Component } from "react";
import { Form, FormControl, Button, Modal } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;		// 같은 경로라고 설정하는 부분
const headers = { withCredentials: true };

class NotLoginedMenu extends Component{
    state = { modal_active: false };

    // Modal state function
    ModalSwitch = (value) => { this.setState({ modal_active: value }); }

    // Login request
    Login = async () => {
        const send_param = {
            headers,
            email: this._login_email.value,
            password: this._login_password.value,
        };

        try {
            const login_result = await axios.post("http://localhost:8080/user/login", send_param);

            // sessionStorage에 login_email을 key로 email 값을 넣어줌
            sessionStorage.setItem("login_email", this._login_email.value);
            
            alert(login_result.data.msg);
            this.props.login();
        } catch(err) {
            // 에러 처리
            console.log(err);
        }
    }

    render (){
        return (
            <div>
                {/* form */}
                <Form inline>
                    <FormControl ref={ref=>this._login_email=ref} type="text" placeholder="email" className="mr-sm-2" />
                    <FormControl ref={ref=>this._login_password=ref} type="password" placeholder="password" className="mr-sm-2" />
                    <Button onClick={this.Login} variant="outline-default">로그인</Button>
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