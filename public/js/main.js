const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp_real_val = document.getElementById("temp_real_val");
const dataHide = document.querySelector('.middle_layer');
const day = document.getElementById('day');
const today_date = document.getElementById("today_date");

const getCurrentDay = () => {
    let currentTime = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime = () => {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec",];
    let now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    return `${date} ${month}`;
};

day.innerText = `${getCurrentDay()}`;
today_date.innerText = getCurrentTime();

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value; 
    if(cityVal === ""){
        city_name.innerText = `Plz write city name before search`; 
        dataHide.classList.add('data_hide');
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=5e57cffddb12dd5c0cee055b8077e121&units=metric`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;            
            temp_real_val.innerText = arrData[0].main.temp;

            const tempStatus = arrData[0].weather[0].main
            
            if (tempStatus == "Sunny" || tempStatus == "Clear") {
                temp_status.innerHTML = `<i class="fas fa-solid fa-sun" style="color : #eccc68"></i>`;
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempStatus == "Rainy") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }

            dataHide.classList.remove('data_hide');

        }catch{
            city_name.innerText = `Not valid city name`;            
            dataHide.classList.add('data_hide');
        }
    }
};
submitBtn.addEventListener('click', getInfo);