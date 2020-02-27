# 혼자하는 프로젝트 - 프로젝트명 미정

#### 1. 화면 구상(와이어 프레임)



#### 2. DB 



#### 3. 제작 과정

*  Client(React), Server(node.js)로 나누어서 제작



1. 기본 첫 화면 제작
   1. Client -> cmd창에서 create-react-app stageband 입력(cmd는 관리자 권한으로 실행)

   

   2. 생성된 폴더 내에 public, src 내용들을 모두 삭제

   
   3. public 폴더에 index.html 생성 후 다음과 같이 입력

      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>StageBand</title>
      </head>
      <body>
          <div id="home"></div>
      </body>
      </html>
      ```

      

   4. src폴더에 index.jsx 생성 후 다음과 같이 입력

      ```react
      import React from "react";
      import ReactDOM from "react-dom";
      import Navigation from "./Navigation";
      
      import 'bootstrap/dist/css/bootstrap.min.css';
      
      ReactDOM.render(
          <Navigation />,
          document.querySelector("#home")
      );
      ```

      

   5. Navigation class 제작을 위해 src폴더에 Navigation.jsx를 생성 후 다음과 같이 입력

      ```react
      import React, { Component } from "react";
      import { Navbar, Form, FormControl, Button } from "react-bootstrap";
      import NotLoginContainer from "./NotLoginContainer";
      import LoginedContainer from "./LoginedContainer";
      
      class Navigation extends Component {
          render (){
              return (
                  <div>
                      <Navbar bg="light" variant="light">
                          <Navbar.Brand href="#home" className="mr-auto">LOGO</Navbar.Brand>
                          <Form inline>
                              <FormControl type="text" placeholder="email" className="mr-sm-2" />
                              <FormControl type="password" placeholder="password" className="mr-sm-2" />
                              <Button variant="outline-default">로그인</Button>
                              <Button variant="outline-default">회원가입</Button>
                          </Form>
                      </Navbar>
                      <NotLoginContainer />
                  </div>
              );
          }
      }
      
      export default Navigation;
      ```

      

   6. NotLoginContainer 제작을 위해 src폴더에 NotLoginContainer .jsx를 생성 후 다음과 같이 입력

      ```react
      import React, { Component } from "react";
      
      class NotLoginContainer extends Component {
          render (){
              const ImgStyle = { 
                  backgroundImage: "url(/img/intro_band.jpg)",
                  backgroundSize: "100% 100%",
                  height: "40vw"
               };
      		// 이미지는 public/img 폴더 생성해서 아무 이미지나 넣으면 된다
              return (
                  <div style={ImgStyle}>
                      
                  </div>
              );
          }
      }
      
      export default NotLoginContainer;
      ```

      

   7. `ctrl + 백틱`을 눌러 커맨드 창을 연 후 `npm i react-bootstrap`으로 bootstrap을 설치

      (css로 디자인 하려면 안해도 됨)

      

   8.  `npm start`입력 

      * 결과화면

        ![notlogin](https://user-images.githubusercontent.com/20276476/75013025-b4b15600-54c6-11ea-8814-106939dc00d3.png)





2. email, password값을 받아 로그인 화면을 누르면 다른화면으로 바뀌게 만들기

   1. Navigation.jsx에 render -> input 부분과 button 부분 코드를 추가

      ```react
      //...
      <FormControl type="text" ref={ref=>this._login_email=ref} placeholder="email" className="mr-sm-2" />
      <FormControl type="password" ref={ref=>this._login_pw=ref} placeholder="password" className="mr-sm-2" />
      <Button onClick={this.login} variant="outline-default">로그인</Button>
      <Button variant="outline-default">회원가입</Button>
      //...
      ```

      

   2. Navigation.jsx상단 부분 login 함수 제작

      ```react
      class Navigation extends Component {
          //...
      
          // login
          login = async () => {
              const email = this._login_email.value;
              const pw = this._login_pw.value;
              
              alert(`${email} 이고 ${pw}`);
          }
      //...
      ```

      * 결과화면

        ![tryLogin](https://user-images.githubusercontent.com/20276476/75016731-fe9e3a00-54ce-11ea-8229-f3d192f92dc5.png)

        

   3. 서버와의 통신을 위해 가동중이던 리액트 프로세스를 종료하고 `npm i axios`를 입력하여 axios를 설치한다

      

   4. Navigation.jsx에 다음과 같이 코드를 수정함

      ```react
      //...
      import axios from "axios";
      import NotLoginContainer from "./NotLoginContainer";
      
      class Navigation extends Component {
          // login
          login = async () => {
              try{
                  const send_param = {
                      email: this._login_email.value,
                      pw: this._login_pw.value,
                  };
      
                  const result = await axios.post("http://localhost:8080/user/login", send_param);
                  if(result.data.msg) {
                      alert(result.data.msg);
                  } 
              } catch (err) {
                  console.log("Login Error");
                  console.log(err);
              }
          }
      //...
      ```

      

   5. 통신을 위해 서버를 만들자

      1. Server 폴더를 생성하고 open folder로 폴더를 염

         

      2. `ctrl + 백틱`으로 터미널을 열어 `npm init` 입력

         

      3. package.json의 `"script"`부분에 다음과 같이 입력

         ```javascript
         "scripts": {
             "start": "nodemon server",
             "test": "echo \"Error: no test specified\" && exit 1"
         },
         // nodemon이 없다면 npm i -g nodemon으로 설치를 해준다
         ```

         

      4. 터미널 창에 `npm i express`를 입력하여 express 패키지를 설치한다

         

      5. `server.js`파일을 생성하고 다음과 같이 입력한다

         ```javascript
         const express = require("express");
         const app = express();
         
         app.use(express.urlencoded({ extended: true }));
         app.use(express.json());
         
         // routers
         app.use("/user", require("./routes/user"));
         
         app.listen(8080, () => {
             console.log("Server Ready!");
         });
         ```

         

      6. `routes`폴더를 생성하고 `user.js`을 만들어 다음과 같이 입력

         ```javascript
         const express = require("express");
         const router = express.Router();
         
         router.post("/login", (req, res, next) => {
             const email = req.body.email;
             const pw = req.body.pw;
         
             res.json({
                 msg: `${email}님의 비번: ${pw}`,
             });
         });
         
         module.exports = router;
         ```

         

      7. 서버와 리액트 프로세스를 `npm start`하여 가동한 후 로그인을 시도하면 다음과 같은 화면이 뜬다(브라우저에서 f12를 눌러 console화면)

         ![cors](https://user-images.githubusercontent.com/20276476/75018290-f5fb3300-54d1-11ea-90b0-d7b863236c88.png)
         
         
         
      8. server쪽의 터미널에서 `npm i cors`를 입력하여 설치한다
      
         
      
      9. server.js에 다음과 같이 입력
      
         ```javascript
         const cors = require("cors");
         //...
         
         const corsOptions = {
             origin: true,			// 헤더 요청 구성, true값은 요청 origin 반영
             credentials: true		// 헤더를 전달하려면 true
         }
         app.use(cors(corsOptions));
         // express를 사용할 경우 cors 미들웨어를 사용하면 된다
         ```
      
         **CORS(Cross Origin Resource Sharing)**
      
         * 현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말함
         * 보안 상의 이유로, 브라우저는 CORS를 제한하고 있다
         * SPA(Single Page Application)의 경우에는, RESTful API를 기반으로 비동기 네트워크 통신을 하기 때문에 API 서버와 웹 페이지 서버가 다를 수 있다. 이런 경우에 API 서버로 요청을 할 시에 CORS 제한이 걸리게 된다.
      
         
      
      10. client쪽에서 요청을 보낼 때 Header를 만들어서 같이 보내야 CORS 제한이 걸리지 않는다
      
          ```react
          axios.defaults.withCredentials = true;		// 같은 경로라고 설정하는 부분
          const headers = { withCredentials: true };
          
          //...
          
          // login
              login = async () => {
                  try{
                      const send_param = {
                          headers,					// 설정한 headers를 같이 보냄
                          email: this._login_email.value,
                          pw: this._login_pw.value,
                      };
          //...
          ```
      
          * 결과 화면
      
            ![logined](https://user-images.githubusercontent.com/20276476/75105627-01c53180-5659-11ea-90a4-820d4d1d6887.png)
      
   6. logout을 구현해 페이지 전환이 되도록 만들자
   
      1. client의 Navigation.jsx에 다음 부분을 추가
   
         ```react
         class Navigation extends Component {
             //////////////////////////////////////////////////////////////
             // 로그인 상태, page 상태를 체크하기 위한 state
             state = {
                 user_email: "",
                 logined: false,
                 page_status: "not_login"
             };
         
             //logout
             logout = () => {
                 this.setState({
                     user_email: "",
                     logined: false,
                     page_status: "not_login"
                 });
             }
         	//////////////////////////////////////////////////////////////
             
             // login
             login = async () => {
                 try{
                     const send_param = {
                         headers,
                         email: this._login_email.value,
                         pw: this._login_pw.value,
                     };
         
                     const result = await axios.post("http://localhost:8080/user/login", send_param);
                     if(result.data.msg) {
                         this.setState({
                             user_email: this._login_email.value,
                             logined: true,
                             page_status: "logined"
                         });
                         alert(result.data.msg);
                     } 
                 } catch (err) {
                     console.log("Login Error");
                     console.log(err);
                 }
             }
         
             //////////////////////////////////////////////////////////////
             // page 전환
             // page_status에 따른 객체를 반환
             pageStatus = () => {
                 switch(this.state.page_status){
                     case "not_login": 
                         return <NotLoginContainer />;
         
                     default :
                         return <div>error</div>;
                 }
             }
         	
             render (){
                 // 삼항 연산자 사용
                 // Nav부분 로그인하지 않았을때는 로그인 폼과 회원가입 버튼
                 // 로그인했을때는 닉네임(내 정보)와 로그아웃 버튼
                 const login_form = this.state.logined? 
                     <div>
                         <Button variant="outline-default">{this.state.user_email}</Button>
                         <Button onClick={this.logout} variant="outline-default">로그아웃</Button>
                     </div>
                 : 
                     <Form inline>
                         <FormControl type="text" ref={ref=>this._login_email=ref} placeholder="email" className="mr-sm-2" />
                         <FormControl type="password" ref={ref=>this._login_pw=ref} placeholder="password" className="mr-sm-2" />
                         <Button onClick={this.login} variant="outline-default">로그인</Button>
                         <Button variant="outline-default">회원가입</Button>
                     </Form>
         
                 // MainContainer에 page_status에 따른 페이지를 받음
                 const page = this.pageStatus();
         
                 return (
                     <div>
                         <Navbar bg="light" variant="light">
                             <Navbar.Brand href="#home" className="mr-auto">LOGO</Navbar.Brand>
                             <!-- 로그인 상태에 따른 render -->
                             {login_form}	
                         </Navbar>
                         <!-- 페이지 상태에 따른 render -->
                         {page}
                     </div>
                 );
             }
         }
         //////////////////////////////////////////////////////////////
         ```
   
      
   
   7. 다른 페이지들 구성
   
      1. Holder 사용을 위해 터미널에서 `npm i react-holder-component`를 작성하여 설치
   
         * Holder는 원하는 이미지의 크기를 default로 표시하기 위해 사용(optional)
   
         
   
      2. clientd의 src안 VideoContainer.jsx를 생성한 후 다음과 같이 작성
   
         ```react
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
         ```
   
         
   
      3. 같은 경로에 ApplyBoard.jsx를 생성하고 다음과 같이 작성
   
         ```react
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
         ```
   
         
   
      4. Navigation 부분에 다음을 추가
   
         ```react
         //...
         
         import NotLoginContainer from "./NotLoginContainer";
         import ApplyBoard from "./ApplyBoard";
         import VideoContainer from "./VideoContainer";
         
         //...
         
         class Navigation extends Component {
             //...
             // page 전환
             pageStatus = () => {
                 switch(this.state.page_status){
                     case "not_login": 
                         return <NotLoginContainer />;
         
                     case "logined":
                         return (
                         <div>
                             <VideoContainer />
                             <ApplyBoard />
                         </div>
                         );
         
                     default :
                         return <div>error</div>;
                 }
             }
         //...
         ```
   
         * 결과화면
   
           ![loginedPage](https://user-images.githubusercontent.com/20276476/75105910-34245e00-565c-11ea-97d7-357765ce0219.png)
   
         
   
      5. 내 정보 화면
   
         1. Navigation.jsx에 다음 코드 추가
   
            ```react
            import React, { Component } from "react";
            import { Navbar, Form, FormControl, Button } from "react-bootstrap";
            import axios from "axios";
            
            import NotLoginContainer from "./NotLoginContainer";
            import ApplyBoard from "./ApplyBoard";
            import VideoContainer from "./VideoContainer";
            /////////////////////////////////////////////////////////////////////
            import UserInfo from "./UserInfo";
            /////////////////////////////////////////////////////////////////////
            
            axios.defaults.withCredentials = true;
            const headers = { withCredentials: true };
            
            class Navigation extends Component {
                state = {
                    user_email: "",
                    logined: false,
                    page_status: "not_login"
                };
            	/////////////////////////////////////////////////////////////////
                //user info
                user_info = () => {
                    this.setState({
                        page_status: "user_info"
                    });
                }
            	/////////////////////////////////////////////////////////////////
                
                //...
            
                // page 전환
                pageStatus = () => {
                    switch(this.state.page_status){
                        case "not_login": 
                            return <NotLoginContainer />;
            
                        case "logined":
                            return (
                            <div>
                                <VideoContainer />
                                <ApplyBoard />
                            </div>
                            );
            			//////////////////////////////////////////////////////////
                        case "user_info":
                            return (
                                <UserInfo email={this.state.user_email} />
                            );
            			//////////////////////////////////////////////////////////
                        default :
                            return <div>error</div>;
                    }
                }
            //...
            ```
   
            
   
         2. client의 src폴더에 UserInfo.jsx를 추가하고 다음을 입력
   
            ```react
            import React, { Component } from "react";
            import { Container, Jumbotron, Row, Col, Table, Badge } from "react-bootstrap";
            import Holder from 'react-holder-component';
            import axios from "axios";
            
            class UserInfo extends Component {
                render (){
                    return (
                        <Container>
                            <Jumbotron className="my-5">
                                <Row>
                                    <Col><Holder className="mx-5 background-color:white" width="300px" height="300px" />{this.props.email}의 프로필사진</Col>
                                    <Col>
                                        <h1>플레임스틱</h1>
                                        <p>
                                            안녕하세요 플레임스틱입니다
                                            스틱이 불탈만큼 빠른 속주 연주 가능합니다
                                            잘 부탁드립니다!
                                        </p>
                                    </Col>
                                </Row>
                            </Jumbotron>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>카테고리</th>
                                        <th>제목</th>
                                        <th>상태</th>
                                        <th>작성일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>드럼</td>
                                        <td>들어갈 밴드 찾습니다!</td>
                                        <td><Badge variant="success">구인완료</Badge></td>
                                        <td>2020.02.20 18:20</td>
                                    </tr>
                                    <tr>
                                        <td>드럼</td>
                                        <td>나의 스틱이 불타오른다!</td>
                                        <td><Badge variant="primary">구인 중</Badge></td>
                                        <td>2020.02.18 15:10</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Container>
                    );
                }
            }
            
            export default UserInfo;
            ```
   
            * 결과화면
   
              ![user_info](https://user-images.githubusercontent.com/20276476/75122988-d9841400-56e6-11ea-8572-679906376eb6.png)
   
              
   
              
   
      6. DB구축
   
         * 본 예제에서는 시퀄라이즈를 사용할 것이다
   
           * 자바스크립트 객체를 데이터베이스의 릴레이션으로 매핑
           * SQL 언어가 아닌 자바스크립트 언어만으로 DB조작 가능
   
           
   
         1. MySql Workbench에서 데이터베이스를 만듦
   
            ```mysql
            CREATE SCHEMA `pickbandmember` DEFAULT CHARACTER SET utf8 ;
            USE pickbandmember;
            ```
   
            
   
         2. server의 터미널에서 다음을 입력하여 설치
   
            `npm i sequelize mysql2`
   
            **혹시 sequelize-cli이 설치되지 않은 경우에는 전역에 설치하기**
   
            `npm i -g sequelize-cli`
   
            
   
         3. 터미널에 `sequelize init`입력
   
            **보안 오류가 뜨는 경우에는 cmd창을 관리자 권한으로 실행하여 해당 디렉토리에서 입력**
   
            
   
            입력하면 아래의 폴더들이 생김
   
            ![seq_init](https://user-images.githubusercontent.com/20276476/75123299-8bbcdb00-56e9-11ea-9c46-2e9d4ec3de01.png)
   
            
   
         4. models안의 index.js의 내용을 지우고 다음과 같이 입력
   
            **있는 코드를 그대로 사용하면 오류가 발생, 필요없는 부분도 있음**
   
            ```javascript
            const Sequelize = require('sequelize');
            
            const env = process.env.NODE_ENV || 'development';
            const config = require(__dirname + '/../config/config.json')[env];
            const db = {};
            
            let sequelize = new Sequelize(config.database, config.username, config.password, config);
            
            db.sequelize = sequelize;
            db.Sequelize = Sequelize;
            
            db.Users = require('./users')(sequelize,Sequelize);
            db.UserInfo = require("./user_info")(sequelize, Sequelize);
            db.PostApply = require('./post_apply')(sequelize,Sequelize);
            
            // model을 만들때 자동으로 id값을 생성함
            // 그리고 이 밑에서 테이블간의 관계를 자동으로 지정함
            // 관계를 알아서 설정해 줌
            
            // 1 : 1
            db.UserInfo.hasOne(db.Users, { foreignKey: 'userinfo_id' });   
            
            // 1 : n
            db.Users.hasMany(db.PostApply);    
            
            module.exports = db;
            
            ```
   
            
   
         5. 터미널창에 `npm i -g sequelize-auto`를 입력하여 설치(설치되어 있지 않을시)
   
            
   
         6. mysql workbench에서 테이블을 생성
   
            1. User
   
               ```mysql
               CREATE TABLE `pickbandmember`.`users` (
                 `email` VARCHAR(45) NOT NULL,
                 `password` VARCHAR(45) NOT NULL,
                 UNIQUE INDEX `email_UNIQUE` (`email` ASC));
               ```
   
               
   
            2. Post_apply
   
               ```mysql
               CREATE TABLE `pickbandmember`.`post_apply` (
                 `title` VARCHAR(45) NOT NULL,
                 `content` TEXT NOT NULL,
                 `category` VARCHAR(45) NOT NULL,
                 `video_link` VARCHAR(100) NOT NULL);
               ```
   
               
   
            3. user_info
   
               ```mysql
               CREATE TABLE `pickbandmember`.`user_info` (
                 `profile_photo_link` VARCHAR(100) NULL,
                 `nickname` VARCHAR(45) NOT NULL,
                 `intro_content` TEXT NULL,
                 UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC));
               ```
   
               
   
         7. 커맨드 창에 `sequelize-auto -o "./models" -d pickbandmember -h localhost -u root -p 3306 -x mysql -e mysql` 입력
   
            * -d : database 이름
            * -h : host이름
            * -u : db계정 이름
            * -p : db port
            * -x : 비밀번호
            * -e : 데이터베이스 종류
   
            **보안 오류 뜰 시 cmd 관리자 권한 실행하여 해당 경로로 간 후 입력**
   
            ![seq_create](https://user-images.githubusercontent.com/20276476/75130612-afe0e200-5712-11ea-9b92-e22cd4c552b4.png)
   
            만들어 놓은 모델이 생성됨
   
            
   
         8. server의 config 파일 안의 config.json 안을 고침
   
            ```json
            {
              "development": {
                "username": "root",
                "password": "mysql",				// 비번 바꾸기
                "database": "pickbandmember",		// db이름 넣기
                "host": "127.0.0.1",
                "dialect": "mysql",
                "operatorsAliases": false
            //...
            }
            ```
   
            
   
         9. server의 server.js에 다음 내용 추가
   
            ```javascript
            const express = require("express");
            const cors = require("cors");
            ////////////////////////////////////////////////////////
            const sequelize = require("./models").sequelize;
            ////////////////////////////////////////////////////////
            const app = express();
            
            //...
            
            sequelize.sync();
            //..
            ```
   
            
   
         10. mysql workbench에서 만들었던 테이블을 전부 DROP TABLE로 삭제
   
             
   
         11. 생성된 각 모델의 table_name밑에 다음을 추가
   
             ```javascript
             /* jshint indent: 2 */
             
             module.exports = function(sequelize, DataTypes) {
               //...
                 tableName: 'post_apply',
                 ///////////////////////////////////////////////////////////////
                 timestamps: true,		// createAt, updatedAt
                 paranoid: true          // deletedAt
                 ///////////////////////////////////////////////////////////////
               });
             };
             
             ```
   
             
   
         12. `npm start`를 입력하여 서버 실행
   
             ![seq_create_new](https://user-images.githubusercontent.com/20276476/75124341-ee19d980-56f1-11ea-95d6-9d27ac0a8091.png)
   
             서버가 실행되면 자동으로 `IF NOT EXISTS`구문이 추가되어 테이블을 자동 생성하고 sync를 맞춰준다
   
         
   
      7. 회원가입, 로그인을 db와 연동해보자
   
         1. 회원가입창은 modal로 띄울 예정이므로, Navigation의 render부분 return에 내용을 추가한다
   
            ```react
            return (
                        <div>
                            <Navbar bg="light" variant="light">
                                <Navbar.Brand href="" className="mr-auto">LOGO</Navbar.Brand>
                                {login_form}
                            </Navbar>
                  {///////////////////////////////////////////////////////////////////}
                            {/* signup modal */}
                        	// show는 상태에 따라 창을 보이게 함
                        	// onHide에 false를 주는 state함수 호출시 닫힘
                        	// onClick에도 마찬가지
                            <Modal show={this.state.signup_modal} onHide={() => this.signup_modal_status(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>회원가입</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control ref={ref=>this._signup_email=ref} type="email" placeholder="name@example.com" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control ref={ref=>this._signup_pw=ref} type="password" placeholder="password" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Nickname</Form.Label>
                                            <Form.Control ref={ref=>this._signup_nickname=ref} type="text" placeholder="닉네임" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>소개글</Form.Label>
                                            <Form.Control ref={ref=>this._signup_intro=ref} as="textarea" rows="5" />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={this.signup}>
                                    가입
                                    </Button>
                                    <Button variant="secondary" onClick={() => this.signup_modal_status(false)}>
                                        취소
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                  {///////////////////////////////////////////////////////////////////}
                            {page}
                        </div>
                    );
            ```
   
            
   
         2. modal 창이 상태에 따라 나타나게 하기 위해 state에 다음을 추가
   
            ```react
            class Navigation extends Component {
                state = {
                    user_email: "",
                    logined: false,
                    page_status: "not_login",
                    {////////////////////////////////////////}
                    signup_modal: false
                    {////////////////////////////////////////}
                };
            
            	//signup
                signup = () => {
                    //...
                }
            
                //signup modal status
                signup_modal_status = (status) => {
                    this.setState({
                        signup_modal: status
                    });
                }
            ```
   
            * 결과 화면
   
              ![signup](https://user-images.githubusercontent.com/20276476/75130815-9a1fec80-5713-11ea-85d5-a1569ac76544.png)
   
              근사한 modal창이 뜬다!
   
              
   
         3. 빈 채로 만들어뒀던 signup 함수에 다음 내용을 추가
   
            ```react
            try{
                const send_param = {
                    headers,
                    email: this._signup_email.value,
                    pw: this._signup_pw.value,
                    nickname: this._signup_nickname.value,
                    intro: this._signup_intro.value
                };
            
                const result = await axios.post("http://localhost:8080/user/signup", send_param);
                if(result.data.resultCode) {
                    alert(result.data.msg);
            
                    this.signup_modal_status(false);
                } else {
                    alert(result.data.msg);
            
                    this._signup_email.value = "";
                    this._signup_pw.value = "";
                    this._signup_nickname.value = "";
                    this._signup_intro.value = "";
                }
            } catch (err) {
                console.log("signup error");
                console.log(err);
            }
            ```
   
            
   
         4. 서버쪽에서 데이터를 받아 db 처리를 해야한다. server의 user.js를 다음과 같이 수정
   
            ```javascript
            const express = require("express");
            ///////////////////////////////////////////////////////////////////////////
            const models = require("../models");	// transection을 쓰기 위해 추가
            ///////////////////////////////////////////////////////////////////////////
            const Users = require('../models').Users;
            const UserInfo = require('../models').UserInfo;
            const router = express.Router();
            
            router.post("/signup", async (req, res, next) => {
                const email = req.body.email;
                const password = req.body.pw;
                const nickname = req.body.nickname;
                const intro_content = req.body.intro;
            
                try {
                    let resultCode = 1;
                    let msg = "";
                    
                    // 이메일 중복 조회, User table insert, UserInfo table insert
                    await models.sequelize.transaction (async (t) => {
                        // 1. 이메일 중복 조회
                        const search_result = await Users.findOne({ where : { email }});
                        console.log(search_result);
                        if(!search_result)
                        {
                            // 2. User table insert
                            const insert_result1 = await Users.create({
                                email,
                                password,
                            });
            
                            console.log(insert_result1);
                            if(insert_result1){
                                // 3. UserInfo table insert 
                                const insert_result2 = await UserInfo.create({
                                    nickname,
                                    intro_content,
                                    profile_photo_link: "path"
                                });
                            } else {
                                resultCode = 0;
                                msg = "넣는데 문제생김"
                            }
                        } else {
                            resultCode = 0;
                            msg = "이메일 중복";
                        }
                    });
                    
                    res.json({ resultCode, msg });
                } catch (err) {
                    resultCode = 0;
                    res.json({ resultCode, msg: false });
                    console.log(err);
                }
            });
            
            router.post("/login", async (req, res, next) => {
                //...
            });
            
            module.exports = router;
            ```
   
            이메일 중복 체크 -> User 테이블 insert -> user_info 테이블 insert 의 과정을 거쳐야 회원가입이 완료 되기 때문에 transection을 이용함
   
            * transection이 완료되지 않으면 중간 단계에서 실패하면 전체 데이터가 들어가지 않음
   
            
   
         5. 로그인쪽도 기능을 하기위해 추가하자
   
            1. client
   
               ```react
               // login
               login = async () => {
                   try{
                       const send_param = {
                           headers,
                           email: this._login_email.value,
                           pw: this._login_pw.value,
                       };
               
                       const result = await axios.post("http://localhost:8080/user/login", send_param);
                       if(result.data.resultCode) {
                           this.setState({
                               user_email: this._login_email.value,
                               logined: true,
                               page_status: "logined"
                           });
                           alert(result.data.msg);
                       } else {
                           alert(result.data.msg);
               
                           this._login_email.value = "";
                           this._login_pw.value = "";
                       }
                   } catch (err) {
                       console.log("Login Error");
                       console.log(err);
                   }
               }
               ```
   
               
   
            2. server의 user.js의 login 부분
   
               ```javascript
               router.post("/login", async (req, res, next) => {
                   const email = req.body.email;
                   const pw = req.body.pw;
               
                   let msg = "";
                   let resultCode;
               
                   // 일단은 email만 체크
                   const search_result = await Users.findOne({ where : { email }});
                   if(search_result) {
                       resultCode = 1;
                       msg = `${search_result.email}님 환영합니다!`;
                   } else {
                       resultCode = 0;
                       msg = "이메일 또는 비밀번호가 틀립니다";
                   }
               
                   res.json({ resultCode, msg });
               });
               ```
   
         
   
      8. 세션 기능이 되도록 추가하자
   
         1. server의 터미널에서(서버가 가동중이면 `ctrl+c`로 종료 한 후) `npm i express-session`을 입력하여 설치한다
   
            
   
         2. server.js에 다음과 같은 내용을 추가한다
   
            ```javascript
            const express = require("express");
            ///////////////////////////////////////////////////////////////////////////
            const session = require("express-session");
            ///////////////////////////////////////////////////////////////////////////
            const cors = require("cors");
            const sequelize = require("./models").sequelize;
            const app = express();
            
            const corsOptions = {
                origin: true,
                credentials: true
            }
            app.use(cors(corsOptions));
            
            sequelize.sync();
            
            //////////////////////////////////////////////////////////////////////////
            app.use(session({
                resave:false,
                saveUninitialized:true,
                secret:"프로젝트 넘 좋아용 오홍홍",
                cookie:{
                    httpOnly:true,
                    secure:false
                }
            }));
            //////////////////////////////////////////////////////////////////////////
            
            app.use(express.urlencoded({ extended: true }));
            app.use(express.json());
            
            // routers
            app.use("/", require("./routes/index"));
            app.use("/user", require("./routes/user"));
            
            app.listen(8080, () => {
                console.log("Server Ready!");
            });
            ```
   
            
   
         3. user.js의 로그인 처리 부분에 다음을 추가후 로그아웃 처리(세션 파괴) 추가
   
            ```javascript
            // login process
            router.post("/login", async (req, res, next) => {
                const email = req.body.email;
                const pw = req.body.pw;
            
                let msg = "";
                let resultCode;
            
                const search_result = await Users.findOne({ where : { email }});
                if(search_result) {
                    resultCode = 1;
            ///////////////////////////////////////////////////////////////////////////
                    req.session.id = search_result.id;
                    req.session.email = search_result.email;
            ///////////////////////////////////////////////////////////////////////////
                    msg = `${search_result.email}님 환영합니다!`;
                } else {
                    resultCode = 0;
                    msg = "이메일 또는 비밀번호가 틀립니다";
                }
            
                res.json({ resultCode, msg });
            });
            
            // logout
            router.get("/logout", (req, res) => {
                req.session.destroy(() => {
                    res.json({ msg: true });
                });
            });
            
            //...
            ```
   
            
   
         4. client의 logout부분을 다음과 같이 수정
   
            ```react
            //logout
            logout = async () => {
                try {
                    const result = await axios.get("http://localhost:8080/member/logout", {})
                    if(result.data.Bodymsg){
                        this.setState({
                            user_email: "",
                            logined: false,
                            page_status: "not_login"
                        });
                    }
                }catch (err) {
                    console.log(err);
                }
            }
            ```
   
            하지만 새로고침을 하면 로그인이 풀려버린다
   
            **세션은 8080 port인 서버에 있지만, 새로고침은 react process인 3000번 port로 요청이 간다.  따라서 로그인 중이라는 증명할 것이  필요하다**
   
            
   
         5. jQuery, cookie를 사용하여 증명 할 수 있다
   
            1. `npm i jquery  jquery.cookie`로 설치
   
            2. `import $ from "jquery";`, `import { } from "jquery.cookie";`로 사용할 곳에 import
   
            3. 로그인 부분에서 `$.cookie("name", value);`로 cookie에 값을 저장 가능
   
            4. 로그아웃 부분에서 `$.removeCookie("name");로` cookie 삭제 가능
   
            5. cookie값의 여부로 새로고침(3000번 포트로 요청)해도 cookie 값으로 로그인 된 레이아웃을 유지하는 것이 가능하다.
   
               
   
         6. 여기서는 HTML5의 Web Storage를 이용하여 증명하도록 만들것이다
   
            * Web Storage란?
   
              1. Storage 방식
   
                 * localStorage
                   * 로컬에 origin 별로 지속되는 스토리지
                   * 시간제한이 없고 브라우저가 꺼져도 죽지 않는다
                   * 값을 지우려면 직접 지워줘야한다
                 * sessionStorage
                   * 현재 세션 동안만 유지되는 스토리지
                   * 보통 세션의 종료는 일반적으로 브라우저의 종료를 뜻한다
                   * 그러나 sessionStorage에서 의미하는 세션은 가장 작은 단위인 탭단위를 의미한다
                   * 탭마다 sessionStorage는 따로 배정되며 서로의 영역을 공유하지 않는다, 값을 침범할 수 도 없다
   
                 
   
              2. cookie와의 차이점
   
                 1. cookie
   
                    * 4KB의 데이터 저장 제한, 시간제한, 갯수제한 
                    * requst와 response시에 모든 쿠키를 다 넘겨야 했는데 원래 비용이 큰 http통신에 더 큰 부하를 준다
                    * 같은 쿠키는 도메인 내의 모든 페이지에 같이 전달 됨
                    * HTTP 요청에 암호화 되지 않고 보내기 때문에 보안에 취약함
                    * 쿠키는 사용자의 로컬에 텍스트로 저장 되어있어 쉽게 접근, 내용 확인이 가능함
   
                    
   
                 2. web storage
   
                    * ie는 10MB, 다른 브라우저는 5MB의 용량제한, 시간제한 x, 갯수제한 x
                    * 서버로는 전달이 되지 않고 브라우져 로컬에만 저장
                    * sessionStorage의 존재로 세션이 유지되는 동안만 필요한 데이터를 저장
                    * javascript 객체 저장가능
                    * sessionStorage사용 시 다른 탭과 데이터가 공유되지 않음
                    * 공유할 데이터는 localStorage에 넣으면 됨
                    * 이벤트 존재
   
                    
   
                 3. 사용해보자!
   
                    1. Navigation.jsx의 login 부분에 다음과 같이 추가
   
                       ```react
                       // login
                           login = async () => {
                               //...
                                   const result = await axios.post("http://localhost:8080/user/login", send_param);
                                   if(result.data.resultCode) {
                       /////////////////////////////////////////////////////////////
                                       // localStorage에 login_email을 key로 email 값을 넣어줌
                                       localStorage.setItem("login_email", this._login_email.value);
                       /////////////////////////////////////////////////////////////
                                       this.setState({
                                           user_email: this._login_email.value,
                                           logined: true,
                                           page_status: "logined"
                                       });
                       
                                       alert(result.data.msg);
                                   } else {
                                       //...
                       ```
   
                       
   
                    2. logout 부분에 다음을 추가
   
                       ```react
                       //logout
                       logout = async () => {
                           try {
                               const result = await axios.get("http://localhost:8080/user/logout", {})
                               if(result.data.msg){
                       /////////////////////////////////////////////////////////////
                                   // 빈 문자열로 설정
                                   localStorage.setItem("login_email", "");        
                       /////////////////////////////////////////////////////////////
                                   this.setState({
                                       user_email: "",
                                       logined: false,
                                       page_status: "not_login"
                                   });    
                               }
                           }catch (err) {
                               console.log(err);
                           }
                       }
                       ```
   
                       
   
                    3. Navigation.jsx를 다음과 같이 수정
   
                       ```react
                       //...
                       
                       class Navigation extends Component {
                           state = {
                               page_status: "not_login",
                               signup_modal: false
                           };
                       
                       //...
                       
                       // page 전환
                       pageStatus = () => {
                           let page_status = this.state.page_status;
                       
                           if((localStorage.getItem("login_email") !== "") && 
                              (page_status === "not_login"))
                               page_status = "logined";
                       
                           switch(page_status){
                               case "not_login": 
                                   return <NotLoginContainer />;
                       
                               case "logined":
                                   return (
                                       <div>
                                           <VideoContainer />
                                           <ApplyBoard />
                                       </div>
                                   );
                       
                               case "user_info":
                                   return (
                                       <UserInfo email={localStorage.getItem("login_email")} />
                                   );
                       
                               default :
                                   return <div>error</div>;
                           }
                       }
                       
                           render (){
                               let login_form;
                               if(localStorage.getItem("login_email") !== ""){
                                   login_form = 
                                   <div>
                                       <Button onClick={this.user_info} variant="outline-default">{localStorage.getItem("login_email")}</Button>
                                       <Button onClick={this.logout} variant="outline-default">로그아웃</Button>
                                   </div>;
                               } else {
                                   login_form = 
                                   <Form inline>
                                       <FormControl type="text" ref={ref=>this._login_email=ref} placeholder="email" className="mr-sm-2" />
                                       <FormControl type="password" ref={ref=>this._login_pw=ref} placeholder="password" className="mr-sm-2" />
                                       <Button onClick={this.login} variant="outline-default">로그인</Button>
                                       <Button onClick={() => this.signup_modal_status(true)} variant="outline-default">회원가입</Button>
                                   </Form>;
                               }
                       
                               const page = this.pageStatus();
                       
                               return (
                                   <div>
                                       <Navbar bg="light" variant="light">
                                           <Navbar.Brand href="" className="mr-auto">LOGO</Navbar.Brand>
                                           {login_form}
                                       </Navbar>
                                       {/* signup modal */}
                                       <Modal show={this.state.signup_modal} onHide={() => this.signup_modal_status(false)}>
                                           <Modal.Header closeButton>
                                               <Modal.Title>회원가입</Modal.Title>
                                           </Modal.Header>
                                           <Modal.Body>
                                               <Form>
                                                   <Form.Group>
                                                       <Form.Label>Email</Form.Label>
                                                       <Form.Control ref={ref=>this._signup_email=ref} type="email" placeholder="name@example.com" />
                                                   </Form.Group>
                                                   <Form.Group>
                                                       <Form.Label>Password</Form.Label>
                                                       <Form.Control ref={ref=>this._signup_pw=ref} type="password" placeholder="password" />
                                                   </Form.Group>
                                                   <Form.Group>
                                                       <Form.Label>Nickname</Form.Label>
                                                       <Form.Control ref={ref=>this._signup_nickname=ref} type="text" placeholder="닉네임" />
                                                   </Form.Group>
                                                   <Form.Group>
                                                       <Form.Label>소개글</Form.Label>
                                                       <Form.Control ref={ref=>this._signup_intro=ref} as="textarea" rows="5" />
                                                   </Form.Group>
                                               </Form>
                                           </Modal.Body>
                                           <Modal.Footer>
                                               <Button variant="primary" onClick={this.signup}>
                                               가입
                                               </Button>
                                               <Button variant="secondary" onClick={() => this.signup_modal_status(false)}>
                                                   취소
                                               </Button>
                                           </Modal.Footer>
                                       </Modal>
                                       {page}
                                   </div>
                               );
                           }
                       }
                       
                       export default Navigation;
                       ```
   
                       * 결과 화면
   
                       ![logined_new](https://user-images.githubusercontent.com/20276476/75322076-772d3e00-58b5-11ea-81a9-19e45500abcd.png)
   
                       새로고침을 해도 로그인 된 상태라면 메인 화면이 나온다
   
         
   
      9. 