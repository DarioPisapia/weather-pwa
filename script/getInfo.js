const getInformation = (n, startingPath) => {
    //get icon, maxT and minT from api's json
    const icon = startingPath['condition']['icon']
    const maxT = `${startingPath['maxtemp_c']} °`
    const minT = `${startingPath['mintemp_c']} °`

    //get date's number and day
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const day = new Date()
    day.setDate(day.getDate() + n)
    const num = day.getDate()
    const dayday = days[day.getDay()]
    
    updateTable(dayday, num, icon, minT, maxT, n)
}


