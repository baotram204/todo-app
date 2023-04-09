

let currSelect=0
let idInitial = 0
let data = []

const filter = document.querySelectorAll('.filter ul li')
const listFilter = Array.from(filter)    

function handleEvent() {
    listFilter.map((filter, index) => {
        filter.onclick = () =>{
            document.querySelector('.active').classList.remove('active')
            listFilter[index].classList.add('active')
            if (currSelect !== index) {
                currSelect = index
                switch (currSelect) {
                    case 0 : 
                        document.querySelector('.list ul').innerHTML = ''
                        handleRender(data)
                        break
                    case 1 : 
                        let data1 = data.filter((element) =>{
                            return element.status === 'processing'
                        })
                        document.querySelector('.list ul').innerHTML = ''
                        handleRender(data1)
                        break
                    case 2 : 
                        let data2 = data.filter((element) =>{
                            return element.status === 'completed'
                        })
                        document.querySelector('.list ul').innerHTML = ''
                        handleRender(data2)
                        break
                }
            }
            
        }
    })

}



function checkboxSelect(event, id) {
    
    const label = event.target.closest('label');
    const conten = label.querySelector('p');
    

    if (event.target.checked) {
        conten.style.textDecoration = 'line-through';
        data[id] = {
            id : id,
            content : conten.innerText,
            status : 'completed',
        }
    } else {
        conten.style.textDecoration = 'none';
        data[id] = {
            id : id,
            content : conten.innerText,
            status : 'processing',
        }
    }  
            
    
}



function deleteTodo () {
    const deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach((btn) =>{
        btn.onclick = () =>{
            let liCurr = btn.parentElement;
            if(liCurr) {
                let id = liCurr.querySelector('label').htmlFor
                data.splice(id, 1);
                liCurr.remove()
            }
        }
    })
}


function handleAdd() {
    const btnSubmit = document.querySelector('.submit')
    btnSubmit.onclick = () => {
        switch(currSelect) {
            case 0:
                add()
                handleRender(data)
                break
            case 1:
                document.querySelector('.active').classList.remove('active')
                listFilter[0].classList.add('active')
                currSelect = 0
                add()
                handleRender(data)
                break
            case 2:
                document.querySelector('.active').classList.remove('active')
                listFilter[0].classList.add('active')
                currSelect = 0
                add()
                handleRender(data)
                break
        }
        

    }
}

function add() {
    const input = document.querySelector('.input-sub')
        
        let task = {
            id : idInitial++,
            content : input.value,
            status : 'processing'
        }

        // data toàn dữ liệu 
        data.push(task)

        console.log(data)
        input.value = ''  

}


// phần render

function handleRender(data) {
    const todoList = document.querySelector('.list ul')
    let html = ''
    data.forEach((element) => {
        html += `
        <li>
            <label for="${element.id}">
                <input type="checkbox" id="${element.id}" value="" onchange="checkboxSelect(event,${element.id} )">
                <p class="de-${element.id}">${element.content}</p>
            </label>
            <div class="delete " onclick="deleteTodo()" >×</div>
        </li>
    `
    })
    todoList.innerHTML = html
    data.forEach((element) =>{
        if (element.status === 'completed') {
            let cur = document.querySelector(`.de-${element.id}`)
            cur.style.textDecoration = 'line-through'
            let cur2 = document.getElementById(`${element.id}`)
            cur2.checked = true

        }
    })
}


function start() {
    handleEvent()
    handleAdd()
}

start()