const getInformation = (jsn, n) => {
    //get icon, maxT and minT from api's json
    const icon = jsn['forecast']['forecastday'][n]['day']['condition']['icon']
    const maxT = `${jsn['forecast']['forecastday'][n]['day']['maxtemp_c']} °`
    const minT = `${jsn['forecast']['forecastday'][n]['day']['mintemp_c']} °`

    //get date's number and day
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const day = new Date()
    day.setDate(day.getDate() + n)
    const num = day.getDate()
    const dayday = days[day.getDay()]
    
    updateTable(dayday, num, icon, minT, maxT, n)
}


