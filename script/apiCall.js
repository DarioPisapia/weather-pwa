
const getWeather = () => {
    //get value from hidden input
    const location = document.getElementById('locationHidden').value

    //use the value to complete the api call and procede to fetch
    const url = `http://api.weatherapi.com/v1/forecast.json?key=ee89cb73dd414cecb5a190207221707&q=${location}&days=3&aqi=no&alerts=no`
    fetch(url)
    .then((response) => {
        return response.json()
    }).then ((jsn) => {

        const numOfDays = 3
        
        //call the function to get the needed info a 'numOfDay' times
        for (let i=0; i<numOfDays; i++){
            getInformation(jsn, i)
        }
    })   
}





