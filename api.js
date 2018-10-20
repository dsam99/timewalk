const request = require('request')
const ids = require('./ids')
// const uuid = require('uuidv4')
const fs = require('fs')
const first_url_half = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=";
const second_url_half = "%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=g6i9pjDYZXuZrPbHNCs5&app_code=iJNK1wm-kBqkO3rpPQ5H-w";

// defining url for HERE api
authUrl = 'https://tracking.api.here.com/users/v2/login'
apiUrl = 'https://tracking.api.here.com/traces/v2/' + ids.tracking_id
timeUrl = 'https://tracking.api.here.com/v2/timestamp'
placesUrl = 'https://places.cit.api.here.com/places/v1/discover/here'

// defining parameters to API call
bTime = 0
aTime = 100000
token = 'ABC'

// parameters to POST request for authorization
authParameters = {
  realm: 'IoT',
  oauth_consumer_key: ids.device_id,
  oauth_signature_method: 'HMAC-SHA256',
  oauth_timestamp: 10, // figure out this parameter?
  oauth_nonce: 'unique_string', // figure out this parameter?
  oauth_version: 1.0
}

// parameters to GET request for authorization
queryParameters = {
  before: bTime,
  after: aTime,
  pageToken: token
}

headers = {
  Authorization: ids.bearer_token
}

/**
 * Function to calculate the timestamp of the login
 * @param {*} url - the url to where to make the GET request
 */

function getTimeStamp () {
  // requesting timestamp
  request.get({ url: timeUrl },
    function (err, response, body) {
      // error encountered in accessing timestamp
      if (err) {
        console.log(err)
      }

      // checking for correct status of document
      if (response.statusCode == 200) {
        // parsing response from request
        data = JSON.parse(body)
        timeStamp = data.timestamp

        console.log('Timestamp is: ' + timeStamp)

        // changing parameters to get request
        authParameters.oauth_timestamp = timeStamp
        // console.log(authParameters)
        authenticate(authUrl, authParameters)
      }else {
        console.log('Error with status code ' + response.statusCode)
      }
    }
  )
}

/**
 * Function to authenticate user to use HERE's API
 * @param {*} url - the url of the authentication API
 */

function authenticate (url, authParameters) {
  request.post(
    url,
    authParameters,
    function (err, response, body) {
      if (err) {
        console.log('Error')
        console.log(err)
      }

      // if correct status code
      if (response.statusCode == 200) {
        console.log(body)
      }

      data = JSON.parse(body)
      console.log(data.error)
    }
  )
}

/**
 * Function to request JSON information from HERE's API
 * @param {*} url - the url of the API
 * @param {*} callback - callback function when err
 */

function requestHereAPI (url) {

  // generating uuid value
  // uid = uuid()
  // console.log(uid)

  // making GET call to the HERE api
  request.get({
    headers: headers,
    url: url,
    method: 'GET'

  }, function (err, response, body) {
    // if error arises in get request
    if (err) {
      console.log(err)
      return
    }

    // if successful get request
    console.log('Get response: ' + response.statusCode)
    body_json = JSON.parse(body)
    if (response.statusCode == 200) {
      console.log(body_json.data)

      var json = JSON.stringify(body_json.data)
      // writing JSON data to a file
      // fs.writeFile('here_data.json', json, 'utf8', function(){
      // 	console.log("Error in writing to file")
      // })
      return body_json.data
    } else {
      console.log('Error in GET request, with status code ' + response.statusCode)
    }
  })
}

/**
 * Function to get the place name using HERE's place api
 * @param {*} url - the url of the API
 * @param {*} lat - the latitude of the location
 * @param {*} lng - the longitude of the location
 */
function placesAPI (url, lat, lng) {

  // information about app
  app_id = 'g6i9pjDYZXuZrPbHNCs5'
  app_code = 'iJNK1wm-kBqkO3rpPQ5H-w'

  // making get request url
  url = 'https://places.cit.api.here.com/places/v1/discover/here'
  url += ('?app_id=' + app_id)
  url += ('&app_code=' + app_code)
  url += ('&at=' + lat.toString() + ',' + lng.toString())

  request.get(url,
    function (err, response, body) {
      if (err) {
        console.log('Error')
        console.log(err)
      }

      // if correct status code
      if (response.statusCode == 200) {
        data = JSON.parse(body)
        cleanPlaceData(data);

      // if error is encountered
      } else {
        console.log('ERROR', data)
      }
    }
  )
}

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
            cleanAddressData(data);
        })
}

/**
 * Takes in a json object of address data, and sets media and text fields to null and then 
 * returns the address label. Label is the text address
 * @param {*} data 
 */
function cleanAddressData(data){
  data.Response.View[0].Result[0].Location.media = null;
  data.Response.View[0].Result[0].Location.text = null; 
  return data.Response.View[0].Result[0].Location.Address.Label;
}

function cleanPlaceData(data){
  data.results.items.media = null;
  data.results.items.text = null;
  return data.results.items[0].title;
}

function main () {
  // getTimeStamp()
  // requestHereAPI(apiUrl)
  getAddress(41.8268,-71.4025);
  placesAPI(placesUrl, 41.8268, -71.4025);
}

main()
