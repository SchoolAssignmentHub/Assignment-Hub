let assignments = [];

let selectedAssignmentId = null;
let editingAssignmentId = null;


/* =========================
   ELEMENTS
========================= */

const userGreeting = document.getElementById("userGreeting");

const addAssignmentBtn =
    document.getElementById("addAssignmentBtn");

const assignmentModal =
    document.getElementById("assignmentModal");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const assignmentForm =
    document.getElementById("assignmentForm");

const assignmentList =
    document.getElementById("assignmentList");

const progressSlider =
    document.getElementById("progress");

const progressValue =
    document.getElementById("progressValue");

const detailsModal =
    document.getElementById("detailsModal");

const closeDetailsBtn =
    document.getElementById("closeDetailsBtn");

const closeDetailsButton =
    document.getElementById("closeDetailsButton");

const editAssignmentBtn =
    document.getElementById("editAssignmentBtn");

const deleteAssignmentBtn =
    document.getElementById("deleteAssignmentBtn");

const submittedCheckbox =
    document.getElementById("submitted");


/* =========================
   USER GREETING
========================= */

async function loadUserProfile(user) {

    if (!userGreeting || !user) return;

    const {
        data,
        error
    } = await supabaseClient
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();


    if (error) {

        console.error(
            "Error loading user profile:",
            error
        );

        console.log(
            "Logged-in user ID:",
            user.id
        );

        userGreeting.textContent =
            "Hello";

        return;
    }


    console.log(
        "Profile loaded:",
        data
    );


    userGreeting.textContent =
        `Hello, ${data.display_name}`;
}


/* =========================
   SUPABASE
========================= */

const SUPABASE_URL = "https://vizbglpdvnkilmgzvahr.supabase.co";

const SUPABASE_KEY = "sb_publishable_vmm2eS2OuYxCIh0cF2j0CA_EHCS9ILL";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================
   AUDIO
========================= */

let audioContext = null;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }


    if (
        audioContext.state === "suspended"
    ) {

        audioContext.resume();

    }


    return audioContext;
}


/* Wake up audio after first interaction */

document.addEventListener(
    "click",
    () => {

        const audio =
            getAudioContext();

        if (
            audio.state === "suspended"
        ) {

            audio.resume();

        }

    },
    {
        once: true
    }
);


function playButtonSound() {

    const audio =
        getAudioContext();

    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.setValueAtTime(
        500,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        700,
        audio.currentTime + 0.06
    );

    gain.gain.setValueAtTime(
        0.3,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.08
    );

    oscillator.connect(gain);

    gain.connect(
        audio.destination
    );

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.08
    );
}


function playCloseSound() {

    const audio =
        getAudioContext();

    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.setValueAtTime(
        600,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        350,
        audio.currentTime + 0.08
    );

    gain.gain.setValueAtTime(
        0.24,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.1
    );

    oscillator.connect(gain);

    gain.connect(
        audio.destination
    );

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.1
    );
}


function playDeleteSound() {

    const audio =
        getAudioContext();

    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();

    oscillator.type =
        "sawtooth";

    oscillator.frequency.setValueAtTime(
        250,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        100,
        audio.currentTime + 0.15
    );

    gain.gain.setValueAtTime(
        0.24,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.15
    );

    oscillator.connect(gain);

    gain.connect(
        audio.destination
    );

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.15
    );
}


function playHoverSound() {

    const audio =
        getAudioContext();

    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();

    oscillator.type =
        "triangle";

    oscillator.frequency.setValueAtTime(
        950,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        1200,
        audio.currentTime + 0.025
    );

    gain.gain.setValueAtTime(
        0.2,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.035
    );

    oscillator.connect(gain);

    gain.connect(
        audio.destination
    );

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.035
    );
}


function playSubmitOnSound() {

    const audio =
        getAudioContext();

    const notes = [
        659.25,
        783.99
    ];

    notes.forEach(
        (frequency, index) => {

            const oscillator =
                audio.createOscillator();

            const gain =
                audio.createGain();

            oscillator.type =
                "sine";

            oscillator.frequency.value =
                frequency;

            oscillator.connect(gain);

            gain.connect(
                audio.destination
            );

            const startTime =
                audio.currentTime +
                index * 0.07;

            gain.gain.setValueAtTime(
                0,
                startTime
            );

            gain.gain.linearRampToValueAtTime(
                0.07,
                startTime + 0.015
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                startTime + 0.18
            );

            oscillator.start(
                startTime
            );

            oscillator.stop(
                startTime + 0.18
            );
        }
    );
}


