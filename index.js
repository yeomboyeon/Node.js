$(document).ready(function () {
  // 함수 추가
  getTodos();
  addEvents();
});

function getTodos() {
  // 서버에 저장된 데이터값 가져오기
  $.ajax({
    url: "http://127.0.0.1:3000/getTodos",
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        // 기록한 데이터를 반복문을 통해서 서버에 올려주고 보여주기
        const todo = response[i];

        let html = `<li>
        <span>${todo}</span>
        <button type='button' onclick='deleteTodo(event);'>삭제</button>
        <button type='button' onclick='showUpdateInput(event)'>수정</button>
        </li>`;

        $("#todo-update-form > ul").append(html);
      }
    },
  });
}

function deleteTodo(event) {
  const target = $(event.target);
  const index = target.parent().index();
  // target.parent().remove();

  $.ajax({
    url: `http://127.0.0.1:3000/delete?index=${index}`, //키값 : ?index=,  값 : ${index}
  });
}

function showUpdateInput(event) {
  const nowUpdate =
    $("#todo-update-form").find("input[type=text]").length === 0 ? false : true;

  if (nowUpdate === true) {
    $("#todo-update-form").find("input[type=text]").focus();
    return;
  }

  const target = $(event.target);
  const todo = target.siblings("span");
  const todoText = todo.text();

  const html = `<input type="text" value='${todoText}' />`;

  const nowTagName = target.siblings().first().prop("tagName");

  if (nowTagName === "INPUT") {
    return;
  }

  target.parent().prepend(html);
  todo.remove();
}

function addEvents() {
  $("#todo-update-form").on("submit", function (event) {
    event.preventDefault();
    const updateInput = $("#todo-update-form").find("input[type=text]");
    const updateTodo = updateInput.val();

    updateInput.parent().prepend(`<span>${updateTodo}</span>`);
    updateInput.remove();
  });

  $("#todo-form").on("submit", function (event) {
    event.preventDefault();

    const todo = $("form > input[type=text]").val();

    const html = `<li>
        <span>${todo}</span>
        <button type="button" onclick="deleteTodo(event);">삭제</button>
        <button type="button" onclick="showUpdateInput(event)">수정</button>
    </li>`;

    $("form > ul").prepend(html);
    $("form > input[type=text]").val("");

    $.ajax({
      url: `http://127.0.0.1:3000/addTodo?todo=${todo}`,
      success: function (response) {
        console.log(response);
      },
    });
  });

  $("form > div > button").on("click", function () {
    $.ajax({
      url: "http://127.0.0.1:3000/deleteTodo",
    });

    $("form > ul").empty();
  });

  $("#search-input").on("keyup", function (event) {
    const target = $(event.target);
    const searchText = target.val();
    const todos = $("#todo-update-form > ul > li");

    if (searchText === "") {
      todos.show();
      return;
    }

    todos.each(function (index, element) {
      const todo = $(element).children("span").text();

      if (todo.startsWith(searchText) === false) {
        $(element).hide();
      }
    });
  });
}
