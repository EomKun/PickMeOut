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

