const request = require("request");
const ids = require("./ids");


// defining url for HERE api
authUrl = "https://tracking.api.here.com/users/v2/login"
apiUrl = "https://tracking.api.here.com/traces/v2/" + ids.tracking_id;

// defining parameters to API call
bTime = 0;
aTime = 100000;
token = "ABC";

// parameters to POST request for authorization
authParameters = {
  realm: "IoT",
  oauth_consumer_key: device_id.id,
  oauth_signature_method: "HMAC-SHA256",
  oauth_timestamp: 10, //figure out this parameter?
  oauth_nonce: "unique_string", //figure out this parameter?
  oauth_version: 1.0
}

// parameters to GET request for authorization
queryParameters = {
	before: bTime,
	after: aTime,
	pageToken: token
}


/**
 * Function to authenticate user to use HERE's API
 * @param {*} url - the url of the authentication API
 */

function authenticate(url) {

  // making POST call to authenticate
  request.post({
    url: url,

  }) 

}


/**
 * Function to request JSON information from HERE's API
 * @param {*} url - the url of the API
 * @param {*} callback - callback function when err
 */

function requestHereAPI(url) {

	// making GET call to the HERE api
	request.get({
		url: url,
		// qs: queryParameters
	}, function(err, response, body) {
		// if error arises in get request
		if (err) {
			console.log(err);
			return;
		}

		// if successful get request
		console.log("Get response: " + response.statusCode);
		console.log(body);
		if (response.statusCode == 200) {
			return body;
		} else {
			console.log("Error in GET request, with status code " + response.statusCode);
		}

	});
}

requestHereAPI(apiUrl)