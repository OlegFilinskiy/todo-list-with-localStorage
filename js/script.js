window.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form')
    const ul = document.querySelector('ul')
    const clearButton = document.querySelector('button')
    const input = document.getElementById('item')

    let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

    localStorage.setItem('items', JSON.stringify(itemsArray))
    const data = JSON.parse(localStorage.getItem('items'))

    const liMaker = text => {
        const li = document.createElement('li')
        li.textContent = text
        ul.appendChild(li)
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        itemsArray.push(input.value)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        liMaker(input.value)
        input.value = ''
    })

    data.forEach(item => {
        liMaker(item)
    })

    clearButton.addEventListener('click', function() {
        localStorage.clear()
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild)
        }
    })

    ul.addEventListener('dblclick', function(event) {
        const curentLi = event.target.textContent
        const currentIndex = itemsArray.indexOf(curentLi)

        itemsArray.splice(currentIndex, 1)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild)
        }
        itemsArray.forEach(item => {
            liMaker(item)
        })
    })
})