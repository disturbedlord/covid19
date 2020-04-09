var response;
var layer;
var covidData = [];
var allCases = 0;
var allRecovered = 0;
var allDeaths = 0;
function fetchData() {
  const map = fetch("../countries_layer.geojson")
    .then((res) => res.json())
    .then((countries) => {
      layer = countries;
    });
  const getData = fetch("https://corona.lmao.ninja/countries?sort=country")
    .then((res) => res.json())
    .then((fetchData) => {
      response = fetchData;
      // console.log(response);
    })
    .then((res) => open());

  //   open();
}
function open() {
  // Gen random data
  //   fetchData();
  // console.log("opening");
  //   globe();
  const N = 300;
  //   gData = [...Array(N).keys()].map(() => ({
  //     lat: (Math.random() - 0.5) * 180,
  //     lng: (Math.random() - 0.5) * 360,
  //     size: Math.random() / 3
  //     // color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)]
  //   }));

  //   console.log(data[0].countryInfo.lat);
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
  globe(layer, covidData, allCases, allDeaths, allRecovered);
}

function getCovidData(data) {
  for (var item of data) {
    // console.log(item);
    allCases += item.cases;
    allRecovered += item.recovered;
    allDeaths += item.deaths;
    var dict = {
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
