const datePickerElement = document.querySelector('.date-picker');
const selectedDateElement = document.querySelector(
  '.date-picker .selected-date'
);
const datesElement = document.querySelector('.date-picker .dates');
const mthElement = document.querySelector('.date-picker .dates .month .mth');
const nextMonthElement = document.querySelector(
  '.date-picker .dates .month .next-month'
);
const prevMonthElement = document.querySelector(
  '.date-picker .dates .month .prev-month'
);

const daysElement = document.querySelector('.date-picker .dates .days');

const months = [
  'Ianuarie',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie',
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

// Current Month & Year
mthElement.textContent = months[month] + ' ' + year;
selectedDateElement.textContent = formatDate(date);
selectedDateElement.dataset.value = selectedDate;

// Populate calendar with days

populateDates();

// EVENT LISTENERS

datePickerElement.addEventListener('click', toggleDatePicker);
nextMonthElement.addEventListener('click', goToNextMonth);
prevMonthElement.addEventListener('click', goToPrevMonth);

// FUNCTIONS

function toggleDatePicker(e) {
  // console.log(e.path, 'Test');
  if (!checkEventPathForClass(e.path, 'dates')) {
    datesElement.classList.toggle('active');
  }
}

function goToNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mthElement.textContent = months[month] + ' ' + year;
  // Update calendar when going to next month, depending on the number of day of the next month
  populateDates();
}

function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mthElement.textContent = months[month] + ' ' + year;
  // Update calendar when going to previous month, depending on the number of day of the pevious month
  populateDates();
}

function populateDates(e) {
  daysElement.innerHTML = '';

  // Check days in each month
  let amountDays = 0;
  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
    amountDays = 31;
  } else if (month == 1 && year % 4 === 0) {
    amountDays = 29;
  } else if (month == 1 && year % 4 !== 0) {
    amountDays = 28;
  } else {
    amountDays = 30;
  }

  // Get days in calendar (from 1 to max 31, depending on the month)
  for (let i = 0; i < amountDays; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = i + 1;

    // Apply class of 'selected' to tehe current day in the calendar
    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      dayElement.classList.add('selected');
    }
    // Change the day when we click on another date in the calendar
    dayElement.addEventListener('click', function () {
      selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selecedYear = year;
      // Update date in the selctedDateElement when we click on another date in the calendar
      selectedDateElement.textContent = formatDate(selectedDate);
      selectedDateElement.dataset.value = selectedDate;

      // Update the selected date in the calendar
      populateDates();
    });
    daysElement.appendChild(dayElement);
  }
}

// HELPER FUNCTIONS

function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let year = d.getFullYear();

  return day + ' / ' + month + ' / ' + year;
}
