const allocate = () => {
    var zipCode = document.getElementById("zipCode").value
  fetch(`http://api.zippopotam.us/us/`+zipCode)
  .then(function (response) {
	// The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
})}

console.log(allocate())
