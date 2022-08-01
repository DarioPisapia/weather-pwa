//updates weather table with newest information
const updateTable = (dayday, num, icon, minT, maxT, n) => {

    document.getElementById(`day${n+1}`).textContent = dayday
    document.getElementById(`date${n+1}`).textContent = num
    document.getElementById(`day${n+1}Icon`).src = icon
    document.getElementById(`day${n+1}minT`).textContent = minT
    document.getElementById(`day${n+1}maxT`).textContent = maxT
}

//let search also with 'Enter' key
const searchInput = document.getElementById('location')
searchInput.addEventListener('keypress', (event)=>{
    if (event.key === 'Enter'){  
        event.preventDefault();
        document.getElementById("search").click()
    }
})