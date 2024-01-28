/*-----------------------------------------------Task suchen------------------------------------------------*/

function searchTask() {
    let searchField = document.getElementById('searchInput').value;

    if (searchField == '') {
    } else {
        document.getElementById('searchResults').innerHTML = '';
        for (let s = 0; s < tasks.length; s++) {
            let task = tasks[s];
            if (task['title'].includes(searchField)) {
                document.getElementById('board').classList.add('display-none');
                document.getElementById('boardResponsive').style = "display: none;";
                document.getElementById('searchResults').innerHTML += showSearchedTask(task);
                document.getElementById('searchPicture').classList.add('display-none');
                document.getElementById('resetPicture').classList.remove('display-none');
                loadSubtasksProgressbarSEARCHEDTASK(task);
                showAmountOfFinishedSubtasksSEARCHEDTASK(task);
                displayContactIconsSEARCHEDTASK(task);
                displayPriorityImgSEARCHEDTASK(task);
            }
        }
    }
}

function showSearchedTask(eachTask) {
    return `
        <div onclick="openTaskInWindow(${eachTask['id']})" class="taskBox" style="margin-left: 5px; margin-right: 5px;">
            <h1 class="${eachTask['category']}" id="taskCategory">${eachTask['category']}</h1>
            <string class="taskTitle">${eachTask['title']}</string>
            <string class="taskDescription">${eachTask['description']}</string>
            <div id="taskSubtasks">
                <div class="taskSubtasksProgressbar">
                    <div id="subtasksProgressbarSEARCHED${eachTask['id']}" style="width: 0%;"></div>
                </div>
                <string id="numberOfSubtasksSEARCHED${eachTask['id']}" class="taskNumberOfSubtasks"></string>
            </div>
            <div class="taskEnd">
                <div id="taskContactsIconsSEARCHED${eachTask['id']}"></div>
                <img src id="taskPriorityIMGSEARCHED${eachTask['id']}">
            </div>
        </div>`;
}

function resetSearchedTask() {
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('board').classList.remove('display-none');
    document.getElementById('boardResponsive').style = "";
    cleanBoard();
    loadBoard();
    document.getElementById('searchPicture').classList.remove('display-none');
    document.getElementById('resetPicture').classList.add('display-none');
    document.getElementById('searchInput').value = '';
}

/*------------------------------------Board laden bzw. anzeigen lassen-------------------------------------*/

function loadBoard() {
    let toDo = document.getElementById('TODO');
    let inProgress = document.getElementById('INPROGRESS');
    let awaitFeedback = document.getElementById('AWAITFEEDBACK');
    let done = document.getElementById('DONE');

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (task['progress'].includes('TODO')) {
            toDo.innerHTML += displayTask(task);
            document.getElementById('TODOresponsive').innerHTML += displayTaskResponsive(task);
        }
        if (task['progress'].includes('INPROGRESS')) {
            inProgress.innerHTML += displayTask(task);
            document.getElementById('INPROGRESSresponsive').innerHTML += displayTaskResponsive(task);
        }
        if (task['progress'].includes('AWAITFEEDBACK')) {
            awaitFeedback.innerHTML += displayTask(task);
            document.getElementById('AWAITFEEDBACKresponsive').innerHTML += displayTaskResponsive(task);
        }
        if (task['progress'].includes('DONE')) {
            done.innerHTML += displayTask(task);
            document.getElementById('DONEresponsive').innerHTML += displayTaskResponsive(task);
        }

        loadSubtasksProgressbar(task);
        showAmountOfFinishedSubtasks(task);
        displayContactIcons(task);
        displayPriorityImg(task);
    }
}

function displayTask(eachTask) {
    return `
    <div draggable="true" ondragstart="startDragging(${eachTask['id']})" onclick="openTaskInWindow(${eachTask['id']})" class="taskCSS">
        <div class="taskBox">
            <h1 class="${eachTask['category']}" id="taskCategory">${eachTask['category']}</h1>
            <string class="taskTitle">${eachTask['title']}</string>
            <string class="taskDescription">${eachTask['description']}</string>
            <div id="taskSubtasks">
                <div class="taskSubtasksProgressbar">
                    <div id="subtasksProgressbar${eachTask['id']}" style="width: 0%;"></div>
                </div>
                <string id="numberOfSubtasks${eachTask['id']}" class="taskNumberOfSubtasks"></string>
            </div>
            <div class="taskEnd">
            <div id="taskContactsIcons${eachTask['id']}"></div>
                <img src id="taskPriorityIMG${eachTask['id']}">
            </div>
        </div>
    </div>`;
}

