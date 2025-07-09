const container = document.getElementById("medicine-container");

function fetchMedicines(email) {
  const container = document.getElementById("medicine-container");
  container.innerHTML = ""; // clear previous cards

  fetch(`http://localhost:5000/api/medicines/${email}`)
    .then((res) => res.json())
    .then((medicines) => {
      medicines.forEach((med) => {
        const card = document.createElement("div");
        card.className = "bg-white shadow rounded-lg p-6 w-full max-w-md";

        card.innerHTML = `
          <h2 class="text-xl font-semibold text-blue-600">${med.name}</h2>
          <p class="text-gray-700">🕒 Time: ${med.time}</p>
          <p class="text-gray-700">📅 Date: ${med.date}</p>
          <p class="text-gray-500 text-sm mt-2">👤 ${med.userEmail}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error fetching medicines:", err);
      container.innerHTML = `<p class="text-red-600">Failed to load reminders.</p>`;
    });
}


const form = document.getElementById("medicine-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const body = {
    name: formData.get("name"),
    time: formData.get("time"),
    date: formData.get("date"),
    userEmail: formData.get("userEmail")
  };

  try {
    const res = await fetch("http://localhost:5000/api/medicines/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Medicine added successfully!");
      form.reset();
      fetchMedicines(body.userEmail); // Fetch reminders for that user
    }
     else {
    alert("❌ Failed to add medicine: " + data.message);
  }
} catch (err) {
  console.error("POST error:", err);
  alert("❌ Server error");
}
});