function playSubmitOffSound() {

    const audio =
        getAudioContext();

    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();

    oscillator.type =
        "sine";

    oscillator.frequency.setValueAtTime(
        440,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        300,
        audio.currentTime + 0.12
    );

    gain.gain.setValueAtTime(
        0.36,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.14
    );

    oscillator.connect(gain);

    gain.connect(
        audio.destination
    );

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.14
    );
}


/* =========================
   ADD ASSIGNMENT
========================= */

addAssignmentBtn.addEventListener(
    "click",
    () => {

        playButtonSound();

        editingAssignmentId =
            null;

        assignmentForm.reset();

        progressSlider.value =
            0;

        progressValue.textContent =
            "0%";

        assignmentModal.style.display =
            "flex";
    }
);


function closeAddModal() {

    playCloseSound();

    assignmentModal.style.display =
        "none";
}


closeModalBtn.addEventListener(
    "click",
    closeAddModal
);

cancelBtn.addEventListener(
    "click",
    closeAddModal
);


/* =========================
   PROGRESS
========================= */

progressSlider.addEventListener(
    "input",
    () => {

        progressValue.textContent =
            progressSlider.value +
            "%";
    }
);


/* =========================
   SUBMITTED CHECKBOX
========================= */

submittedCheckbox.addEventListener(
    "change",
    () => {

        if (
            submittedCheckbox.checked
        ) {

            playSubmitOnSound();

        } else {

            playSubmitOffSound();

        }
    }
);


/* =========================
   SAVE ASSIGNMENT
========================= */

assignmentForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "assignmentName"
                )
                .value
                .trim();

        const subject =
            document
                .getElementById(
                    "subject"
                )
                .value
                .trim();

        const dueDate =
            document
                .getElementById(
                    "dueDate"
                )
                .value;

        const gradeWeight =
            document
                .getElementById(
                    "gradeWeight"
                )
                .value;

        const progress =
            progressSlider.value;

        const submitted =
            submittedCheckbox.checked;


        let newlySubmitted =
            false;


        /* GET LOGGED-IN USER */

        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth.getUser();


        if (!user) {

            alert(
                "You must be logged in to save an assignment."
            );

            return;
        }


        /* =========================
           EDIT EXISTING
        ========================= */

        if (
            editingAssignmentId !== null
        ) {

            const assignment =
                assignments.find(
                    item =>
                        item.id ===
                        editingAssignmentId
                );


            if (!assignment) {

                return;
            }


            if (
                !assignment.submitted &&
                submitted
            ) {

                newlySubmitted =
                    true;
            }


            const {
                error
            } =
                await supabaseClient
                    .from("assignments")
                    .update({

                        name:
                            name,

                        subject:
                            subject,

                        due_date:
                            dueDate,

                        grade_weight:
                            gradeWeight,

                        progress:
                            progress,

                        submitted:
                            submitted

                    })
                    .eq(
                        "id",
                        assignment.supabaseId
                    )
                    .eq(
                        "user_id",
                        user.id
                    );


            if (error) {

                console.error(
                    "Error updating assignment:",
                    error
                );

                alert(
                    "The assignment could not be updated."
                );

                return;
            }


            /* UPDATE LOCAL DATA */

            assignment.name =
                name;

            assignment.subject =
                subject;

            assignment.dueDate =
                dueDate;

            assignment.gradeWeight =
                gradeWeight;

            assignment.progress =
                progress;

            assignment.submitted =
                submitted;


        /* =========================
           CREATE NEW
        ========================= */

        } else {

            const {
                data,
                error
            } =
                await supabaseClient
                    .from("assignments")
                    .insert({

                        user_id:
                            user.id,

                        name:
                            name,

                        subject:
                            subject,

                        due_date:
                            dueDate,

                        grade_weight:
                            gradeWeight,

                        progress:
                            progress,

                        submitted:
                            submitted

                    })
                    .select()
                    .single();


            if (error) {

                console.error(
                    "Error creating assignment:",
                    error
                );

                alert(
                    "The assignment could not be saved to the cloud."
                );

                return;
            }


            const newAssignment = {

                id:
                    Date.now() +
                    Math.random(),

                supabaseId:
                    data.id,

                name:
                    data.name,

                subject:
                    data.subject,

                dueDate:
                    data.due_date,

                gradeWeight:
                    data.grade_weight,

                progress:
                    data.progress,

                submitted:
                    data.submitted

            };


            assignments.push(
                newAssignment
            );


            if (submitted) {

                newlySubmitted =
                    true;
            }
        }


        /* =========================
           UPDATE DASHBOARD
        ========================= */

        renderAssignments();


        if (newlySubmitted) {

            celebrateSubmission();

        } else {

            playButtonSound();

        }


        editingAssignmentId =
            null;

        assignmentModal.style.display =
            "none";
    }
);


