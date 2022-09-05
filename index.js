/**
 * 구현 Todo List
 *
 * ========== 검색 기능 구현하기 ==========
 * 검색 input 에 event on.keyup 키보드칠 때 마다 실행
 * 타겟 지정, 타겟을 별도 변수로 저장
 * 변수에 찾을 위치의 텍스트 태그를 선택자로 저장
 * event, this .val() 입력 값 가져오기
 * foreach문 찾아야하는 값의 텍스트를 찾도록 반복문 구현
 * show 보이게 하기, hide 감추기
 * todo 내용 가져와 비교하기 - 값이 여러개니 배열로.. length 반복문 돌리기
 *
 */
$(document).ready(function () {
  addEvents();
  getTodos();
});

function getTodos() {
  $.ajax({
    url: "http://127.0.0.1:3000/getTodos",
    success: function (response) {
      /*****
       * ['안녕하세요', '안녕하세요1', '안녕하세요2']
       */
    },
  });
}

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

    // 쿼리스트링
    // 127.0.0.1 = localhost
    // 입력한 값(todo)을 보내줘야 서버에 저장되고 홈페이지에 출력되기에 필요함
    // params는 parameters 메소드의 별칭(매개변수)
    // Parameter 매개변수 함수와 메서드 입력 변수(Variable) 명
    // Argument 전달인자, 인자 함수와 메서드의 입력 값(Value)
    $.ajax({
      url: `http://127.0.0.1:3000/addTodo?todo=${todo}`,
//      params: {
//        todo: todo,
      //},
      success: function (response) {
        console.log(response);
      },
    });
  });
  $("form > div > button").on("click", function () {
    $("form > ul").empty();
  });
  $("#search-input").on("keyup", function (event) {
    const target = $(event.target);
    const searchText = target.val();
    const todos = $("#todo-update-form > ul > li"); // 여러개를 가져올 수 있음.

    if (searchText === "") {
    // 찾은 값이 없다면 전체 show 보여주기 그리고 리턴
    // 검색하다가 찾을 글씨를 다 지우면 빈공간이 되는데 그럼 원래 있었던 값들 다 보여줘야 하기에
      todos.show();
      return;
    }

    // jquery에서의 foreach 반복문
    // 찾아야하는 값의 텍스트를 찾도록 반복문 구현
    // 인덱스 번호와 엘리먼트값이 같이 확인되도록 인자값 주기
    // 찾은 값을 엘리먼트로 제어하기 위함
    todos.each(function (index, element) {
      const todo = $(element).children("span").text();
      // 변수에 찾은 값의 엘리먼트의 동생의 태그 중 span 태그가 가진 텍스트를 저장

      if (todo.startsWith(searchText) === false) { // 시작점부터 찾아보기.
        $(element).hide(); // 선택한 엘리먼트만 삭제
      }
    });
  });
}
