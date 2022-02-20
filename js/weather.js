const API_KEY="c4d24c0070991d726a1894e4102a0a36";


function onGeoOk(posiiton){
    const lat = posiiton.coords.latitude;
    const lng = posiiton.coords.longitude;
    //console.log("You live in", lat, lng);
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        const icon  = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const img = document.createElement("img");
        const div = document.createElement("div");
        div.innerText=`${data.main.temp}℃`;
        div.className="text-center";
        img.src=icon;
        weather.appendChild(img);
        weather.appendChild(div);
        city.innerText= data.name;
    });
}
function onGeoError(){
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);