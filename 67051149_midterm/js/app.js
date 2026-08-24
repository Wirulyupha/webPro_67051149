// Initial Mock Data Structure
const initialEvents = [
  {
    id: 1,
    title: "Modern JavaScript & ES6+ Workshop",
    category: "Tech",
    speaker: "Dr. Somchai Dev",
    date: "2026-09-15",
    seats: 5,
    description: "เจาะลึกการใช้งาน JavaScript ยุคใหม่ อธิบายเรื่อง Async/Await, Closure และ Modules",
    isRegistered: false
  },
  {
    id: 2,
    title: "UX/UI Design System Creation",
    category: "Design",
    speaker: "Aj. Ananya Design",
    date: "2026-09-20",
    seats: 0,
    description: "การสร้าง Design System สำหรับองค์กรขนาดใหญ่ด้วย Figma และการเชื่อมต่อกับ CSS",
    isRegistered: false
  },
  {
    id: 3,
    title: "Startup Pitching & Funding 101",
    category: "Business",
    speaker: "Khun Vorapat VC",
    date: "2026-09-25",
    seats: 12,
    description: "เทคนิคการนำเสนอแผนธุรกิจเพื่อระดมทุนสำหรับนักศึกษาสายเทคโนโลยี",
    isRegistered: false
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for Web Apps",
    category: "Tech",
    speaker: "Dr. Prasit Security",
    date: "2026-10-01",
    seats: 8,
    description: "เรียนรู้ช่องโหว่พื้นฐาน OWASP Top 10 และแนวทางการป้องกันบน Web Front-end",
    isRegistered: false
  }
];

// App State
let events = [];

const searchInput = document.getElementById("search-input");
const activitySelect = document.getElementById("activity");
const sortSelect = document.getElementById("sort");
const resetBtn = document.querySelector('button[type="reset"]');
const darkModeBtn = document.querySelector('nav button:first-child');
const adminForm = document.getElementById("adminForm");

function updateDashboard(currentList) {
    let totalEvents = currentList.length;
    let registeredEvents = 0;
    let totalAvailableSeats = 0;

    for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].isRegistered) {
            registeredEvents++;
        }
        totalAvailableSeats += currentList[i].seats;
    }

    const asideParagraphs = document.querySelectorAll("aside p");
    if (asideParagraphs.length >= 3) {
        asideParagraphs[0].textContent = "กิจกรรมทั้งหมด: " + totalEvents;
        asideParagraphs[1].textContent = "ลงทะเบียนแล้ว: " + registeredEvents;
        asideParagraphs[2].textContent = "ที่นั่งว่างรวม: " + totalAvailableSeats;
    }
}

function renderEvents(list) {
    const container = document.getElementById("eventsContainer");
    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>ไม่พบข้อมูลกิจกรรมที่ค้นหา</p>";
        updateDashboard(list);
        return;
    }

    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let card = document.createElement("div");
        card.className = "event-card";

        let btnText = "ลงทะเบียน (Register)";
        let isDisabled = false;

        if (item.isRegistered) {
            btnText = "ลงทะเบียนแล้ว";
            isDisabled = true;
        } else if (item.seats <= 0) {
            btnText = "ที่นั่งเต็ม";
            isDisabled = true;
        }

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>ประเภท:</strong> ${item.category}</p>
            <p><strong>วิทยากร:</strong> ${item.speaker}</p>
            <p><strong>วันที่:</strong> ${item.date}</p>
            <p><strong>ที่นั่งคงเหลือ:</strong> ${item.seats}</p>
            <p>${item.description}</p>
            <button class="reg-btn" ${isDisabled ? "disabled" : ""}>${btnText}</button>
        `;

        let btn = card.querySelector(".reg-btn");
        btn.addEventListener("click", function() {
            registerEvent(item.id);
        });

        container.appendChild(card);
    }

    updateDashboard(list);
}

function filterAndSortEvents() {
    let text = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let cat = activitySelect ? activitySelect.value : "";
    let sort = sortSelect ? sortSelect.value : "";

    let result = events.filter(function(item) {
        let matchText = item.title.toLowerCase().includes(text) || 
                         item.speaker.toLowerCase().includes(text);
        
        let matchCat = true;
        if (cat === "BU") matchCat = (item.category === "Business" || item.category === "BU");
        else if (cat === "Tech") matchCat = (item.category === "Tech");
        else if (cat === "DS") matchCat = (item.category === "Design" || item.category === "DS");
        else if (cat !== "") matchCat = (item.category === cat);

        return matchText && matchCat;
    });

    if (sort === "Date" || sort === "Low-High") {
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === "Seats") {
        result.sort((a, b) => b.seats - a.seats);
    } else if (sort === "High-Low") {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderEvents(result);
}

function registerEvent(id) {
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
            if (events[i].seats > 0 && !events[i].isRegistered) {
                events[i].seats -= 1;
                events[i].isRegistered = true;
                saveData();
                filterAndSortEvents(); 
            }
            break;
        }
    }
}

function saveData() {
    localStorage.setItem("eventsData", JSON.stringify(events));
}

function resetData() {
    localStorage.removeItem("eventsData");
    events = JSON.parse(JSON.stringify(initialEvents));
    saveData();

    if (searchInput) searchInput.value = "";
    if (activitySelect) activitySelect.value = "";
    if (sortSelect) sortSelect.value = "";

    filterAndSortEvents();
}

function initApp() {
    let getLocal = localStorage.getItem("eventsData");
    if (getLocal) {
        events = JSON.parse(getLocal);
    } else {
        events = JSON.parse(JSON.stringify(initialEvents));
        saveData();
    }

    if (searchInput) searchInput.addEventListener("input", filterAndSortEvents);
    if (activitySelect) activitySelect.addEventListener("change", filterAndSortEvents);
    if (sortSelect) sortSelect.addEventListener("change", filterAndSortEvents);

    if (resetBtn) {
        resetBtn.addEventListener("click", resetData);
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
        });
    }

    if (adminForm) {
        adminForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let newObj = {
                id: Date.now(),
                title: document.getElementById("name-input").value,
                category: document.getElementById("event-type").value,
                speaker: document.getElementById("speaker-input").value,
                date: document.getElementById("event-date").value,
                seats: parseInt(document.getElementById("event-seats").value),
                description: document.getElementById("event-description").value,
                isRegistered: false
            };
            events.push(newObj);
            saveData();
            filterAndSortEvents();
            adminForm.reset();
        });
    }

    filterAndSortEvents();
}
// Run Application
document.addEventListener("DOMContentLoaded", initApp);