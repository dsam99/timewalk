const https = require("https");

// defining url for HERE api
apiUrl = "https://tracking.api.here.com/traces/v2/daniel_ritter";


/**
 * Function to request JSON information from HERE's API
 * @param {*} url - the url of the API
 * @param {*} callback - callback function when err
 */

async function requestHereAPI(url) {
    var httpRequest = new XMLHttpRequest();
    
    await httpRequest.onreadystatechange {
        if (this.readyState == 4 && this.status == 200) {
            var apiData = JSON.parse(this.responseText);
            return apiData
        }
    };

    httpRequest.open("GET", url, false);
    httpRequest.send();
    


}

const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(
      `City: ${body.results[0].formatted_address} -`,
      `Latitude: ${body.results[0].geometry.location.lat} -`,
      `Longitude: ${body.results[0].geometry.location.lng}`
    );
  });
});