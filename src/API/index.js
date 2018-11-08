class Helper {
  static baseURL() {
    //This URL is used to make venue data request
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const APIkeys = {
      //Store FourSquare API keys
      client_id: "MWHAN5E1BGC0UMOBZUNW0FFOCGLF5Y0XQ4O5TRJSIPNUXDUV",
      client_secret: "AZ3KLNCAR4HYYHGC40YTBQI3SUBJOIHP1PDD2400GVBN1PDI",
      v: "20181025"
    };
    return Object.keys(APIkeys).map(key => `${key}=${APIkeys[key]}`).join("&");
  }


  static urlGenerator(urlPrams) {
    if (!urlPrams) {//if empty, return an empty string
      return "";
    }
    //If not empty, return object keys for venues
    return Object.keys(urlPrams).map(key => `${key}=${urlPrams[key]}`).join("&");
  }

  static headers() {
    return {Accept: "application/json"};
  }

  //Create fetch for the endpoint, method, and URL parameters for venue
  static simpleFetch(endPoint, method, urlPrams) {
    let venueData = {
      method,
      headers: Helper.headers()
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlGenerator(urlPrams)}`, venueData).then(response => response.json()).catch(error => {
        alert('Error While getting data from FourSquare API')
        console.error(error)
      })
  }
}

//Export the class that will be used for the venue data's endpoints
export default class FourSquareAPI {
  static search(urlPrams) {
    return Helper.simpleFetch("/venues/search", "GET", urlPrams);
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