/* =========================
   DATE HELPERS
========================= */

function startOfDay(date) {

    const result =
        new Date(date);

    result.setHours(
        0,
        0,
        0,
        0
    );

    return result;
}


function getDaysUntilDue(
    assignment
) {

    const today =
        startOfDay(
            new Date()
        );

    const dueDate =
        startOfDay(
            new Date(
                assignment.dueDate +
                "T00:00:00"
            )
        );

    return Math.round(
        (
            dueDate -
            today
        ) /
        (
            1000 *
            60 *
            60 *
            24
        )
    );
}


function getAssignmentSection(
    assignment
) {

    const daysUntil =
        getDaysUntilDue(
            assignment
        );


    if (
        daysUntil < 0 &&
        !assignment.submitted
    ) {

        return "overdue";
    }


    if (
        daysUntil >= 0 &&
        daysUntil <= 6
    ) {

        return "thisWeek";
    }


    if (
        daysUntil >= 7 &&
        daysUntil <= 13
    ) {

        return "nextWeek";
    }


    return "later";
}


function formatDate(
    dateString
) {

    const date =
        new Date(
            dateString +
            "T00:00:00"
        );

    return date.toLocaleDateString(
        "en-AU",
        {
            day:
                "numeric",

            month:
                "short",

            year:
                "numeric"
        }
    );
}


/* =========================
   RENDER SECTIONS
========================= */

function renderSection(
    title,
    sectionAssignments
) {

    if (
        sectionAssignments.length === 0
    ) {

        return;
    }


    const section =
        document.createElement(
            "div"
        );


    section.className =
        "assignment-section " +
        (
            title === "OVERDUE"
                ? "overdue-section"
                : ""
        );


    const heading =
        document.createElement(
            "h3"
        );


    heading.textContent =
        title;


    section.appendChild(
        heading
    );


    sectionAssignments.forEach(
        assignment => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assignment-card";


            if (
                assignment.submitted
            ) {

                card.classList.add(
                    "submitted"
                );
            }


            const daysUntil =
                getDaysUntilDue(
                    assignment
                );


            let dueText;


            if (
                assignment.submitted
            ) {

                dueText =
                    "SUBMITTED";

            } else if (
                daysUntil < 0
            ) {

                dueText =
                    "Overdue";

            } else if (
                daysUntil === 0
            ) {

                dueText =
                    "Due today";

            } else if (
                daysUntil === 1
            ) {

                dueText =
                    "Due tomorrow";

            } else {

                dueText =
                    `Due in ${daysUntil} days`;
            }


            card.innerHTML = `

                <div>

                    <div>
                        <strong>
                            ${assignment.subject}
                        </strong>
                    </div>

                    <div class="assignment-name">
                        ${assignment.name}
                    </div>

                    <div class="assignment-due ${
                        assignment.submitted
                            ? "submitted-label"
                            : ""
                    }">
                        ${dueText}
                    </div>

                </div>


                <div class="assignment-right">

                    <div class="assignment-date">
                        ${formatDate(
                            assignment.dueDate
                        )}
                    </div>

                    <div class="progress-container">

                        <div
                            class="progress-bar"
                            style="
                                width:
                                ${assignment.progress}%;
                            "
                        ></div>

                    </div>

                </div>
            `;


            card.addEventListener(
                "click",
                () => {

                    playButtonSound();

                    openDetails(
                        assignment.id
                    );
                }
            );


            section.appendChild(
                card
            );
        }
    );


    assignmentList.appendChild(
        section
    );
}


/* =========================
   MAIN DASHBOARD
========================= */

