const celsius_field=document.querySelector(".celsius");
const fahrenheit_field=document.querySelector(".fahrenheit");
const location_field=document.querySelector(".Location_text p");
const region_field=document.querySelector(".region");
const country_field=document.querySelector(".country");
const date=document.querySelector(".Location_text span");
const img=document.querySelector(".weather_condition img");
const condition_field=document.querySelector(".weather_condition span");

const form=document.querySelector("form");
const search=document.querySelector(".search_feild");



async function fetchData(target) {
  const endPoint = `http://api.weatherapi.com/v1/current.json?key=26c3ed8aec5f46948a9175858250407&q=${target}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  const current_celsius=data.current.temp_c;
  const current_fahrenheit=data.current.temp_f;
  const current_location=data.location.name;
  const current_region=data.location.region;
  const current_country=data.location.country;
  const current_date=data.location.localtime;
  const weather_condition=data.current.condition.text;
  const weather_logo=data.current.condition.icon;

  const code=data.current.condition.code;

  updateweather(current_celsius, current_fahrenheit, current_location, current_region, current_country, current_date, weather_condition, weather_logo, code);
}


function updateweather(cur_temperature, cur_fahrenheit, cur_location, cur_region, cur_country, cur_date, cur_weather_condition, cur_weather_logo, code){
  celsius_field.innerText=cur_temperature;
  fahrenheit_field.innerText=cur_fahrenheit;
  location_field.innerText=cur_location;
  region_field.innerText=cur_region;
  country_field.innerText=cur_country;
  date.innerText=cur_date;
  condition_field.innerText=cur_weather_condition;
  img.src=cur_weather_logo;

  const body=document.querySelector("body");

  const rainy = [1063, 1150, 1153, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1246];
  const thunder=[1087, 1273, 1243, 1279, 1282];
  const sunny=[1000, 1003, 1006, 1009];
  const snow= [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264];
  const mist= [1030, 1135, 1147];
  // rainy
  if(rainy.includes(code)){
    body.style.backgroundImage =  "url('images/rain.gif')";
  }
  //thunder
  else if(thunder.includes(code)){
    body.style.backgroundImage="url('images/thor.gif')";
  }
  //thunder and rain
  else if(code===1276){
    body.style.backgroundImage="url('images/thunderrain.gif')"
  }
  //sunny
  else if(sunny.includes(code)){
    if(parseFloat(celsius_field.innerText) >= 35){
      body.style.backgroundImage="url('images/sunny.gif')";
    }
    else{
      body.style.backgroundImage="url('images/creed.gif')";
    }
  }
  //Snow 
  else if(snow.includes(code)){
    body.style.backgroundImage="url('images/kratos.gif')";
  }
  // mist
  else if(mist.includes(code)){
    body.style.backgroundImage="url('images/mist.gif')";
  }
}

const form_feild=document.querySelector("form");
const search_feild = document.querySelector(".search_feild")

form.addEventListener("submit",function(e){
  e.preventDefault();
  const target=search_feild.value;
  if(target.length===0){
    alert("Incorrect, Kindly enter your City name");
    return;
  }
  fetchData(target);
});
