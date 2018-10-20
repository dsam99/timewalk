const request = require('request');
const first_url_half = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=";
const second_url_half = "%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=g6i9pjDYZXuZrPbHNCs5&app_code=iJNK1wm-kBqkO3rpPQ5H-w";

/**
 * Takes in the latitude and longitude of some location and returns the approximate address using HERE's geocoder API.
 * @param {*} lat 
 * @param {*} long 
 */
function getAddress(lat,long){
    //Stores both coordinates as strings
    var str_lat = String(lat)
    var str_long = String(long);
    //Requests address from API
    request(
        first_url_half+str_lat+"%2C"+str_long+second_url_half,
        function(err,res,body){
            if(err){
                console.log("failed");
                return err;
            }
            data = JSON.parse(body)
            //Prints Address to console
            console.log(data.Response.View[0].Result[0].Location.Address.Label);
        })
}
getAddress(42.3519,-71.0551);
