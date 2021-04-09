//console.log('Client side java script is loaded !!')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageone.textContent = ''
messageTwo.textContent = ''

weatherform.addEventListener('submit',(e) =>{

    e.preventDefault()


    const location = search.value
    messageone.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response)=> {
    response.json().then((data) => {
        if(data.error){
            messageone.textContent = data.error
            //console.log(data.error)
        }
        else{
            //console.log(data.location,data.forcast)
            messageone.textContent = data.location
            messageTwo.textContent = data.forcast
        }

    })
})

    // console.log(location)
})




//---------------- revison------------------

// fetch('http://localhost:3000/weather?address=noida').then((response)=> {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location,data.forcast)
//         }

//     })
// })