function renderAssignments() {

    assignmentList.innerHTML =
        "";


    const sortedAssignments =
        [...assignments]
            .filter(
                assignment => {

                    const daysUntil =
                        getDaysUntilDue(
                            assignment
                        );


                    /*
                       Submitted assignments
                       disappear only after
                       their due date passes.
                    */

                    return !(
                        assignment.submitted &&
                        daysUntil < 0
                    );
                }
            )
            .sort(
                (a, b) =>
                    new Date(
                        a.dueDate
                    ) -
                    new Date(
                        b.dueDate
                    )
            );


    if (
        sortedAssignments.length === 0
    ) {

        assignmentList.innerHTML =
            "<p>No assignments yet.</p>";

        return;
    }


    const sections = {

        overdue:
            [],

        thisWeek:
            [],

        nextWeek:
            [],

        later:
            []
    };


    sortedAssignments.forEach(
        assignment => {

            const section =
                getAssignmentSection(
                    assignment
                );

            sections[
                section
            ].push(
                assignment
            );
        }
    );


    renderSection(
        "OVERDUE",
        sections.overdue
    );


    renderSection(
        "NEXT 7 DAYS",
        sections.thisWeek
    );


    renderSection(
        "NEXT 14 DAYS",
        sections.nextWeek
    );


    renderSection(
        "LATER",
        sections.later
    );
}


/* =========================
   ASSIGNMENT DETAILS
========================= */

function openDetails(id) {

    const assignment =
        assignments.find(
            item =>
                item.id === id
        );


    if (!assignment) {

        return;
    }


    selectedAssignmentId =
        id;


    document.getElementById(
        "detailsTitle"
    ).textContent =
        assignment.name;


    const daysUntil =
        getDaysUntilDue(
            assignment
        );


    let dueText;


    if (
        assignment.submitted
    ) {

        dueText =
            "SUBMITTED";

    } else if (
        daysUntil < 0
    ) {

        dueText =
            "Overdue";

    } else if (
        daysUntil === 0
    ) {

        dueText =
            "Due today";

    } else if (
        daysUntil === 1
    ) {

        dueText =
            "Due tomorrow";

    } else {

        dueText =
            `Due in ${daysUntil} days`;
    }


    document.getElementById(
        "assignmentDetails"
    ).innerHTML = `

        <p>
            <strong>
                Subject:
            </strong>

            ${assignment.subject}
        </p>


        <p>
            <strong>
                Due:
            </strong>

            ${formatDate(
                assignment.dueDate
            )}
        </p>


        <p>
            <strong>
                Status:
            </strong>

            <span class="${
                assignment.submitted
                    ? "submitted-status"
                    : "normal-status"
            }">

                ${dueText}

            </span>
        </p>


        <p>
            <strong>
                Grade Weight:
            </strong>

            ${assignment.gradeWeight || 0}%
        </p>


        <p>
            <strong>
                Progress:
            </strong>

            ${assignment.progress}%
        </p>


        <p>
            <strong>
                Submitted:
            </strong>

            ${
                assignment.submitted
                    ? "Yes"
                    : "No"
            }
        </p>
    `;


    detailsModal.style.display =
        "flex";
}


/* =========================
   CLOSE DETAILS
========================= */

function closeDetails() {

    playCloseSound();

    detailsModal.style.display =
        "none";
}


closeDetailsBtn.addEventListener(
    "click",
    closeDetails
);


closeDetailsButton.addEventListener(
    "click",
    closeDetails
);


/* =========================
   EDIT ASSIGNMENT
========================= */

editAssignmentBtn.addEventListener(
    "click",
    () => {

        playButtonSound();


        const assignment =
            assignments.find(
                item =>
                    item.id ===
                    selectedAssignmentId
            );


        if (!assignment) {

            return;
        }


        editingAssignmentId =
            assignment.id;


        document.getElementById(
            "assignmentName"
        ).value =
            assignment.name;


        document.getElementById(
            "subject"
        ).value =
            assignment.subject;


        document.getElementById(
            "dueDate"
        ).value =
            assignment.dueDate;


        document.getElementById(
            "gradeWeight"
        ).value =
            assignment.gradeWeight;


        progressSlider.value =
            assignment.progress;


        progressValue.textContent =
            assignment.progress +
            "%";


        submittedCheckbox.checked =
            assignment.submitted;


        closeDetails();


        assignmentModal.style.display =
            "flex";
    }
);


