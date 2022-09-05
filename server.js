/** Node.js 내장 모듈 사용
 * express : node.js의 대표적인 웹프레임워크 (모듈)
 * require() : 자바나 파이썬의 import 문이나 C계열의 include 처럼
                외부의 기능을 사용하기 위해서 모듈을 가져오는 것
* 모듈 : 파일을 읽거나 저장하는 기능을 구현할 수 있도록 돕는다
        메서드 목록을 보면 파일을 읽을 때에 쓸법한 메서드 이름을 찾을 수 있다
*/ 

const express = require("express"); 
const app = express();

// 요청을 처리, '/' 경로로 접속하면 send 메세지를 출력해주는 서버를 만듦
app.get("/", function(req, res){
    res.send('Node.js');
});

// 원하는 포트에 서버를 오픈하는 문법
// 인자 값에 서버 오픈할 오픈번호, function(서버 오픈시 실행할 코드) 작성
app.listen(3000, function(){
    console.log('Hello Node.js');
}); 