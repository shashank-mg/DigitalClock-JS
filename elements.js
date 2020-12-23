let timeDisplay = document.querySelector(".time-display");
let hours = document.querySelector(".hour");
let minutes = document.querySelector(".minute");
let seconds = document.querySelector(".second");
let dayOrNight = document.querySelector(".dayOrNight");
let time = document.querySelector(".time");
let date = document.querySelector(".date");
let alarm = document.querySelector(".set-alarm");
let flag = 0;
let i = 1;
let j = 1;
let count = "";
let a_count = "";
let num = "";

while (i < 60) {
  if (String(i).length < 2) num = "0" + i;
  else num = i;
  while (j < 13) {
    a_count += ` <option value="${num}">${num}</option> `;
    j++;
    break;
  }
  count += ` <option value="${num}">${num}</option> `;
  num = "";
  i++;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let choose_hour =
  `
    <div class="input-group mb-3">
      <div class="input-group-append">
      <label class="input-group-text" for="inputGroupSelect01" style="font-family:'Nunito SemiBold';">
      Hours
      </label>
    </div>
    <select class="custom-select-hour"  id="inputGroupSelect01">
      <option selected value='00'>00</option>
      ` +
  a_count +
  ` </select>
    </div>`;

let choose_minute =
  `<div class="input-group mb-3">
      <div class="input-group-append">
      <label class="input-group-text" for="inputGroupSelect01" style="font-family:'Nunito SemiBold';">
      Minute
      </label>
    </div>
      <select class="custom-select-minute" id="inputGroupSelect01">
      <option value="00" selected>00</option>
      ` +
  count +
  `</select>
    </div>`;

let choose_second =
  ` <div class="input-group mb-3">
    <div class="input-group-append">
    <label class="input-group-text" for="inputGroupSelect01" style="font-family:'Nunito SemiBold';">
     Second
    </label>
    </div>
    <select class="custom-select-second" id="inputGroupSelect01">
    <option value="00" selected>00</option>
  ` +
  count +
  `</select>
  </div>`;

let onOrOff = `
  <input class='btn' type="button" name="" value="off">
`;

let amOrPm = `<div class="input-group mb-3">
      <div class="input-group-append">
      <label class="input-group-text" for="inputGroupSelect01" style="font-family:'Nunito SemiBold';">
      AM/PM
      </label>
    </div>
    <select class="custom-select-ap" id="inputGroupSelect01">
      <option value="AM" selected>AM</option>
      <option value="PM">PM</option>
    </select>
    </div>`;
