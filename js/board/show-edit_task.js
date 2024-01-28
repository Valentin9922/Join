
/*-------------------------------Show Task Form öffnen bzw. anzeigen lassen-------------------------------*/

function openTaskInWindow(task) {
    currentDisplayedTask = task;
    document.getElementById('showTaskBackground').style = "";
    document.getElementById('openedTask').classList.add('show_form2');
    document.getElementById('category2').innerHTML = `${tasks[currentDisplayedTask]['category']}`;
    document.getElementById('category2').className = `${tasks[currentDisplayedTask]['category']}`;
    document.getElementById('title2').innerHTML = `${tasks[currentDisplayedTask]['title']}`;
    document.getElementById('description2').innerHTML = `${tasks[currentDisplayedTask]['description']}`;
    document.getElementById('date2').innerHTML = `${tasks[currentDisplayedTask]['date']}`;
    document.getElementById('priority2').innerHTML = `${tasks[currentDisplayedTask]['priority']}`;
    displayContacts();
    displaySubtasksWithCheckbox(tasks[currentDisplayedTask]['subtasks']);
    document.getElementById('Edit-Save').innerHTML = `<string onclick="editTask()">Edit</string>`;
}

function displayContacts() {
    document.getElementById('contacts2').innerHTML = '';
    for (c = 0; c < tasks[currentDisplayedTask]['contacts'].length; c++) {
        let assignedContact = tasks[currentDisplayedTask]['contacts'][c];  
        document.getElementById('contacts2').innerHTML += `
        <div class="show-task-contacts-section">
        <div class="show-task-icon-section" style="background-color:${assignedContact['color']};">
           ${assignedContact['first-name'].charAt(0).toUpperCase()} ${assignedContact['last-name'].charAt(0).toUpperCase()} </div>
        <div>${assignedContact['first-name']} ${assignedContact['last-name']}</div> 
        </div>`;
    }
}

function displaySubtasksWithCheckbox(subtasksArray) {
    document.getElementById('container3').innerHTML = '';
    for (p = 0; p < subtasksArray.length; p++) {
        document.getElementById('container3').innerHTML += `
        <div>
            <input type="checkbox" id="check${p}" onclick="checkbox(${p})" style="width: 13px;"> <string>- ${tasks[currentDisplayedTask]['subtasks'][p]}</string>
        </div>`;
    }
    for (q = 0; q < tasks[currentDisplayedTask]['subtasks-checkbox'].length; q++) {
        if (tasks[currentDisplayedTask]['subtasks-checkbox'][q] == true) {
            document.getElementById(`check${q}`).checked = true;
        }
    }
}

function checkbox(indexOfCheckbox) {
    let id = indexOfCheckbox;
    let checkbox = document.getElementById(`check${indexOfCheckbox}`);
    if (checkbox.checked == false) {
        tasks[currentDisplayedTask]['subtasks-checkbox'][id] = false;
    }
    if (checkbox.checked == true) {
        tasks[currentDisplayedTask]['subtasks-checkbox'][id] = true;
    }
}

function editTask() {
    document.getElementById('delete').classList.remove('display-none');
    document.getElementById('title2').innerHTML = `<div class="space">
    <string class="elementStyling">Title</string>
    <input class="edit-task-title-input" id="titleEdited" value="${tasks[currentDisplayedTask]['title']}"></div>`;
    document.getElementById('description2').innerHTML = `<div class="space">
    <string class="elementStyling">Description</string>
    <input class="edit-task-description-area" id="descriptionEdited" value="${tasks[currentDisplayedTask]['description']}">></div>`;
    document.getElementById('date2').innerHTML = `<input id="dateEdited" type="date" value="${tasks[currentDisplayedTask]['date']}">`;
    document.getElementById('priority2').innerHTML = `
    <button class="edit-task-priority-btn urgent" onclick="urgent()">Urgent</button>
    <button class="edit-task-priority-btn medium" onclick="medium()">Medium</button>
    <button class="edit-task-priority-btn low" onclick="low()">Low</button>`;
    editContacts();
    editSubtasks002();
    displaySubtasks('2');
    document.getElementById('Edit-Save').innerHTML = `<string onclick="saveTask()">Save</string>`;
}

