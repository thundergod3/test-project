let data = JSON.parse(localStorage.getItem('listTODO')) || [];
const genTimeStamp = () => {
   return new Date().getTime()
}

const saveToLocalStorage = (data) => {
    if (data) {
        localStorage.setItem('listTODO', JSON.stringify(data));
    }
}

const addNewItem = () => {
    const valueInput = document.getElementById('input-text').value;
    
    const dataToSave = {
        id: genTimeStamp(),
        name: valueInput,
        status: false,
    }
    data = [...data, dataToSave];
    saveToLocalStorage(data);
    clearInput();
    updateView();
}

const deleteItem = (id) => {
    data = data.filter(el => el.id !== id);
    saveToLocalStorage(data);
    updateView();
}

const toggleCheckState = (id) => {
    let index = data.findIndex(el => el.id === id);
    data[index].status = !data[index].status;
    saveToLocalStorage(data);
    updateView();
}

const updateView = () => {
    const list = document.getElementById('list');
    list.innerHTML = '';
    const template = (id, name, status) => {
        return `
        <div idTODO="${id}" class="item ${status ? 'is-checked' : 'non-checked'}">
           <div style="display: flex">
               <div class="toggle-check" onclick="toggleCheckState(${id})">
                  <i class="fa fa-check" style="color:seagreen"></i>
               </div>
               <div class="name">${name}</div>
            </div>
            <div class="action" onclick="deleteItem(${id})">
               <i class="fa fa-close" style="color:red"></i>
            </div>
        </div>`
    }
    data.map(el => {
        list.insertAdjacentHTML('beforeend', template(el.id, el.name, el.status));
    });
}

const clearInput = () => {
    document.getElementById('input-text').value = '';
    console.log('clear')
}


// When page load
updateView();
window.addEventListener('keypress', (e) => {
    // Press enter button on keyboard
   if (e.keyCode === 13) {
        addNewItem();
   }
})
