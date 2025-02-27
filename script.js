const calenderHeader = document.getElementById("calender-header");
const dateHeader = document.getElementById("date-header");
const weekDateHeader = document.getElementById("week-date");
const calender = document.getElementById("calender");
const prevYearBtn = document.getElementById("prev-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextYearBtn = document.getElementById("next-year");
const nextMonthBtn = document.getElementById("next-month");
const daySelected = document.getElementById("day-selection");
const monthSelected = document.getElementById("month-selection");
const yearInput = document.getElementById("year");
const confirmBtn = document.getElementById("confirm-button");
const todayDateBtn = document.getElementById("today-date-button");

let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let currentDate = today.getDate();

let exDate = new Date(currentYear, currentMonth, currentDate);

// Get day in week by convert from getDay() number
const daysOfWeek = [
  "Chủ nhật - Sunday",
  "Thứ 2 - Monday",
  "Thứ 3 - Tuesday",
  "Thứ 4 - Wednesday",
  "Thứ 5 - Thursday",
  "Thứ 6 - Friday",
  "Thứ 7 - Saturday",
];

function getWeekDay(day) {
  return daysOfWeek[day] || "";
}

// Default context
calenderHeader.textContent = `Tháng ${currentMonth + 1} năm ${currentYear}`;
dateHeader.textContent = currentDate;
weekDateHeader.textContent = getWeekDay(today.getDay());

// Get Number of days in selected month
function getNumberOfDaysInMonth(month, year) {
  let days = [];
  let totalDays = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
}

// Get current and change calender
function getCurrentCalender(month, year) {
  // Clear table context
  calender.innerHTML = "";

  const numberOfDay = getNumberOfDaysInMonth(month, year);

  // Emty (days in prev month) box
  for (let i = 0; i < numberOfDay[0].getDay(); i++) {
    let daysBefore = document.createElement("div");
    daysBefore.className = "day-card";
    daysBefore.textContent = "";
    calender.appendChild(daysBefore);
  }

  // All days
  numberOfDay.map((e) => {
    let dateDiv = document.createElement("div");
    dateDiv.className = "day-card date";
    dateDiv.textContent = e.getDate();

    // Change date
    dateDiv.addEventListener("click", () => {
      changeDate(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
      exDate.setDate(e.getDate());
      getCurrentCalender(e.getMonth(), e.getFullYear());
    });

    if (e.getDate() === exDate.getDate())
      dateDiv.style.backgroundColor = "yellowgreen";

    calender.appendChild(dateDiv);
  });
}

// Change header context
function changeDate(time) {
  calenderHeader.textContent = `Tháng ${
    time.getMonth() + 1
  } năm ${time.getFullYear()}`;
  dateHeader.textContent = time.getDate();
  weekDateHeader.textContent = getWeekDay(time.getDay());
}

// Minus one year
function decreaseOneYear(e) {
  exDate.setFullYear(e.getFullYear() - 1);
  changeDate(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
  getCurrentCalender(e.getMonth(), e.getFullYear());
}

// Minus one month
function decreaseOnMonth(e) {
  // If current month is January, it will automatically switch-back previous year
  if (exDate.getMonth() === 0) {
    exDate.setMonth(11);
    exDate.setFullYear(e.getFullYear() - 1);
  } else {
    exDate.setMonth(e.getMonth() - 1);
  }

  changeDate(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
  getCurrentCalender(e.getMonth(), e.getFullYear());
}

// Add one month
function increaseOneMonth(e) {
  // In case currentMonth > 12 months, it will automatically become new year
  if (exDate.getMonth() < 12) {
    exDate.setMonth(e.getMonth() + 1);
  } else {
    exDate.setMonth(0);
    exDate.setFullYear(e.getFullYear() + 1);
  }

  changeDate(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
  getCurrentCalender(e.getMonth(), e.getFullYear());
}

// Add one year
function increaseOneYear(e) {
  exDate.setFullYear(e.getFullYear() + 1);
  changeDate(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
  getCurrentCalender(e.getMonth(), e.getFullYear());
}

// Find exact date
function dateSelector() {
  exDate = new Date(
    Number(yearInput.value),
    Number(monthSelected.value) - 1,
    Number(daySelected.value)
  );

  // In case The date been found does not exist
  if (
    Number(daySelected.value) >
    new Date(Number(yearInput.value), Number(monthSelected.value), 0).getDate()
  ) {
    alert(
      "The date you found does not exist, please try another date and time!"
    );
  } else {
    changeDate(exDate);
    getCurrentCalender(exDate.getMonth(), exDate.getFullYear());
  }
}

// Reset to current day
function currentTime() {
  exDate = new Date();
  changeDate(exDate);
  getCurrentCalender(exDate.getMonth(), exDate.getFullYear());
}

// Event
prevYearBtn.addEventListener("click", () => decreaseOneYear(exDate));

prevMonthBtn.addEventListener("click", () => decreaseOnMonth(exDate));

nextMonthBtn.addEventListener("click", () => increaseOneMonth(exDate));

nextYearBtn.addEventListener("click", () => increaseOneYear(exDate));

yearInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") dateSelector();
});
confirmBtn.addEventListener("click", () => dateSelector());

todayDateBtn.addEventListener("click", () => currentTime());

// Create option for Navigation
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");
  option.textContent = i;
  daySelected.appendChild(option);
}

for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option");
  option.textContent = i;
  monthSelected.appendChild(option);
}

getCurrentCalender(exDate.getMonth(), exDate.getFullYear());
