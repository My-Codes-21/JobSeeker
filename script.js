let currentRole = '';
let jobs = [];

function setRole(role) {
  currentRole = role;
  showScreen('authScreen');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if (id === 'labourScreen') renderJobs();
  if (id === 'clientScreen') renderClientJobs();
}

function signIn() {
  const email = document.getElementById("signInEmail").value.trim();
  if (!/\S+@\S+\.\S+/.test(email)) return alert("Invalid Email");
  showScreen(currentRole === 'client' ? 'clientScreen' : 'labourScreen');
}

function signUp() {
  const name = document.getElementById("signUpName").value.trim();
  const age = parseInt(document.getElementById("signUpAge").value);
  const loc = document.getElementById("signUpLocation").value.trim();
  const email = document.getElementById("signUpEmail").value.trim();

  if (!name || !age || !loc || !email) return alert("All fields required");
  if (age < 18 || age > 50) return alert("Age must be between 18–50");
  if (!/\S+@\S+\.\S+/.test(email)) return alert("Invalid Email");

  showScreen(currentRole === 'client' ? 'clientScreen' : 'labourScreen');
}

function addJob() {
  const type = document.getElementById("jobType").value;
  const desc = document.getElementById("jobDescription").value.trim();
  const loc = document.getElementById("jobLocation").value.trim();
  const wage = document.getElementById("jobWage").value;
  const phone = document.getElementById("jobPhone").value.trim();

  if (!type || !desc || !loc || !wage || !phone) return alert("All fields required");
  if (!/^\d{10}$/.test(phone)) return alert("Phone must be 10 digits");

  jobs.push({ type, desc, loc, wage: `${wage} Rs`, phone });
  renderClientJobs();
}

function renderClientJobs() {
  const list = document.getElementById("jobList");
  list.innerHTML = '';
  jobs.forEach((job, index) => {
    list.innerHTML += `
      <div class="job">
        <strong>${job.type}</strong> - ${job.loc}<br>
        ${job.desc}<br>
        ${job.wage} | ${job.phone}
        <br><button onclick="deleteJob(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteJob(index) {
  jobs.splice(index, 1);
  renderClientJobs();
}

function renderJobs() {
  const list = document.getElementById("availableJobs");
  list.innerHTML = '';
  if (jobs.length === 0) {
    list.innerHTML = "<p>No jobs posted yet.</p>";
    return;
  }
  jobs.forEach(job => {
    list.innerHTML += `
      <div class="job">
        <strong>${job.type}</strong> - ${job.loc}<br>
        ${job.desc}<br>
        ${job.wage} | ${job.phone}
      </div>
    `;
  });
}