/* =========================
   DELETE ASSIGNMENT
========================= */

deleteAssignmentBtn.addEventListener(
    "click",
    async () => {

        playDeleteSound();


        const assignment =
            assignments.find(
                item =>
                    item.id ===
                    selectedAssignmentId
            );


        if (!assignment) {

            return;
        }


        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth.getUser();


        if (!user) {

            alert(
                "You must be logged in to delete an assignment."
            );

            return;
        }


        /* DELETE FROM SUPABASE */

        const {
            error
        } =
            await supabaseClient
                .from("assignments")
                .delete()
                .eq(
                    "id",
                    assignment.supabaseId
                )
                .eq(
                    "user_id",
                    user.id
                );


        if (error) {

            console.error(
                "Error deleting assignment:",
                error
            );

            alert(
                "The assignment could not be deleted."
            );

            return;
        }


        /* DELETE LOCALLY */

        assignments =
            assignments.filter(
                item =>
                    item.id !==
                    selectedAssignmentId
            );


        renderAssignments();

        closeDetails();
    }
);


/* =========================
   SUBMISSION CELEBRATION
========================= */

function celebrateSubmission() {

    const audio =
        getAudioContext();


    const notes = [

        523.25,
        659.25,
        783.99,
        1046.50
    ];


    notes.forEach(
        (frequency, index) => {

            const oscillator =
                audio.createOscillator();

            const gain =
                audio.createGain();


            oscillator.type =
                "sine";


            oscillator.frequency.value =
                frequency;


            oscillator.connect(gain);

            gain.connect(
                audio.destination
            );


            const startTime =
                audio.currentTime +
                index * 0.08;


            gain.gain.setValueAtTime(
                0,
                startTime
            );


            gain.gain.linearRampToValueAtTime(
                0.12,
                startTime + 0.02
            );


            gain.gain.exponentialRampToValueAtTime(
                0.001,
                startTime + 0.35
            );


            oscillator.start(
                startTime
            );


            oscillator.stop(
                startTime + 0.35
            );
        }
    );


    const colours = [

        "#ff4757",
        "#ffa502",
        "#2ed573",
        "#1e90ff",
        "#a55eea",
        "#ff6b81"
    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.className =
            "confetti";


        const size =
            Math.random() * 7 +
            6;


        const horizontalMovement =
            Math.random() * 300 -
            150;


        const rotation =
            Math.random() * 720;


        confetti.style.left =
            Math.random() *
            100 +
            "vw";


        confetti.style.width =
            size +
            "px";


        confetti.style.height =
            size * 1.5 +
            "px";


        confetti.style.backgroundColor =
            colours[
                Math.floor(
                    Math.random() *
                    colours.length
                )
            ];


        confetti.style.animationDuration =
            Math.random() *
            1.5 +
            2.5 +
            "s";


        confetti.style.animationDelay =
            Math.random() *
            0.4 +
            "s";


        confetti.style.setProperty(
            "--horizontal",
            horizontalMovement +
            "px"
        );


        confetti.style.setProperty(
            "--rotation",
            rotation +
            "deg"
        );


        document.body.appendChild(
            confetti
        );


        setTimeout(
            () => {

                confetti.remove();

            },
            4000
        );
    }
}


/* =========================
   HOVER SOUNDS
========================= */

let lastHoverSoundTime = 0;


/* Only enable hover sounds on devices with a real mouse */

const hasMouse =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


if (hasMouse) {

    document.addEventListener(
        "mouseover",
        (event) => {

            const target =
                event.target.closest(
                    "button, .assignment-card"
                );


            if (!target) {
                return;
            }


            if (
                target.dataset.hovered === "true"
            ) {
                return;
            }


            target.dataset.hovered =
                "true";


            const now =
                Date.now();


            if (
                now - lastHoverSoundTime < 80
            ) {
                return;
            }


            lastHoverSoundTime =
                now;


            playHoverSound();
        }
    );


    document.addEventListener(
        "mouseout",
        (event) => {

            const target =
                event.target.closest(
                    "button, .assignment-card"
                );


            if (!target) {
                return;
            }


            target.dataset.hovered =
                "false";
        }
    );

}


/* =========================
   COMPLETED HISTORY
========================= */

