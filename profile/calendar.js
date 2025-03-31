document.addEventListener("DOMContentLoaded", async function () {
    const holidayContainer = document.querySelector(".holiday-list");
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    async function fetchCalendarData(year, month) {
        try {
            let response = await fetch(`fetch_calendar_data.php?year=${year}&month=${month + 1}`);
            let data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching calendar data:", error);
            return { holidays: [], appointments: {}, fullyBooked: [] };
        }
    }

    async function renderCalendar(month, year) {
        calendar.innerHTML = "";
        monthYear.innerText = `${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}`;
    
        let data = await fetchCalendarData(year, month);
        let holidays = data.holidays || [];
        let appointments = data.appointments || {};
        let fullyBooked = data.fullyBooked || [];
    
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let today = new Date();
        let todayString = today.toISOString().split("T")[0];
    
        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty");
            calendar.appendChild(emptyDiv);
        }
    
        for (let i = 1; i <= daysInMonth; i++) {
            let date = new Date(year, month, i);
            let dateString = date.toISOString().split("T")[0];
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
    
            const dayText = document.createElement("span");
            dayText.innerText = i;
            dayDiv.appendChild(dayText);
    
            if (date < today) {
                dayDiv.classList.add("empty"); // Mark past dates as empty
            } else {
                let holiday = holidays.find(h => h.date === dateString);
                if (holiday) {
                    dayDiv.classList.add("holidays");
                    dayDiv.innerHTML += `<br><small>${holiday.description}</small>`;
                } else if (fullyBooked.includes(dateString)) {
                    dayDiv.classList.add("fully-booked");
                    dayDiv.innerHTML += "<br><small>Fully Booked</small>";
                } else if (appointments[dateString] !== undefined) {
                    let slotsRemaining = appointments[dateString];
                    dayDiv.classList.add("available");
                    dayDiv.setAttribute("data-date", dateString);
                    dayDiv.innerHTML += `<br><small>${slotsRemaining} slots</small>`;
                }
            }
            calendar.appendChild(dayDiv);
        }
    
        attachDayClickListeners(holidays);
    }
    
    
    function attachDayClickListeners(holidays) {
        document.querySelectorAll(".available").forEach(day => {
            let selectedDate = day.getAttribute("data-date");
            if (!holidays.some(holiday => holiday.date === selectedDate)) { // ✅ Proper holiday check
                day.addEventListener("click", function () {
                    localStorage.setItem("selectedDate", selectedDate);
                    document.querySelector(".book-date").innerText = formatDate(selectedDate);
                    fetchTimeSlots(selectedDate);
                    document.getElementById("book-appointment").style.display = "block";
                });
            }
        });
    }

    function formatDate(dateString) {
        let date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    prevMonthBtn.addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // ✅ Initial render
    await renderCalendar(currentMonth, currentYear);

    // ✅ Fetch holidays only ONCE
    fetchHolidays();
});

function fetchHolidays() {
    fetch("fetch_calendar_data.php")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Holidays:", data.holidays); // Debugging

            let holidayList = document.querySelector(".holiday-container1 .holiday-list");

            if (!holidayList) {
                console.error("Holiday list container not found!");
                return;
            }

            holidayList.innerHTML = "";

            if (!data.holidays || data.holidays.length === 0) {
                holidayList.innerHTML = `<div class="holiday-item">No holidays found.</div>`;
                return;
            }

            data.holidays.forEach(holiday => {
                let holidayDate = new Date(holiday.date);
                let monthName = holidayDate.toLocaleString("default", { month: "long" }).toUpperCase();
                let day = holidayDate.getDate();
                let formattedHoliday = `${monthName} ${day} - ${holiday.description}`;

                let holidayItem = document.createElement("div");
                holidayItem.classList.add("holiday-item");
                holidayItem.innerText = formattedHoliday;
                holidayList.appendChild(holidayItem);
            });
        })
        .catch(error => console.error("Error fetching holidays:", error));
}
