var response;
var layer;
var maxCases = 0;

var covidData = [];
var allCases = 0;
var allRecovered = 0;
var allDeaths = 0;
function fetchData() {
  const map = fetch(
    "https://raw.githubusercontent.com/disturbedlord/covid19/master/countries_layer.geojson"
  )
    .then((res) => res.json())
    .then((countries) => {
      layer = countries;
      // console.log(countries);
    });
  const getData = fetch("https://corona.lmao.ninja/v2/countries?sort=country")
    .then((res) => res.json())
    .then((fetchData) => {
      response = fetchData;
      // console.log(response);
    })
    .then((res) => open());

  //   open();
}
function open() {
  var data = [];
  for (var country of response) {
    // console.log(country.country);
    var dict = {
      country: country.country,
      lat: country.countryInfo.lat,
      lng: country.countryInfo.long,
      //   size: Math.random(1, 5),
      color: "white",
    };
    data.push(dict);
  }
  // console.log(response[0].countryInfo.iso3);

  getCovidData(response);

  gData = data;
  globe(layer, covidData, allCases, allDeaths, allRecovered, maxCases);
}
function getCovidData(data) {
  for (var item of data) {
    // console.log(item);
    if (item.cases > maxCases) {
      maxCases = item.cases;
    }
    allCases += item.cases;
    allRecovered += item.recovered;
    allDeaths += item.deaths;
    // console.log(item.countryInfo.iso3);
    // console.log(item.deaths);
    // console.log(item.countryInfo.iso3);
    // console.log(item.countryInfo.iso3);

    var dict = {
      country: item.country,
      id: item.countryInfo.iso3,
      deaths: item.deaths,
      img: item.countryInfo.flag,
      totalCases: item.cases,
      active: item.active,
      recovered: item.recovered,
      todayCases: item.todayCases,
      todayDeaths: item.todayDeaths,
    };
    covidData.push(dict);
  }
}
