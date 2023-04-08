

let currSelect=0
let idInitial = 0
let processing = []
let complete = []
let data = []

function handleEvent() {
    const filter = document.querySelectorAll('.filter ul li')
    const listFilter = Array.from(filter)    
    listFilter.map((filter, index) => {
        filter.onclick = () =>{
            document.querySelector('.active').classList.remove('active')
            listFilter[index].classList.add('active')
            if (currSelect !== index) {
                currSelect = index
                handleRender(data)
            }
            
        }
    })

}

function checkboxSelect() {
    const inputs = document.querySelectorAll('.list input[type="checkbox"]');

    inputs.forEach((input) => {
        input.addEventListener('change', (event) => {
            const label = event.target.closest('label');
            const conten = label.querySelector('p');
            

            if (event.target.checked) {
                conten.style.textDecoration = 'line-through';
                data[input.id] = {
                    id : input.id,
                    content : conten.innerText,
                    status : 'completed',
                }
            } else {
                conten.style.textDecoration = 'none';
                data[input.id] = {
                    id : input.id,
                    content : conten.innerText,
                    status : 'processed',
                }
            }  
            
            
        });
    });
}



function deleteTodo () {
    const deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach((btn) =>{
        btn.onclick = () =>{
            let liCurr = btn.parentElement;
            let id = liCurr.querySelector('label').htmlFor
            data.splice(id, 1);
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
        
        // nhập vào một biến để render ra 1 task vừa nhập
        let task = {
            id : idInitial++,
            content : input.value,
            status : 'processed'
        }
        render(task)

        // data toàn dữ liệu 
        data.push(task)

        console.log(data)
        input.value = ''  
        deleteTodo()  
        checkboxSelect()
        handleRender(data)

    }
}


// phần render

function handleRender(data) {
    
    if ( currSelect === 1) {
        data.forEach((data) => {
            if (data.status === 'processed') render(data)
        })
            
    }
    if ( currSelect === 2) {
        data.forEach((data) => {
            if (data.status === 'completed') render(data)
        })
    }
}

function render(data) {
    const todoList = document.querySelector('.list ul')

    let li = document.createElement('li')
    let label = document.createElement('label')
    let input = document.createElement('input')
    let p = document.createElement('p')
    let deleteBtn = document.createElement('div')

    label.htmlFor = data.id
    input.type = 'checkbox'
    input.id = data.id
    p.textContent = data.content
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