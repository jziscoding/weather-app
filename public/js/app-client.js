console.log('Client JS')

const url = 'http://jznode1.fyre.ibm.com/weather?address='

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = search.value
    
    message1.textContent = 'Loading ...'
    message2.textContent = ''
    
    fetch(url + location).then(res => {
        res.json().then(data => {
            if (data.error) {
                return message1.textContent = data.error
            }
            message1.textContent = data.location.name
            message2.textContent = data.current.weather_descriptions[0] 
                    + ', ' + data.current.temperature
        })
    })
})