const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = []; //todo 입력하면 array에 추가되게 함.
// toDos값을 deleteToDo에서 값을 바꿔주기 때문에 let
function deleteToDo(event) {
  const btn = event.target; //눌린 버튼 찾기
  const li = btn.parentNode; //눌린 버튼의 부모인 li 찾기
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); //li.id가 문자열이기 때문에 숫자로 만들어줌.
  });
  toDos = cleanToDos;
  saveToDos();
  //filter는 배열의 모든 아이템을 통해 함수를 실행하고
  //true인 아이템만 가지고 새로운 배열을 만듦.
}

function saveToDos() {
  //로컬스토리지에는 string만 저장 가능
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //JSON.stringify는 자바스크립트의 object를 string으로 바꿔줌.
  //JSON = Javascript Object Notation
  //데이터를 전달할 때, js가 그걸 다룰 수 있도록 object로 바꿔주는 기능
  //string->object 또는 object->string 가능
}
let idNumber = 1;
function paintToDo(text) {
  const li = document.createElement("li"); //요소생성
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumber;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn); //li에 delBtn 자식으로 넣기
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); //배열에 집어넣기
  saveToDos(); //push한 후에 호출하기
  idNumber++;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

/*function something(toDo){
   이렇게 작성하고 loadToDos() 안에 
   parsedToDos.forEach(something);
   이렇게 작성해도 똑같음.
}*/

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //object로 변환
    parsedToDos.forEach(function (toDo) {
      //함수 안의 것들을 한번씩 다 실행시켜준다.
      //함수 안의 것들을 함수의 인자인 toDo로 보내줌
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
