const getLocation = () => {
    document.getElementById('overlay').style.display = 'block'
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getCoords, error);
    }else {
        alert('Geolocation is not supported by your browser');
    }
} 

//get the current user's coordinates 
const getCoords = (position) => {
    const latitude = (position.coords.latitude).toFixed(4)
    const longitude = (position.coords.longitude).toFixed(4)

    //insert the coordinate into the hidden input
    document.getElementById('locationHidden').value = latitude+','+longitude
    //insert the img to show and then remove overlay
    document.getElementById('tableDiv').style.backgroundImage = 'url(../img/background.png)'
    document.getElementById('overlay').style.display = 'none'
    //when all is completed call the main function
    getWeather()
}
const error = () => {
    alert('Unable to retrieve your current location')
}

// take the value from input and copy into the hidden input, remove overlay and call the main function
const searchButton = () => {
    document.getElementById('locationHidden').value = document.getElementById('location').value;
    document.getElementById('tableDiv').style.backgroundImage = 'url(../img/background.png)'
    document.getElementById('overlaySearch').style.display = 'none';
    getWeather()
}