const questions = {
  frontend: [
    { skill: "HTML", question: "Do you know HTML basics?" },
    { skill: "CSS", question: "Can you style pages using CSS?" },
    { skill: "JavaScript", question: "Do you know JavaScript programming?" },
    { skill: "React", question: "Have you worked with React framework?" }
  ],
  backend: [
    { skill: "Node.js", question: "Do you have experience with Node.js?" },
    { skill: "Express", question: "Can you build APIs using Express?" },
    { skill: "MongoDB", question: "Do you know about MongoDB database?" },
    { skill: "Authentication", question: "Do you know how to handle authentication?" }
  ],
  dataanalyst: [
    { skill: "Python", question: "Are you familiar with Python programming?" },
    { skill: "Excel", question: "Can you use Excel for data analysis?" },
    { skill: "SQL", question: "Do you know SQL for database querying?" },
    { skill: "Power BI", question: "Can you create dashboards using Power BI?" }
  ]
};

const youtubeLinks = {
  "HTML": "https://www.youtube.com/results?search_query=learn+HTML+for+beginners",
  "CSS": "https://www.youtube.com/results?search_query=learn+CSS+for+beginners",
  "JavaScript": "https://www.youtube.com/results?search_query=learn+JavaScript",
  "React": "https://www.youtube.com/results?search_query=learn+React+for+beginners",
  "Node.js": "https://www.youtube.com/results?search_query=learn+Node.js",
  "Express": "https://www.youtube.com/results?search_query=learn+Express+framework",
  "MongoDB": "https://www.youtube.com/results?search_query=learn+MongoDB",
  "Authentication": "https://www.youtube.com/results?search_query=learn+user+authentication",
  "Python": "https://www.youtube.com/results?search_query=learn+Python",
  "Excel": "https://www.youtube.com/results?search_query=learn+Excel+for+data+analysis",
  "SQL": "https://www.youtube.com/results?search_query=learn+SQL",
  "Power BI": "https://www.youtube.com/results?search_query=learn+Power+BI"
};

let selectedRole = "";
let currentQuestion = 0;
let answers = [];

const startBtn = document.getElementById("startBtn");
const roleSelect = document.getElementById("role");
const questionContainer = document.getElementById("questionContainer");
const resultContainer = document.getElementById("resultContainer");
const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const summaryEl = document.getElementById("summary");
const recommendationsEl = document.getElementById("recommendations");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", () => {
  selectedRole = roleSelect.value;
  if (!selectedRole) {
    alert("Please select a role to start.");
    return;
  }
  startAssessment();
});

function startAssessment() {
  startBtn.classList.add("hidden");
  roleSelect.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  currentQuestion = 0;
  answers = [];
  showQuestion();
}

function showQuestion() {
  const q = questions[selectedRole][currentQuestion];
  questionEl.textContent = q.question;
}

yesBtn.addEventListener("click", () => handleAnswer(true));
noBtn.addEventListener("click", () => handleAnswer(false));

function handleAnswer(isYes) {
  const skill = questions[selectedRole][currentQuestion].skill;
  if (isYes) answers.push(skill);
  currentQuestion++;

  if (currentQuestion < questions[selectedRole].length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const requiredSkills = questions[selectedRole].map(q => q.skill);
  const missingSkills = requiredSkills.filter(s => !answers.includes(s));

  if (missingSkills.length === 0) {
    summaryEl.textContent = `🎉 Great job! You are well-qualified for the ${selectedRole.replace(/([A-Z])/g, ' $1')} role.`;
  } else {
    summaryEl.textContent = `You are partially ready for the ${selectedRole} role. You need to develop these skills:`;
  }

  recommendationsEl.innerHTML = "";
  missingSkills.forEach(skill => {
    const link = youtubeLinks[skill];
    recommendationsEl.innerHTML += `<p>📘 <strong>${skill}</strong> → <a href="${link}" target="_blank">Learn on YouTube</a></p>`;
  });
}

restartBtn.addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  startBtn.classList.remove("hidden");
  roleSelect.classList.remove("hidden");
});
