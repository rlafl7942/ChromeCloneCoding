const body = document.querySelector("body");

const IMG_NUM = 3;

function paintImage(imgnumber) {
  const image = new Image();
  image.src = `images/${imgnumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUM);
  return number;
}

function init() {
  const randomNumber = genRandom();
  window.onload = paintImage(randomNumber); //로드 다 하고 화면 보여주기
}

init();
