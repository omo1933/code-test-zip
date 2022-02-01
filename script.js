const allocate = (zipCode) => {
  fetch(`http://api.zippopotam.us/us/` + zipCode)
    .then(function (response) {
      // The API call was successful!
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      // This is the JSON from our response
      console.log(data);
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
};

const input = document.querySelector("input");
const log = document.getElementById("values");

input.addEventListener("input", updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}

const result = () => {
  console.log(allocate(log.textContent));
};
