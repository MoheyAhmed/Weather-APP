// https://api.weatherapi.com/v1/forecast.json?key=be81a66d331b4b12935154152252606&q=banha&days=3
// https://api.weatherapi.com/v1/forecast.json?key=be81a66d331b4b12935154152252606&q=${city}&days=3

// today_name
// today_number
// today_month
// let today_location = document.getElementById("today_location")
// today_temp
// today_img
// today_condition
// humadity
// wind
// wind_direction

// searchInput

let tomorrow_date = document.getElementsByClassName("tomorrow_date");
let next_condition_img = document.getElementsByClassName("next_condition_img");
let next_max_temp = document.getElementsByClassName("next_max_temp");
let next_min_temp = document.getElementsByClassName("next_min_temp");
let next_condition_text = document.getElementsByClassName(
  "next_condition_text"
);

async function getWeatherData(city = "banha") {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=be81a66d331b4b12935154152252606&q=${city}&days=3`
  );
  let weatherData = await res.json();
  console.log(weatherData);

  return weatherData;
}

// getWeatherData()
function displayTodayData(data) {
  today_location.innerHTML = data.location.name;
  today_temp.innerHTML = data.current.temp_c;
  today_img.setAttribute("src", "https:" + data.current.condition.icon);
  today_condition.innerHTML = data.current.condition.text;
  humadity.innerHTML = data.current.humidity
  wind.innerHTML = data.current.wind_kph + 'km/h'
  wind_direction.innerHTML = data.current.wind_dir
}

async function getStart(city = "Banha") {
  let weatherData = await getWeatherData(city);
  displayTodayData(weatherData);
}

getStart();