function editSubtasks002() {
    document.getElementById('container3').innerHTML = '';
    document.getElementById('container3').innerHTML = `
    <input class="edit-task-new-subtask" id="inputNewSubtask2" oninput="enableInputButtons('2')">
    <div class="hidden-buttons" id="hiddenButtons2" style="display:none;">
        <string class="hidden-button-submit" onclick="submitSubtask('2')">&#10003</string>
        <string class="hidden-button-clean" onclick="cleanInputField('2')">&#x1F5D1</string>
    </div>
    <div id="displaySubtasks2">
    </div>`;
}

function editContacts() {
    document.getElementById('contacts2').innerHTML = `
        <div>
        <select class="edit-task-select-contact" id="contactsToAdd" onchange="addContact(this.value)">
            <option value="">Select Contact</option>
        </select>
        <div id="currentContacts"></div>
        </div>`;

    displayContactsinSHOWTASK();
    createMenuOfSelectableContacts();
    displaySelectableContactsInMenu();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displayContactsinSHOWTASK() {
    for (e = 0; e < tasks[currentDisplayedTask]['contacts'].length; e++) {
        let currentContact = tasks[currentDisplayedTask]['contacts'][e];
        document.getElementById('currentContacts').innerHTML += `
        <div class="edit-task-contact-section">
        <div class="show-task-icon-section" style="background-color: ${currentContact['color']};">
        ${currentContact['first-name'].charAt(0).toUpperCase()} ${currentContact['last-name'].charAt(0).toUpperCase()}
            </div>
        <div> ${currentContact['first-name']} ${currentContact['last-name']}
        <button class="edit-task-delete-contact-btn" onclick="deleteSelectedContact(${[e]})">Entfernen</button></div></div>`;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////*css*/`
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////    


function createMenuOfSelectableContacts() {
    contactsNew = [];
    for (r = 0; r < contacts.length; r++) {
        let singleContact = contacts[r];
        contactsNew.push(singleContact);
        for (e = 0; e < tasks[currentDisplayedTask]['contacts'].length; e++) {
            let currentContact = tasks[currentDisplayedTask]['contacts'][e];
            if (singleContact['first-name'] == currentContact['first-name']) {
                let equalContact = contactsNew.indexOf(singleContact);
                contactsNew.splice(equalContact, 1)
            }
        }
    }
}

function displaySelectableContactsInMenu() {
    for (t = 0; t < contactsNew.length; t++) {
        let selectableContact = contactsNew[t];
        document.getElementById('contactsToAdd').innerHTML += `
        <option value="${t}">${selectableContact['first-name']} ${selectableContact['last-name']}</option>`;
    }
}
function addContact(newContact) {
    if (tasks[currentDisplayedTask]['contacts'].length >= 3) { alert('Keine Kontaktauswahl mehr möglich!') }
    else {
        tasks[currentDisplayedTask]['contacts'].push(contactsNew[newContact]);
    }
    editContacts();
}

function deleteSelectedContact(indexOfContact) {
    contactsNew.push(tasks[currentDisplayedTask]['contacts'][indexOfContact]);
    tasks[currentDisplayedTask]['contacts'].splice(indexOfContact, 1);
    editContacts();
}

function saveTask() {
    let editedTitle = document.getElementById('titleEdited').value;
    let editedDescription = document.getElementById('descriptionEdited').value;
    let editedDate = document.getElementById('dateEdited').value;

    tasks[currentDisplayedTask]['title'] = editedTitle;
    tasks[currentDisplayedTask]['description'] = editedDescription;
    tasks[currentDisplayedTask]['date'] = editedDate;
    tasks[currentDisplayedTask]['priority'] = priorityStatus || tasks[currentDisplayedTask]['priority'];
    openTaskInWindow(currentDisplayedTask);
    cleanBoard();
    loadBoard();
    setItem();
}

function closeShowTask() {
    document.getElementById('contacts2').innerHTML = '';
    document.getElementById('showTaskBackground').style = "display: none;";
    document.getElementById('openedTask').classList.remove('show_form2');
    cleanBoard();
    loadBoard();
    if(document.getElementById('board').classList == 'display-none') {
        searchTask();
    }
    setItem();
}

function deleteTask() {
    tasks.splice(currentDisplayedTask, 1);
    declareIDs();
    closeShowTask();
    setItem();
}