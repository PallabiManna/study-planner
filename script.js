function addTask() {

    let subject =
        document.getElementById("subject").value;

    let topic =
        document.getElementById("topic").value;

    let date =
        document.getElementById("date").value;

    let priority =
        document.getElementById("priority").value;


    if (
        subject === "" ||
        topic === "" ||
        date === ""
    ) {

        alert("Please fill all fields!");

        return;
    }


    createTask(
        subject,
        topic,
        date,
        priority,
        false
    );


    document.getElementById("subject").value = "";

    document.getElementById("topic").value = "";

    document.getElementById("date").value = "";


    updateStats();

    updateDateStats();

    saveTasks();
}



function createTask(
    subject,
    topic,
    date,
    priority,
    completed
) {

    let li =
        document.createElement("li");


    if (completed) {

        li.classList.add("completed");

    }


    let taskInfo =
        document.createElement("div");


    taskInfo.innerHTML = `
        <div class="task-title">
            ${subject}
        </div>

        <div class="task-topic">
            📖 ${topic}
        </div>

        <div class="task-date">
            📅 ${date}
        </div>

        <span class="priority-badge ${priority.toLowerCase()}">
            ${priority} Priority
        </span>
    `;


    // COMPLETE BUTTON

    let completeButton =
        document.createElement("button");


    completeButton.innerText =
        completed
        ? "Completed ✓"
        : "Complete";


    completeButton.onclick =
        function(event) {

            event.stopPropagation();


            li.classList.toggle(
                "completed"
            );


            if (
                li.classList.contains(
                    "completed"
                )
            ) {

                completeButton.innerText =
                    "Completed ✓";

            } else {

                completeButton.innerText =
                    "Complete";
            }


            updateStats();

            updateDateStats();

            saveTasks();
        };


    // EDIT BUTTON

    let editButton =
        document.createElement("button");


    editButton.innerText = "Edit";


    editButton.onclick =
        function(event) {

            event.stopPropagation();


            let newSubject =
                prompt(
                    "Enter new subject:",
                    subject
                );


            if (
                newSubject === null ||
                newSubject.trim() === ""
            ) {
                return;
            }


            let newTopic =
                prompt(
                    "Enter new topic:",
                    topic
                );


            if (
                newTopic === null ||
                newTopic.trim() === ""
            ) {
                return;
            }


            let newDate =
                prompt(
                    "Enter new date (YYYY-MM-DD):",
                    date
                );


            if (
                newDate === null ||
                newDate.trim() === ""
            ) {
                return;
            }


            let newPriority =
                prompt(
                    "Enter priority (Low / Medium / High):",
                    priority
                );


            if (
                newPriority === null ||
                newPriority.trim() === ""
            ) {
                return;
            }


            newPriority =
                newPriority
                .charAt(0)
                .toUpperCase() +
                newPriority
                .slice(1)
                .toLowerCase();


            if (
                newPriority !== "Low" &&
                newPriority !== "Medium" &&
                newPriority !== "High"
            ) {

                alert(
                    "Please enter Low, Medium or High."
                );

                return;
            }


            subject = newSubject;

            topic = newTopic;

            date = newDate;

            priority = newPriority;


            taskInfo.innerHTML = `
                <div class="task-title">
                    ${subject}
                </div>

                <div class="task-topic">
                    📖 ${topic}
                </div>

                <div class="task-date">
                    📅 ${date}
                </div>

                <span class="priority-badge ${priority.toLowerCase()}">
                    ${priority} Priority
                </span>
            `;


            updateStats();

            updateDateStats();

            saveTasks();
        };


    // DELETE BUTTON

    let deleteButton =
        document.createElement("button");


    deleteButton.innerText = "Delete";


    deleteButton.onclick =
        function(event) {

            event.stopPropagation();


            li.remove();


            updateStats();

            updateDateStats();

            saveTasks();
        };


    li.appendChild(taskInfo);

    li.appendChild(completeButton);

    li.appendChild(editButton);

    li.appendChild(deleteButton);


    document
        .getElementById("taskList")
        .appendChild(li);
}



