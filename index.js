/**
 * 구현 Todo List
 *
 * ========== 검색 기능 구현하기 ==========
 * 검색 input 에 event onkeyup 키보드칠 때 마다 실행
 * event, this .val() 입력 값 가져오기
 * show, hide 보이게 하기, 감추기
 * todo 내용 가져와 비교하기 - 값이 여러개니 배열로.. length 반복문 돌리기
 *
 */
$(document).ready(function () {
  addEvents();
});

function deleteTodo(event) {
  const target = $(event.target);
  target.parent().remove();
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

    // 쿼리스트링(입력한 값 보내주기 : todo 값을)
    // 127.0.0.1 = localhost
    $.ajax({
      url: `http://127.0.0.1:3000/addTodo?todo=${todo}`,
      params: {
        todo: todo,
      },
      success: function (response) {},
    });
  });
  $("form > div > button").on("click", function () {
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

    // foreach문
    todos.each(function (index, element) {
      const todo = $(element).children("span").text();

      if (todo.startsWith(searchText) === false) {
        $(element).hide();
      }
    });
  });
}