function displayTaskResponsive(eachTask) {
    return `
    <div draggable="true" ondragstart="startDragging(${eachTask['id']})" onclick="openTaskInWindow(${eachTask['id']})" class="taskCSS">
        <div class="taskBox">
            <h1 class="${eachTask['category']}" id="taskCategory">${eachTask['category']}</h1>
            <string class="taskTitle">${eachTask['title']}</string>
            <string class="taskDescription">${eachTask['description']}</string>
            <div id="taskSubtasks">
                <div class="taskSubtasksProgressbar">
                    <div id="subtasksProgressbarResponsive${eachTask['id']}" style="width: 0%;"></div>
                </div>
                <string id="numberOfSubtasksResponsive${eachTask['id']}" class="taskNumberOfSubtasks"></string>
            </div>
            <div class="taskEnd">
            <div id="taskContactsIconsResponsive${eachTask['id']}"></div>
                <img src id="taskPriorityIMGresponsive${eachTask['id']}">
            </div>
        </div>
    </div>`;
}

/*--------------------------Tasks Draggen und Droppen--------------------------*/

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    cleanBoard();
    loadBoard();
    setItem();
}

/*----------------------Subtasks Länge & Bilder anzeigen----------------------*/

function loadSubtasksProgressbar(eachTask) {
    let subtasksProgressbar = document.getElementById(`subtasksProgressbar${eachTask['id']}`);
    let subtasksProgressbarResponsive = document.getElementById(`subtasksProgressbarResponsive${eachTask['id']}`);
    eachTask['subtasks-true'] = [];
    for (t = 0; t < eachTask['subtasks-checkbox'].length; t++) {
        let checkIsTrue = eachTask['subtasks-checkbox'][t];
        if (checkIsTrue == true) {
            eachTask['subtasks-true'].push('->');
        }
        if (eachTask['subtasks-true'].length == 1) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 50%; height: 60%;";
            subtasksProgressbarResponsive.style = "background-color: #4589FF; border-radius: 5px; width: 50%; height: 60%;";
        }
        if (eachTask['subtasks-true'].length == 2) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 100%; height: 60%;";
            subtasksProgressbarResponsive.style = "background-color: #4589FF; border-radius: 5px; width: 100%; height: 60%;";
        }
    }
}

function showAmountOfFinishedSubtasks(eachTask) {
    let numberOfSubtasks = document.getElementById(`numberOfSubtasks${eachTask['id']}`);
    let numberOfSubtasksResponsive = document.getElementById(`numberOfSubtasksResponsive${eachTask['id']}`);
    if (eachTask['subtasks'][1]) {
        numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
        numberOfSubtasksResponsive.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
    } else {
        if (eachTask['subtasks'][0]) {
            numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
            numberOfSubtasksResponsive.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
        }
    }

}

function displayContactIcons(eachTask) {
    let contactIconsField = document.getElementById(`taskContactsIcons${eachTask['id']}`);
    let contactIconsFieldResponsive = document.getElementById(`taskContactsIconsResponsive${eachTask['id']}`);
    for (y = 0; y < eachTask['contacts'].length; y++) {
        let firstName = eachTask['contacts'][y]['first-name'].charAt(0).toUpperCase();
        let lastName = eachTask['contacts'][y]['last-name'].charAt(0).toUpperCase();
        let contactsBgColor = eachTask['contacts'][y]['color'];

        contactIconsField.style = "display: flex; flex-direction: row;";
        contactIconsField.innerHTML += `
            <div class="taskContactIcon" style="background-color: ${contactsBgColor};">
            ${firstName}${lastName}</div>`;

        contactIconsFieldResponsive.style = "display: flex; flex-direction: row;";
        contactIconsFieldResponsive.innerHTML += `
            <div class="taskContactIcon" style="background-color: ${contactsBgColor};">
            ${firstName}${lastName}</div>`;
    }
}

