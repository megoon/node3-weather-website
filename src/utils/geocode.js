const axios = require('axios');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWVnb29uIiwiYSI6ImNrcmdkYWtlajA4a2Uyb3BneHdsNHI4anIifQ.bfFNfZQ6eoPDBZiwe0sc1A&limit=1'
    axios.get(url)
    .then(response =>{
        if (response.data.features.length === 0){
            callback('Unable to find location, Try another search.', undefined)
        } else {
            callback(undefined,{
                latitude : response.data.features[0].center[1],
                longitude : response.data.features[0].center[0],
                location : response.data.features[0].place_name
            })
            
        }
    })
    .catch(error => {
        callback('Unable connect location services.', undefined)
    })
 }


 module.exports = geocode; 