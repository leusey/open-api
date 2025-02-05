document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  const body = document.querySelector("body");
  body.appendChild(footer);

  // Add a copyright to the footer
  const today = new Date();
  const year = today.getFullYear();
  const copyright = document.createElement("p");
  copyright.innerHTML = `&#169; YeSeul Cho ${year}`;
  footer.appendChild(copyright);

  // DOM Selectors (Getting HTML elements)
  const weatherSection = document.getElementById("weather-section");
  console.log("weatherSection: ", weatherSection);

  const weatherList = weatherSection.querySelector("ul");
  console.log("weatherList: ", weatherList);

  const sunSection = document.getElementById("sun-section");
  console.log("sunSection: ", sunSection);

  const sunList = sunSection.querySelector("ul");
  console.log("sunList: ", sunList);

  const weatherButton = document.getElementById("weather-btn");
  const sunButton = document.getElementById("sun-btn");
  const homeMessage = document.getElementById("home-message");

  // Initially hide both sections
  weatherSection.style.display = "none";
  sunSection.style.display = "none";

  // Function to show weather section
  weatherButton.addEventListener("click", () => {
    weatherSection.style.display = "block";
    sunSection.style.display = "none";
    homeMessage.style.display = "none";
  });

  // Function to show sun section
  sunButton.addEventListener("click", () => {
    sunSection.style.display = "block";
    weatherSection.style.display = "none";
    homeMessage.style.display = "none";
  });

  // First Fetch - Weather Data
  function fetchWeatherData() {
    weatherList.innerHTML = ""; // Clear previous data
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=34.0522&longitude=-118.2437&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather API request failed");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((weather) => {
        console.log("Weather Data: ", weather);

        // Get relevant data
        const dates = weather.daily.time;
        const maxTemps = weather.daily.temperature_2m_max;
        const minTemps = weather.daily.temperature_2m_min;
        const currentTemp = weather.current.temperature_2m;

        // Display current temperature
        const currentTempLi = document.createElement("li");
        currentTempLi.innerText = `Current Temperature: ${currentTemp}°F`;
        // Add to the page
        weatherList.appendChild(currentTempLi);

        // Display daily max/min temps
        for (let i = 0; i < dates.length; i++) {
          const weatherLi = document.createElement("li");
          weatherLi.innerText = `Date: ${dates[i]}, Max: ${maxTemps[i]}°F, Min: ${minTemps[i]}°F`;
          weatherList.appendChild(weatherLi);
        }
      })
      .catch((error) => displayError(weatherSection, error));
  }

  // Second Fetch - Sunrise/Sunset Data
  function fetchSunData() {
    sunList.innerHTML = ""; // Clear previous data
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=34.0522&longitude=-118.2437&daily=sunrise,sunset&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sunrise/Sunset API request failed");
        }
        return response.json();
      })
      .then((sunData) => {
        console.log("Sunrise/Sunset Data: ", sunData);

        // Get sunrise/sunset data
        const sunDates = sunData.daily.time;
        const sunrises = sunData.daily.sunrise;
        const sunsets = sunData.daily.sunset;

        // Display sunrise/sunset for each day
        for (let i = 0; i < sunDates.length; i++) {
          const sunLi = document.createElement("li");
          sunLi.innerText = `Date: ${sunDates[i]}, Sunrise: ${sunrises[i]}, Sunset: ${sunsets[i]}`;
          // Add to the page
          sunList.appendChild(sunLi);
        }
      })
      .catch((error) => displayError(sunSection, error));
  }

  // Error handling function
  function displayError(section, error) {
    console.error(error);
    const errorMessage = document.createElement("p");
    errorMessage.innerText = error.message;
    errorMessage.classList.add("error");
    section.appendChild(errorMessage);
  }

  // Event listeners for Navigation
  weatherButton.addEventListener("click", fetchWeatherData);
  sunButton.addEventListener("click", fetchSunData);
});
