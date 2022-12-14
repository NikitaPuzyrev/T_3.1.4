$(async function () {
    await getTableWithUsers();
    await getDefaultModal();

})


const userFetchService = {
    head: {
        'Accept': 'application/json', 'Content-Type': 'application/json', 'Referer': null
    }, // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
    findAllUsers: async () => await fetch('api/users'),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    addNewUser: async (user) => await fetch('api/users', {
        method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {
        method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

async function getTableWithUsers() {
    let table = $('#mainTableWithUsers tbody');
    table.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let userRole = ' '
                user.roles.forEach(role => {
                    userRole = userRole + "  " + role.name
                })
                let tableFilling = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.active}</td>  
                             <td>${userRole}</td> 
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-primary" 
                                data-toggle="modal" data-target="#someDefaultModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger" 
                                data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                            </td>
                        </tr>
                )`;
                table.append(tableFilling);
            })

        })

    // ???????????????????????? ?????????????? ???? ?????????? ???? ???????????? edit ?????? delete
    // ?????????????? ???? ?????? ???????????? ?? ???????????? ??????????????, ?????????????? ?? ???????? ???? ??????????????????
    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

// ?????? ???? ???????????? ?????? ???????????????? ?????????????? ?? ?????? ????????????????
// ?????????????????????? ???? ???? ???????? ??????????????????
async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true, backdrop: "static", show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}


// ?????????????????????? ?????????? ???? ?????????????? ????????????????????????????, ???????????????? ????????????, ????????????????????
async function editUser(modal, id) {
    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-primary" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`

    modal.find('.modal-footer').append(closeButton);
    modal.find('.modal-footer').append(editButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="editUser">
            <label for="IdEdit" class="col-form-label"><strong>Id</strong></label>
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <label for="UsernameEdit" class="col-form-label"><strong>Username</strong></label>
                <input class="form-control" type="text" id="username" value="${user.username}"><br>
                 <label for="PasswordEdit" class="col-form-label"><strong>Password</strong></label>
                <input class="form-control" type="password" id="password"><br>
                <label for="ActiveEdit" class="col-form-label"><strong>Active</strong></label>
                <input class="form-control" id="active" type="text" value="${user.active}">
                <label for="RoleEdit"  class="form-select"><strong>Role</strong></label><br>
                <select multiple class="form-select" size="2" id="roles"   type="text">
                    <option value= '{"id": 1, "name": "ROLE_USER","authority": "ROLE_USER"}'  >USER</option>
                    <option value='{"id": 2, "name": "ROLE_ADMIN", "authority": "ROLE_ADMIN"}' >ADMIN</option>
                </select> 
            </form>
           `;
        modal.find('.modal-body').append(bodyForm);

    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let username = modal.find("#username").val().trim();
        let password = modal.find("#password").val().trim();
        let active = modal.find("#active").val().trim();
        let roles = modal.find("#roles").val();
        roles = JSON.parse(`[${roles}]`)
        let data = {
            id: id, username: username, password: password, active: active, roles: roles
        }

        const response = await userFetchService.updateUser(data, id);
        if (response.ok) {
            await getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}


// ?????????????? ?????????? ???? ?????????????? ????????????????
async function deleteUser(modal, id) {

    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();

    modal.find('.modal-title').html('Delete user');
    let deleteButton = `<button  class="btn btn-danger" id="deleteButton">Delete</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(closeButton);
    modal.find('.modal-footer').append(deleteButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="delUser">
            <label  class="col-form-label"><strong>Id</strong></label>
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <label class="col-form-label"><strong>Username</strong></label>
                <input class="form-control" type="text" id="username" value="${user.username}"><br>
                 <label  class="col-form-label"><strong>Password</strong></label>
                <input class="form-control" type="password" id="password"><br>
                <label class="col-form-label"><strong>Active</strong></label>
                <input class="form-control" id="active" type="text" value="${user.active}">
                
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })


    $("#deleteButton").click(async () => {
        const response = await userFetchService.deleteUser(id)
        if (response.ok) {
            await getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}

//???????????????????? ???????????? ??????????
const addUser = document.getElementById("addUser");
addUser.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addUser);
    const user = {
        roles: []
    };
    formData.forEach((value, key) => {
        if (key === "rolesId") {

            const roleId = value.split(" ")[0];
            const roleName = value.split(" ")[1];
            const role = {
                id: roleId,
                name: roleName
            };
            user.roles.push(role);
        } else {
            user[key] = value;
        }
    });
    userFetchService.addNewUser(user)

        .then(() => getTableWithUsers())
        .then(() => addUser.reset());
    return show('tableUsers', 'newUser')
})

function show(shown, hidden) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    return false;
}
