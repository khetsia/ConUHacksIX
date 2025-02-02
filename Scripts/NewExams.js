
var ExamList = [];


class NewExam{
    constructor(examDate, examTime, examDifficulty, examName){
        this.examDate = examDate;
        this.examTime = examTime;
        this.examDifficulty = examDifficulty;
        this.examName = examName;
    }
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevents form from refreshing the page

    let examDate = document.getElementById("ExamDate").value;
    let examTime = document.getElementById("ExamTime").value;
    let examName = document.getElementById("input").value;
    
    // Get selected difficulty rating
    //let examDifficulty = document.querySelector('input[name="star-radio"]:checked').value;

    let newExam = new NewExam(examDate, examTime, 5, examName);
    ExamList.push(newExam);

    let examListDiv = document.getElementById("list");
    let examDiv = document.createElement("div");
    examDiv.className = "exam-item";
    examDiv.innerHTML = `
        <p><strong>Name:</strong> ${newExam.examName}</p>
        <p><strong>Date:</strong> ${newExam.examDate}</p>
        <p><strong>Time:</strong> ${newExam.examTime}</p>
        <p><strong>Difficulty:</strong> ${5}</p>
    `;

    examListDiv.appendChild(examDiv);
});
