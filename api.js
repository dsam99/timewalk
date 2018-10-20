const request = require("request");
const ids = require("./ids");


// defining url for HERE api
authUrl = "https://tracking.api.here.com/users/v2/login"
apiUrl = "https://tracking.api.here.com/traces/v2/" + ids.tracking_id;
timeUrl = "https://tracking.api.here.com/v2/timestamp";

// defining parameters to API call
bTime = 0;
aTime = 100000;
token = "ABC";

// parameters to POST request for authorization
authParameters = {	
	realm: "IoT",
	oauth_consumer_key: ids.device_id,
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
 * Function to calculate the timestamp of the login
 * @param {*} url - the url to where to make the GET request
 */

function getTimeStamp() {
	//requesting timestamp
	request.get({ url: timeUrl },
		function (err, response, body) {
			// error encountered in accessing timestamp
			if (err) {
				console.log(err);
			}

			// checking for correct status of document
			if (response.statusCode == 200) {
				// parsing response from request
				data = JSON.parse(body);
				timeStamp = data.timestamp;

				console.log("Timestamp is: " + timeStamp);

				// changing parameters to get request
				authParameters.oauth_timestamp = timeStamp;
				// console.log(authParameters)
				authenticate(authUrl, authParameters);
			}
			else {
				console.log("Error with status code " + response.statusCode);
			}
		}
	)
}

/**
 * Function to authenticate user to use HERE's API
 * @param {*} url - the url of the authentication API
 */

function authenticate(url, authParameters) {
	request.post(
		url,
		authParameters,
		function (error, response, body) {
			console.log(body);
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
		}
	);

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
	}, function (err, response, body) {
		// if error arises in get request
		if (err) {
			console.log(err);
			return;
		}

		// if successful get request
		console.log("Get response: " + response.statusCode);
		data = JSON.parse(body);
		if (response.statusCode == 200) {
			return data;
		} else {
			console.log("Error in GET request, with status code " + response.statusCode);
		}

	});
}

function main() {
	getTimeStamp();
	// requestHereAPI(apiUrl)
}

main();


