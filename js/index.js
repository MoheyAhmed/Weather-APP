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
let next_condition_text = document.getElementsByClassName("next_condition_text");

// console.log(tomorrow_date);


// console.dir(date);
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-US", { weekday: "long" }));
// console.log(date.toLocaleDateString("en-US", { month: "long" }));

async function getWeatherData(city = "banha") {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=be81a66d331b4b12935154152252606&q=${city}&days=5`
  );
  let weatherData = await res.json();
  // console.log(weatherData);

  return weatherData;
}

// getWeatherData()
function displayTodayData(data) {
  const date = new Date();
  today_name.innerHTML = date.getDate()
  today_number.innerHTML = date.toLocaleDateString('en-US' , {weekday : 'long'})
  today_month.innerHTML = date.toLocaleDateString('en-US' , {month : 'long'})
  today_location.innerHTML = data.location.name;
  today_temp.innerHTML = data.current.temp_c;
  today_img.setAttribute("src", "https:" + data.current.condition.icon);
  today_condition.innerHTML = data.current.condition.text;
  humadity.innerHTML = data.current.humidity;
  wind.innerHTML = data.current.wind_kph + "km/h";
  wind_direction.innerHTML = data.current.wind_dir;
}


function  displayNextDays(data){
  // console.log(data.forecast.forecastday[2].date);
  for(let i = 0 ; i < 2 ; i++){
    const nextDate = new Date(data.forecast.forecastday[i + 2].date)
    // console.log(nextDate);
    tomorrow_date[i].innerHTML = nextDate.toLocaleDateString("en-US" , {weekday : 'long'})
    next_max_temp[i].innerHTML = data.forecast.forecastday[i+2].day.maxtemp_c;
    next_min_temp[i].innerHTML = data.forecast.forecastday[i+2].day.mintemp_c;
    next_condition_text[i].innerHTML = data.forecast.forecastday[i+2].day.condition.text;
    next_condition_img[i].setAttribute("src" , 'https:' + data.forecast.forecastday[i+2].day.condition.icon)
  }
  
}

async function getStart(city = "Banha") {
  let weatherData = await getWeatherData(city);
  displayTodayData(weatherData);
  displayNextDays(weatherData)
}

getStart();



searchInput.addEventListener("input" , function(){
  getStart(searchInput.value)
})