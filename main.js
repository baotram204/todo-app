

let currSelect=0
let idInitial = 0
let processing = []
let complete = []

function handleEvent() {
    const filter = document.querySelectorAll('.filter ul li')
    const listFilter = Array.from(filter)
    // console.log(listFilter)
    
    listFilter.map((filter, index) => {
        filter.onclick = () =>{
            document.querySelector('.active').classList.remove('active')
            listFilter[index].classList.add('active')
            currSelect = index
        }
    })

}

function checkboxSelect() {
    const labels = document.querySelectorAll('.list label')
    labels.forEach((label) => {
        label.onclick = () => {
            const conten = label.querySelector('p')
            const input = label.querySelector('input')

            console.log(conten.conten)
            if (input.checked === true) {
                conten.style.textDecoration = "line-through"
            } else {
                conten.style.textDecoration = "none" 
            }
        }
    })
}

function deleteTodo () {
    const deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach((btn) =>{
        btn.onclick = () =>{
            let liCurr = btn.parentElement;
            if(liCurr) {
                liCurr.remove()
            }
        }
    })
}


function handleAdd() {
    const btnSubmit = document.querySelector('.submit')
    btnSubmit.onclick = () => {
        const input = document.querySelector('.input-sub')
        let data = input.value
        render(data)
        input.value = ''  
        deleteTodo()  
        checkboxSelect()
    }
}


function render(data) {
    const todoList = document.querySelector('.list ul')
    var id = idInitial++

    let li = document.createElement('li')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let p = document.createElement('p')
    let deleteBtn = document.createElement('div')

    label.htmlFor = id
    input.type = 'checkbox'
    input.id = id
    p.textContent = data
    deleteBtn.textContent = '×'
    deleteBtn.classList.add('delete')

    label.appendChild(input)
    label.appendChild(p)
    li.appendChild(label)
    li.appendChild(deleteBtn)
    todoList.appendChild(li)

    input.value = ''
}

function start() {
    handleEvent()
    handleAdd()
}

start()