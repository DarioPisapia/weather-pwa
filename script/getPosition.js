const getLocation = () => {
    document.getElementById('overlay').style.display = 'block'
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getCoords, error);
    }else {
        alert('Geolocation is not supported by your browser');
    }
} 

const getCoords = (position) => {
    const latitude = (position.coords.latitude).toFixed(4)
    const longitude = (position.coords.longitude).toFixed(4)
    document.getElementById('locationHidden').value = latitude+','+longitude
    document.getElementById('tableDiv').style.backgroundImage = 'url(../img/background.png)'
    document.getElementById('overlay').style.display = 'none'
    getWeather()
}
const error = () => {
    alert('Unable to retrieve your current location')
}


const searchButton = () => {
    document.getElementById('locationHidden').value = document.getElementById('location').value;
    document.getElementById('tableDiv').style.backgroundImage = 'url(../img/background.png)'
    document.getElementById('overlaySearch').style.display = 'none';
    getWeather()
}