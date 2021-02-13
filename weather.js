const COORDS = "coords";
const API_KEY = "18e5e82c3bba6535bda86f6e18bedf4c";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      //데이터가 완전히 들어온 다음 함수 호출
      return response.json();
    })
    .then(function (json) {
      //데이터가 완전히 준비될때까지 기달
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}°C in ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, //객체의 key와 내용 같을때 작성 방법
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access geo location");
}

function askForCoords() {
  //첫번째 인자는 성공했을때 실행할 함수, 두번째는 실패했을때 실행함수
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