const completedHistoryBtn =
    document.getElementById(
        "completedHistoryBtn"
    );

const historyModal =
    document.getElementById(
        "historyModal"
    );

const closeHistoryBtn =
    document.getElementById(
        "closeHistoryBtn"
    );

const completedAssignmentList =
    document.getElementById(
        "completedAssignmentList"
    );


function renderCompletedHistory() {

    completedAssignmentList.innerHTML =
        "";


    const completedAssignments =
        [...assignments]
            .filter(
                assignment =>
                    assignment.submitted
            )
            .sort(
                (a, b) =>
                    new Date(
                        b.dueDate
                    ) -
                    new Date(
                        a.dueDate
                    )
            );


    if (
        completedAssignments.length === 0
    ) {

        completedAssignmentList.innerHTML = `
            <div class="history-empty">
                No completed assignments yet.
            </div>
        `;

        return;
    }


    completedAssignments.forEach(
        assignment => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "history-item";


            item.innerHTML = `

                <strong>
                    ${assignment.subject}
                </strong>

                <div class="history-item-name">
                    ${assignment.name}
                </div>

                <div class="history-item-details">
                    Due:
                    ${formatDate(
                        assignment.dueDate
                    )}
                    &nbsp; • &nbsp;
                    Grade Weight:
                    ${assignment.gradeWeight || 0}%
                    &nbsp; • &nbsp;
                    Progress:
                    ${assignment.progress}%
                </div>

                <div class="history-submitted">
                    SUBMITTED
                </div>
            `;


            item.addEventListener(
                "click",
                () => {

                    playButtonSound();

                    historyModal.style.display =
                        "none";

                    openDetails(
                        assignment.id
                    );
                }
            );


            completedAssignmentList.appendChild(
                item
            );
        }
    );
}


completedHistoryBtn.addEventListener(
    "click",
    () => {

        playButtonSound();

        renderCompletedHistory();

        historyModal.style.display =
            "flex";
    }
);


function closeHistory() {

    playCloseSound();

    historyModal.style.display =
        "none";
}


closeHistoryBtn.addEventListener(
    "click",
    closeHistory
);


/* =========================
   SETTINGS / BACKUP
========================= */

const settingsBtn =
    document.getElementById(
        "settingsBtn"
    );

const settingsModal =
    document.getElementById(
        "settingsModal"
    );

const closeSettingsBtn =
    document.getElementById(
        "closeSettingsBtn"
    );

const exportBackupBtn =
    document.getElementById(
        "exportBackupBtn"
    );

const importBackupBtn =
    document.getElementById(
        "importBackupBtn"
    );

const importBackupInput =
    document.getElementById(
        "importBackupInput"
    );


/* OPEN SETTINGS */

settingsBtn.addEventListener(
    "click",
    () => {

        playButtonSound();

        settingsModal.style.display =
            "flex";
    }
);


/* CLOSE SETTINGS */

function closeSettings() {

    playCloseSound();

    settingsModal.style.display =
        "none";
}


closeSettingsBtn.addEventListener(
    "click",
    closeSettings
);


/* =========================
   EXPORT BACKUP
========================= */

exportBackupBtn.addEventListener(
    "click",
    () => {

        playButtonSound();


        const backupData = {

            app:
                "Assignment Hub",

            version:
                1,

            exportedAt:
                new Date().toISOString(),

            assignments:
                assignments
        };


        const json =
            JSON.stringify(
                backupData,
                null,
                2
            );


        const blob =
            new Blob(
                [json],
                {
                    type:
                        "application/json"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        const date =
            new Date()
                .toISOString()
                .slice(
                    0,
                    10
                );


        link.href =
            url;

        link.download =
            `assignment-hub-backup-${date}.json`;


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        URL.revokeObjectURL(
            url
        );
    }
);


/* =========================
   IMPORT BACKUP
========================= */

importBackupBtn.addEventListener(
    "click",
    () => {

        playButtonSound();

        importBackupInput.click();
    }
);


importBackupInput.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];


        if (!file) {

            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            () => {

                try {

                    const backupData =
                        JSON.parse(
                            reader.result
                        );


                    if (
                        backupData.app !==
                        "Assignment Hub"
                    ) {

                        alert(
                            "That file is not an Assignment Hub backup."
                        );

                        return;
                    }


                    if (
                        !Array.isArray(
                            backupData.assignments
                        )
                    ) {

                        alert(
                            "The backup file appears to be invalid."
                        );

                        return;
                    }


                    const confirmed =
                        confirm(
                            "Import this backup? Your current assignments will be replaced."
                        );


                    if (!confirmed) {

                        return;
                    }


                    assignments =
                        backupData.assignments;


                    renderAssignments();

                    settingsModal.style.display =
                        "none";


                    alert(
                        "Backup imported successfully!"
                    );


                } catch (error) {

                    console.error(
                        "Backup import error:",
                        error
                    );

                    alert(
                        "The backup file could not be read."
                    );
                }
            };


        reader.readAsText(
            file
        );


        importBackupInput.value =
            "";
    }
);


