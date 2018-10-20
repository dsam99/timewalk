const https = require("https");
const request = require("request");

// defining url for HERE api
apiUrl = "https://tracking.api.here.com/traces/v2/daniel_ritter";

// defining parameters to API call
bTime = 0;
aTime = 100000;
token = "ABC";

// optional values for GET request
queryParameters = {
	before: bTime,
	after: aTime,
	pageToken: token
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
		qs: queryParameters
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

x = requestHereAPI(apiUrl)

x.then(function(result) {
	console.log(result)
})