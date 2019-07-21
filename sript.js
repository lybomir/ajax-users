const API = 'https://test-users-api.herokuapp.com/';

const getUsers = () => {
    return fetch(API + 'users',{method:'GET'}).then((res) => {
        return res.json();
    }).catch((error) => {
        console.log(error);
        return [];
    })
};

const deleteUsers = async(userId, userElement) => {
    try{
        const res = await fetch(API +'/'+ userId,{method:'DELETE'});
        userElement.remove(); 
    } catch(err) {
        console.log(err);
    }
}

const renderUsers = (users) => {
   debugger;
    users.data.forEach(item => {
        const container = document.querySelector('.users');
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
        <h4>Name:${item.name}</h4>
         <h3>Age:${item.age}</h3>
         `;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';
        removeBtn.addEventListener('click',() =>{
            deleteUsers(item.id, userElement);
        });
        removeBtn.classList.add('.user-button');

        userElement.append(removeBtn);
        container.append(userElement);
    });
}

const loadUser = async () => {
    const users = await getUsers();

    renderUsers(users);

    // console.log('users', users);
}

const createUser = ()=> {
    const name = document.querySelector('.name').value;
    const age = document.querySelector('.age').value;

     fetch(API,{ 
        method: 'POST',
        body: JSON.stringify({name: name, age: age})
    }).then((res) => {
        return res.json();
    }).then(()=>{
        // const user = {
        //     name,
        //     age
        // };
        renderUsers({data:[{name: name, age: age}]});
        // renderUsers([user]);
        // console.log(user);
    })
    .catch((error) => {
        console.log(error);
        return [];
    })
}



const buttonLoad = document.querySelector('.load');
buttonLoad.addEventListener('click', loadUser);

const createBt = document.querySelector('.create');
createBt.addEventListener('click',createUser);