/* =========================
   AUTHENTICATION
========================= */

const authScreen =
    document.getElementById(
        "authScreen"
    );

const authForm =
    document.getElementById(
        "authForm"
    );

const authEmail =
    document.getElementById(
        "authEmail"
    );

const authPassword =
    document.getElementById(
        "authPassword"
    );

const authSubmit =
    document.getElementById(
        "authSubmit"
    );

const authMessage =
    document.getElementById(
        "authMessage"
    );

const authTitle =
    document.getElementById(
        "authTitle"
    );


/* =========================
   LOGIN ONLY
========================= */

authForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            authEmail.value.trim();

        const password =
            authPassword.value;


        authMessage.textContent =
            "Please wait...";


        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email:
                    email,

                password:
                    password

            });


        console.log(
            "LOGIN DATA:",
            data
        );

        console.log(
            "LOGIN ERROR:",
            error
        );


        if (error) {

            authMessage.textContent =
                error.message;

            return;
        }


        authMessage.textContent =
            "";
    }
);


/* =========================
   CHECK AUTH
========================= */

async function checkAuth() {

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (session) {

        authScreen.style.display = "none";

        await loadUserProfile(session.user);

        await loadAssignmentsFromSupabase();

    } else {

        authScreen.style.display = "flex";

        userGreeting.textContent = "Hello";

    }
}


/* =========================
   AUTH STATE CHANGES
========================= */

supabaseClient.auth.onAuthStateChange(
    (_event, session) => {

        if (session) {

            authScreen.style.display =
                "none";

            loadUserProfile(session.user);

            loadAssignmentsFromSupabase();

        } else {

            authScreen.style.display =
                "flex";

            userGreeting.textContent =
                "Hello";
        }
    }
);


/* =========================
   LOAD ASSIGNMENTS
========================= */

async function loadAssignmentsFromSupabase() {

    const {
        data: {
            user
        }
    } =
        await supabaseClient.auth.getUser();


    if (!user) {

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("assignments")
            .select("*")
            .eq(
                "user_id",
                user.id
            )
            .order(
                "due_date",
                {
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "Error loading assignments:",
            error
        );

        return;
    }


    assignments =
        data.map(
            assignment => ({

                id:
                    Date.now() +
                    Math.random(),

                supabaseId:
                    assignment.id,

                name:
                    assignment.name,

                subject:
                    assignment.subject,

                dueDate:
                    assignment.due_date,

                gradeWeight:
                    assignment.grade_weight,

                progress:
                    assignment.progress,

                submitted:
                    assignment.submitted

            })
        );


    renderAssignments();
}


/* =========================
   LOG OUT
========================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


logoutBtn.addEventListener(
    "click",
    async () => {

        playButtonSound();


        const {
            error
        } =
            await supabaseClient.auth.signOut();


        if (error) {

            console.error(
                "Logout error:",
                error
            );

            alert(
                "Could not log out."
            );

            return;
        }


        /* CLEAR CURRENT ACCOUNT DATA */

        assignments =
            [];


        /* CLEAR LOGIN FIELDS */

        authEmail.value =
            "";

        authPassword.value =
            "";

        authMessage.textContent =
            "";


        /* CLOSE MODALS */

        settingsModal.style.display =
            "none";

        assignmentModal.style.display =
            "none";

        detailsModal.style.display =
            "none";

        historyModal.style.display =
            "none";


        /* SHOW LOGIN SCREEN */

        authScreen.style.display =
            "flex";
    }
);


/* =========================
   START APP
========================= */

renderAssignments();

checkAuth();
