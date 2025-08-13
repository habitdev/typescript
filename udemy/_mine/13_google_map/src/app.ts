// Code goes here!
import axios from 'axios';
/// <reference types="google.maps" />

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = '';

// declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  type GoogleGeoCodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
  };

  // send this to Google's API
  axios
    .get<GoogleGeoCodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}+Amphitheatre+Parkway,+Mountain+View,+CA&key=${GOOGLE_API_KEY}`)
    .then((response) => {
      // console.log(response);

      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location!');
      }

      let map: google.maps.Map;

      const coordinates = response.data.results[0].geometry.location;
      // console.log(coordinates);
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: coordinates,
        zoom: 16,
      });

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
