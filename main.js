let usersList = [];

let updateFlag = false;
let updateIndex = null;

let userListUI = document.getElementById("userList");

const userForm = document.getElementById("addUser");
const localuserslist = JSON.parse(localStorage.getItem("userStorage"))
const userStorage =()=>{
    if (typeof Storage !== "undefined"){
        localStorage.setItem("userStorage", JSON.stringify(usersList));
    }

    else{

        alert("tu navegador no posee almacenamiento");
    }
}
const renderList = () => {
    userListUI.innerHTML = "";
    // userListArray = usersList;
    userListArray = JSON.parse(localStorage.getItem("userStorage"))
    if(userListArray === null){
        userListArray =[]
    }else{
        userListArray.forEach((user, index) => {

            const userItemDiv = document.createElement("div");
            userItemDiv.setAttribute("class", "userItem");
            userListUI.appendChild(userItemDiv);


            const userInfoDiv = document.createElement("div");
            userInfoDiv.setAttribute("class", "userInfo");
            userItemDiv.appendChild(userInfoDiv);


            const marcaUserDiv = document.createElement("h4");
            const colUserDiv = document.createElement("h4");
            const añoUserDiv = document.createElement("h4");
            marcaUserDiv.innerText = `${user.marca} ${user.modelo}`;
            colUserDiv.innerText = `${user.col} `;
            añoUserDiv.innerText = `${user.año} `;

            userInfoDiv.appendChild(marcaUserDiv);
            userInfoDiv.appendChild(colUserDiv);
            userInfoDiv.appendChild(añoUserDiv);

            const actionButtons = document.createElement("div");
            actionButtons.setAttribute("class", "actions");
            userItemDiv.appendChild(actionButtons);

            const updateBtn = document.createElement("button");

            updateBtn.setAttribute("class", "update");
            updateBtn.addEventListener("click", () => updateUser(index, user));
            updateBtn.setAttribute("id", "update");
            updateBtn.innerText = "Editar";

            const deleteBtn = document.createElement("button");

            deleteBtn.setAttribute("class", "delete");
            deleteBtn.addEventListener("click", () => deleteUser(index));
            deleteBtn.innerHTML = "Eliminar";
            deleteBtn.setAttribute("id", "delete");

            actionButtons.appendChild(updateBtn);
            actionButtons.appendChild(deleteBtn);
        });
    }};

const createUpdateUser = event => {
    event.preventDefault();
    if (updateFlag) {
        let updatedUser = {
            marca: document.getElementById("marca").value,
            modelo: document.getElementById("modelo").value,
            col: document.getElementById("col").value,
            año: document.getElementById("año").value
        };
        userslist=JSON.parse(localStorage.getItem("userStorage"));
        if (userslist === null){
            userslist = [];
        }
        usersList[updateIndex] = updatedUser;

        updateFlag = false;
        updateIndex = null;
        userStorage();
        renderList();
    } else {
        let user = {
            marca: document.getElementById("marca").value,
            modelo: document.getElementById("modelo").value,
            col: document.getElementById("col").value,
            año: document.getElementById("año").value
        };
        userslist =JSON.parse(localStorage.getItem("userStorage"));
        usersList.push(user);
        userStorage();
        renderList();
    }
    userForm.reset();
};

const updateUser= (index, user) => {
    console.log(index);
    console.log(user);
    document.getElementById("marca").value = user.marca;
    document.getElementById("modelo").value = user.modelo;
    document.getElementById("col").value = user.col;
    document.getElementById("año").value = user.año;
    userStorage();
    renderList();
    updateFlag = true;
    updateIndex = index;

};

const deleteUser = index => {
    usersList.splice(index, 1);
    let deleteuserstorage = JSON.parse(localStorage.getItem("userStorage"));
    usersList = deleteuserstorage;
    usersList.splice(index, 1);
    userStorage();
    renderList();
};
userForm.addEventListener("submit", createUpdateUser);
document.addEventListener("DOMContentLoaded", renderList);