function updateStats() {

    let tasks =
        document.querySelectorAll(
            "#taskList li"
        );


    let total =
        tasks.length;


    let completed =
        document.querySelectorAll(
            "#taskList .completed"
        ).length;


    let pending =
        total - completed;


    document.getElementById(
        "totalTasks"
    ).innerText = total;


    document.getElementById(
        "completedTasks"
    ).innerText = completed;


    document.getElementById(
        "pendingTasks"
    ).innerText = pending;
}



function updateDateStats() {

    let today =
        new Date();


    let todayString =
        today.getFullYear() +
        "-" +
        String(
            today.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            today.getDate()
        ).padStart(2, "0");


    let todayCount = 0;

    let overdueCount = 0;

    let upcomingCount = 0;


    document
        .querySelectorAll(
            "#taskList li"
        )
        .forEach(
            function(li) {


                let dateElement =
                    li.querySelector(
                        ".task-date"
                    );


                if (!dateElement) {

                    return;

                }


                let taskDate =
                    dateElement
                    .innerText
                    .replace(
                        "📅 ",
                        ""
                    )
                    .trim();


                if (
                    taskDate ===
                    todayString
                ) {

                    todayCount++;

                }

                else if (
                    taskDate <
                    todayString
                ) {

                    overdueCount++;

                }

                else {

                    upcomingCount++;

                }

            }
        );


    document.getElementById(
        "todayCount"
    ).innerText =
        todayCount;


    document.getElementById(
        "overdueCount"
    ).innerText =
        overdueCount;


    document.getElementById(
        "upcomingCount"
    ).innerText =
        upcomingCount;
}



function saveTasks() {

    let tasks = [];


    document
        .querySelectorAll(
            "#taskList li"
        )
        .forEach(
            function(li) {


                let taskInfo =
                    li.querySelector(
                        "div"
                    );


                let subject =
                    taskInfo
                    .querySelector(
                        ".task-title"
                    )
                    .innerText;


                let topic =
                    taskInfo
                    .querySelector(
                        ".task-topic"
                    )
                    .innerText
                    .replace(
                        "📖 ",
                        ""
                    );


                let date =
                    taskInfo
                    .querySelector(
                        ".task-date"
                    )
                    .innerText
                    .replace(
                        "📅 ",
                        ""
                    );


                let priority =
                    taskInfo
                    .querySelector(
                        ".priority-badge"
                    )
                    .innerText
                    .replace(
                        " Priority",
                        ""
                    );


                let completed =
                    li.classList.contains(
                        "completed"
                    );


                tasks.push({

                    subject: subject,

                    topic: topic,

                    date: date,

                    priority: priority,

                    completed: completed

                });

            }
        );


    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );
}



function loadTasks() {

    let savedTasks =
        JSON.parse(
            localStorage.getItem(
                "studyTasks"
            )
        );


    if (savedTasks === null) {

        return;

    }


    savedTasks.forEach(
        function(task) {

            createTask(
                task.subject,
                task.topic,
                task.date,
                task.priority,
                task.completed
            );

        }
    );
}



function filterTasks() {

    let searchText =
        document.getElementById(
            "searchInput"
        )
        .value
        .toLowerCase();


    let status =
        document.getElementById(
            "statusFilter"
        ).value;


    let priority =
        document.getElementById(
            "priorityFilter"
        ).value;


    let tasks =
        document.querySelectorAll(
            "#taskList li"
        );


    tasks.forEach(
        function(li) {


            let text =
                li.innerText
                .toLowerCase();


            let matchesSearch =
                text.includes(
                    searchText
                );


            let isCompleted =
                li.classList.contains(
                    "completed"
                );


            let matchesStatus =
                status === "all" ||

                (
                    status === "completed" &&
                    isCompleted
                ) ||

                (
                    status === "pending" &&
                    !isCompleted
                );


            let matchesPriority =
                priority === "all" ||

                text.includes(
                    priority
                    .toLowerCase() +
                    " priority"
                );


            if (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            ) {

                li.style.display = "";

            }

            else {

                li.style.display =
                    "none";
            }

        }
    );
}



