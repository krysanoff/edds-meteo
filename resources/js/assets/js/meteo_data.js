'use strict';
function getMeteoData() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState !==4) {
            document.getElementById('Ta').innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
            document.getElementById('Sm').innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
            document.getElementById('Pa').innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
            document.getElementById('Ua').innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        }
    }

    xhr.onload = function () {
        var meteoData = JSON.parse(xhr.responseText),
            windSpeed = Math.round(meteoData.Sm),
            windDirection = '';

        document.getElementById('Ta').innerText = meteoData.Ta;
        document.getElementById('Sm').innerText = windSpeed;
        document.getElementById('Pa').innerText = Math.round(Number(meteoData.Pa)/1.333224);
        document.getElementById('Ua').innerText = meteoData.Ua;

        meteoData.Dm = Number(meteoData.Dm);
        if (windSpeed) {
            if (meteoData.Dm <= 23 || meteoData.Dm >= 337) {
                windDirection = 'южный';
            } else if (meteoData.Dm > 23 && meteoData.Dm < 67) {
                windDirection = 'юго-восточный';
            } else if (meteoData.Dm >= 67 && meteoData.Dm <= 113) {
                windDirection = 'восточный';
            } else if (meteoData.Dm > 133 && meteoData.Dm < 157) {
                windDirection = 'северо-восточный';
            } else if (meteoData.Dm >= 157 && meteoData.Dm <= 203) {
                windDirection = 'северный';
            } else if (meteoData.Dm > 203 && meteoData.Dm < 247) {
                windDirection = 'северо-западный';
            } else if (meteoData.Dm >= 247 && meteoData.Dm <= 293) {
                windDirection = 'западный';
            } else if (meteoData.Dm > 293 && meteoData.Dm < 337) {
                windDirection = 'юго-западный';
            }
        }
        

        document.getElementById('Dm').innerText = windDirection;
    }

    xhr.open('POST', 'getMeteoData.php', true);
    xhr.send();
}


setTimeout(function run() {
    getMeteoData();
    setTimeout(run, 60000);
}, 1000);

setTimeout(function () {
    location.reload();
}, 1000*60*60);
