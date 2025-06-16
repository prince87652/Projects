const apiKey = "3352c28a355af517837e5194e414943a";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchIn = document.querySelector(".search input")
    const searchBtn = document.querySelector(".search button");
    const icon = document.querySelector(".icon")



async function check(city){

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"
    }
    else{
    var data = await response.json()
    console.log(data)

    document.querySelector(".city").innerHTML= data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


    document.querySelector(".weather").style.display = "block"
}

}

searchBtn.addEventListener("click",()=>{
    check(searchIn.value);
})