function sortTasks() {

    let sortValue =
        document.getElementById(
            "sortFilter"
        ).value;


    let taskList =
        document.getElementById(
            "taskList"
        );


    let tasks =
        Array.from(
            taskList.querySelectorAll(
                "li"
            )
        );


    if (
        sortValue === "none"
    ) {

        return;

    }


    if (
        sortValue === "dateAsc"
    ) {

        tasks.sort(
            function(a, b) {

                let dateA =
                    a.querySelector(
                        ".task-date"
                    )
                    .innerText
                    .replace(
                        "📅 ",
                        ""
                    );


                let dateB =
                    b.querySelector(
                        ".task-date"
                    )
                    .innerText
                    .replace(
                        "📅 ",
                        ""
                    );


                return dateA.localeCompare(
                    dateB
                );

            }
        );
    }


    if (
        sortValue === "dateDesc"
    ) {

        tasks.sort(
            function(a, b) {

                let dateA =
                    a.querySelector(
                        ".task-date"
                    )
                    .innerText
                    .replace(
                        "📅 ",
                        ""
                    );


                let dateB =
                    b.querySelector(
                        ".task-date"
                    )
                    .innerText
                    .replace(
                        "📅 ",
                        ""
                    );


                return dateB.localeCompare(
                    dateA
                );

            }
        );
    }


    if (
        sortValue === "priority"
    ) {

        let priorityOrder = {

            high: 1,

            medium: 2,

            low: 3

        };


        tasks.sort(
            function(a, b) {

                let priorityA =
                    a.querySelector(
                        ".priority-badge"
                    )
                    .innerText
                    .replace(
                        " Priority",
                        ""
                    )
                    .toLowerCase();


                let priorityB =
                    b.querySelector(
                        ".priority-badge"
                    )
                    .innerText
                    .replace(
                        " Priority",
                        ""
                    )
                    .toLowerCase();


                return (
                    priorityOrder[
                        priorityA
                    ] -
                    priorityOrder[
                        priorityB
                    ]
                );

            }
        );
    }


    tasks.forEach(
        function(task) {

            taskList.appendChild(
                task
            );

        }
    );
}



function clearCompletedTasks() {

    let completedTasks =
        document.querySelectorAll(
            "#taskList li.completed"
        );


    if (
        completedTasks.length === 0
    ) {

        alert(
            "There are no completed tasks!"
        );

        return;
    }


    let confirmDelete =
        confirm(
            "Are you sure you want to delete all completed tasks?"
        );


    if (!confirmDelete) {

        return;

    }


    completedTasks.forEach(
        function(task) {

            task.remove();

        }
    );


    updateStats();

    updateDateStats();

    saveTasks();


    alert(
        "Completed tasks cleared successfully!"
    );
}


// START

loadTasks();

updateStats();

updateDateStats();

// ==================== NOTIFICATION ====================

function checkNotifications() {

    let today = new Date();

    let todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");


    let messages = [];


    document.querySelectorAll("#taskList li").forEach(function(li) {

        // Completed task ignore করবে
        if (li.classList.contains("completed")) {
            return;
        }


        let dateElement =
            li.querySelector(".task-date");

        if (!dateElement) {
            return;
        }


        let taskDate =
            dateElement.innerText
            .replace("📅 ", "")
            .trim();


        let subject =
            li.querySelector(".task-title").innerText;


        // Today's task
        if (taskDate === todayString) {

            messages.push(
                "📚 " + subject + " is due today!"
            );
        }


        // Overdue task
        else if (taskDate < todayString) {

            messages.push(
                "⚠️ " + subject + " is overdue!"
            );
        }

    });


    if (messages.length > 0) {

        alert(
            "🔔 Study Planner Reminder\n\n" +
            messages.join("\n")
        );
    }
}


// Notification check
checkNotifications();