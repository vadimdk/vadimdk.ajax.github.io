const herokuapp = axios.create({
    baseURL: "https://test-users-api.herokuapp.com/",
    headers: {
        'Content-Type': "application/json"
    }
});

const getUsers = async () => {
    const users = await herokuapp.get("/users");
    console.log(users.data);
    return users.data;


}


const renderUsers = () => {
    const container = document.querySelector('.users');

    container.innerHTML = '';

    users.data.forEach(item => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
        <h4>${item.name}</h4>
        <h5>${item.age}</h5>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('user_remove');
        removeBtn.textContent = 'x';
        removeBtn.addEventListener('click', () => {
            deleteUser(item.id, userElement)
        });

        userElement.append(removeBtn);
        container.append(userElement);
    });
}

const loadUsers = async () => {
    users = await getUsers();


    renderUsers();
}


const deleteUser = async (userId, userElement) => {
    try {
        await herokuapp.delete('users/' + userId);

        users = users.data.filter((item) => item.id !== userId);
        userElement.remove();
    } catch (err) {
        console.log('coudnt delete users', err);
    }
}




const createUser = () => {
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    console.log('name: ', name);
    console.log('age: ', age);

    herokuapp.post('/users', {

            body: JSON.stringify({
                name: name,
                age: age
            })
        }).then(res => {
            
            return res.data;

        }).then(({
            id
        }) => {
            const user = {
                name,
                age,
                id
            };

            users.data.unshift(user)

            renderUsers();

        })
        .catch(err => {
            console.log('coudnt create a user', err);

        })
}






document.addEventListener('DOMContentLoaded', () => {
    const loadBtn = document.querySelector('.load-users')
    loadBtn.addEventListener('click', loadUsers);

    const createUserBtn = document.querySelector('#create-user-btn')
    createUserBtn.addEventListener('click', createUser);

});
