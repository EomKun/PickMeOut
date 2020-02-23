import React, { Component } from "react";
import { Container, Nav } from "react-bootstrap";

class ApplyBoard extends Component {
    render (){
        return (
            <Container fluid>
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
        );
    }
}

export default ApplyBoard;