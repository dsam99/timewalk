/**
 * Function to clean the json object to only contain lat/long values a certain
 * distance apart
 * @param {*} json_list - a list of json objects to be cleaned
 * @return - the cleaned json object 
 */
function clean_lat_longs (json_list) {
  last_lat = 0
  last_long = 0

  // accumulator for cleaned location values
  final = [];

  for (index in json_list) {
    json_obj = json_list[index]
    if (!((Math.abs(json_obj.position.lat - last_lat) < .0002) &&
      (Math.abs(json_obj.position.lng - last_long) < .0002))) {
      last_lat = json_obj.position.lat
      last_long = json_obj.position.lng

      temp = {
        'lat': last_lat,
        'long': last_long,
        'timestamp': json_obj.timestamp
      }
      final.push(temp)
    }
  }

  return final
}

// exporting clean_lat_longs to use in api.js
module.exports = {
  clean_lat_longs: clean_lat_longs
}

console.log(clean_lat_longs(data))
