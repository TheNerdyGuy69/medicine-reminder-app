const container = document.getElementById("medicine-container");

fetch("http://localhost:5000/api/medicines/sahilgadakh72@gmail.com")
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
