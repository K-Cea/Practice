const API_URL = "http://localhost:3000/api";

const statusText = document.getElementById("status");
const recordForm = document.getElementById("recordForm");
const nameInput = document.getElementById("nameInput");
const recordList = document.getElementById("recordList");

// Check whether the backend is running
async function checkBackend() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = await response.json();
    statusText.textContent = data.message;
  } catch (error) {
    statusText.textContent = "Backend is not running.";
  }
}

// Load records from backend
async function loadRecords() {
  try {
    const response = await fetch(`${API_URL}/records`);
    const records = await response.json();

    recordList.innerHTML = "";

    records.forEach((record) => {
      const li = document.createElement("li");
      li.textContent = record.name;
      recordList.appendChild(li);
    });
  } catch (error) {
    recordList.innerHTML = "<li>Could not load records.</li>";
  }
}

// Add a record
recordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (!name) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    nameInput.value = "";
    loadRecords();
  } catch (error) {
    alert("Could not connect to the backend.");
  }
});

checkBackend();
loadRecords();