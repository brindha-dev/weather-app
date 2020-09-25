var formElem = document.querySelector('form')
var inputElem = document.querySelector('input')

var msg1 = document.querySelector('#messageOne')
var msg2 = document.querySelector('#messageTwo')

formElem.addEventListener('submit', (event) => {
    event.preventDefault();

    msg1.textContent = "Searching...."
    msg2.textContent = ""

    var url = '/weather?address=' + inputElem.value;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            }
            else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})