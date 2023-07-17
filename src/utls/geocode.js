const getPosition = async function (userCity) {
  try {
    const res = await fetch(`https://geocode.maps.co/search?city=${userCity}`);

    const data = await res.json();

    const { lat, lon, display_name } = data[0];

    const city = display_name.split(',').at(0);
    const country = display_name.split(',').at(-1);

    return { lat, lon, city, country };
  } catch (err) {
    // return { error: 'Unable to find the location!' };
    return { error: `${err.message}` };
  }
};

const getWeatherCondition = async function (address) {
  try {
    const addressDetails = await getPosition(address);
    if (addressDetails.error) return addressDetails;
    const { lat, lon, city, country } = addressDetails;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a6502f01b9d8cab5488e27697b470e5&units=metric`
    );

    const data = await res.json();

    const {
      weather,
      main: { temp, feels_like },
    } = data;

    const { main, description } = weather[0];

    const forcast = `${main}, ${description}.It is currently ${temp} degrees out.It feel like ${feels_like} degree.`;
    const location = `${city}, ${country}`;

    return { forcast, location, city };
  } catch (err) {
    return { error: 'Unable to connect to the service!' };
  }
};

module.exports = {
  getWeatherCondition,
};
