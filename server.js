const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// DB 흉내를 내기 위한 적용
const DB = {
  todo: [],
};

app.listen(3000, function () {
  // 서버 시작
  console.log("Hello Node.js 시작합니다.");
});

app.get("/", function (req, res) {
  //
  res.send("Hello Node.js 시작!");
});

app.get("/delete", function (req, res) {
  // 배열에서 특정 값 삭제
  const index = req.query.index;

  console.log("삭제 전 >> ", DB.todo);

  DB.todo.splice(index, 1);

  console.log("삭제 후 >> ", DB.todo);
  res.send({});
});

app.get("/deleteTodo", function (req, res) {
  // CLEAR 삭제 버튼 구현
  DB.todo = []; // 배열에 있는거 다 삭제 하기
  res.send({
    code: "success",
    msg: "성공적으로 저장되었습니다.",
  });
});

app.get("/getTodos", function (req, res) {
  res.send(DB.todo);
});

app.get("/addTodo", function (req, res) {
  const todo = req.query.todo;
  // DB.todo.push(todo); // push 배열 사용 문법(뒤로 쌓이기)
  DB.todo.unshift(todo); // push 배열 사용 문법(앞으로 쌓이기)
  res.send({
    //index.js → $.ajax({}) 함수 → success: function (response) 로 넘겨줌
    code: "success",
    msg: "성공적으로 저장되었습니다.",
  });
});