function displayPriorityImg(eachTask) {
    let priorityField = document.getElementById(`taskPriorityIMG${eachTask['id']}`);
    let priorityFieldResponsive = document.getElementById(`taskPriorityIMGresponsive${eachTask['id']}`);

    if (eachTask['priority'] == 'Urgent') {
        priorityField.src = 'add-task-img/prio-urgent.png';
        priorityFieldResponsive.src = 'add-task-img/prio-urgent.png';
    }

    if (eachTask['priority'] == 'Medium') {
        priorityField.src = 'add-task-img/prio-medium.png';
        priorityFieldResponsive.src = 'add-task-img/prio-medium.png';
    }

    if (eachTask['priority'] == 'Low') {
        priorityField.src = 'add-task-img/prio-low.png';
        priorityFieldResponsive.src = 'add-task-img/prio-low.png';
    }
}


/*--------------Subtasks Länge & Bilder anzeigen bei SEARCHED TASK--------------*/


function loadSubtasksProgressbarSEARCHEDTASK(eachTask) {
    let subtasksProgressbar = document.getElementById(`subtasksProgressbarSEARCHED${eachTask['id']}`);
    eachTask['subtasks-true'] = [];
    for (t = 0; t < eachTask['subtasks-checkbox'].length; t++) {
        let checkIsTrue = eachTask['subtasks-checkbox'][t];
        if (checkIsTrue == true) {
            eachTask['subtasks-true'].push('->');
        }
        if (eachTask['subtasks-true'].length == 1) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 50%; height: 60%;";
        }
        if (eachTask['subtasks-true'].length == 2) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 100%; height: 60%;";
        }
    }
}

function showAmountOfFinishedSubtasksSEARCHEDTASK(eachTask) {
    let numberOfSubtasks = document.getElementById(`numberOfSubtasksSEARCHED${eachTask['id']}`);
    if (eachTask['subtasks'][1]) {
        numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
    } else {
        if (eachTask['subtasks'][0]) {
            numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
        }
    }

}

function displayContactIconsSEARCHEDTASK(eachTask) {
    let contactIconsField = document.getElementById(`taskContactsIconsSEARCHED${eachTask['id']}`);
    for (y = 0; y < eachTask['contacts'].length; y++) {
        let firstName = eachTask['contacts'][y]['first-name'].charAt(0).toUpperCase();
        let lastName = eachTask['contacts'][y]['last-name'].charAt(0).toUpperCase();
        let contactsBgColor = eachTask['contacts'][y]['color'];

        contactIconsField.style = "display: flex; flex-direction: row;";
        contactIconsField.innerHTML += `
            <div class="taskContactIcon" style="background-color: ${contactsBgColor};">
            ${firstName}${lastName}</div>`;
    }
}

function displayPriorityImgSEARCHEDTASK(eachTask) {
    let priorityField = document.getElementById(`taskPriorityIMGSEARCHED${eachTask['id']}`);

    if (eachTask['priority'] == 'Urgent') {
        priorityField.src = 'add-task-img/prio-urgent.png';
    }

    if (eachTask['priority'] == 'Medium') {
        priorityField.src = 'add-task-img/prio-medium.png';
    }

    if (eachTask['priority'] == 'Low') {
        priorityField.src = 'add-task-img/prio-low.png';
    }
}


/*----------------Progresse in unterschiedlichen Varianten lade----------------*/

function progressNEUTRAL(progress) {
    if (progress == 'TODO') {
        document.getElementById('progress').innerHTML = `
            <option value="TODO">To do</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="AWAITFEEDBACK">Await Feedback</option>`;
    }
}

function progressINPROGRESS(progress) {
    if (progress == 'INPROGRESS') {
        document.getElementById('progress').innerHTML = `
            <option value="INPROGRESS">In Progress</option>
            <option value="TODO">To do</option>
            <option value="AWAITFEEDBACK">Await Feedback</option>`;
    }
}

function progressAWAITFEEDBACK(progress) {
    if (progress == 'AWAITFEEDBACK') {
        document.getElementById('progress').innerHTML = `
            <option value="AWAITFEEDBACK">Await Feedback</option>
            <option value="TODO">To do</option>
            <option value="INPROGRESS">In Progress</option>`;
    }
}