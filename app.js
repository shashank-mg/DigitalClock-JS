let onOroff = document.createElement("div");
let timeDisplay = document.querySelector(".time-display");
let hours = document.querySelector(".hour");
let minutes = document.querySelector(".minute");
let seconds = document.querySelector(".second");
let dayOrNight = document.querySelector(".dayOrNight");
let time = document.querySelector(".time");
let date = document.querySelector(".date");
let alarm = document.querySelector(".set-alarm");
let flag = 0;

class Clock {
  constructor(hour_time, minute_time, second_time, day_night) {
    this.hour_time = hour_time;
    this.minute_time = minute_time;
    this.second_time = second_time;
    this.day_night = day_night;
    this.time_display = timeDisplay;
    this.on_off = onOroff;
  }

  // Showing Time
  hours() {
    let getHours = this.date.getHours();
    if (getHours > 12) {
      if (getHours.length < 2) {
        this.hour_time.textContent = "0" + getHours;
      } else {
        this.hour_time.textContent = getHours - 12;
      }
    } else {
      if (getHours.length < 2) {
        this.hour_time.textContent = "0" + getHours;
      } else {
        this.hour_time.textContent = getHours;
      }
    }
  }

  minutes() {
    this.minute_time.classList.remove("month");
    let getMinutes = this.date.getMinutes();
    if (getMinutes <= 9) {
      this.minute_time.textContent = "0" + getMinutes;
    } else {
      this.minute_time.textContent = getMinutes;
    }
  }

  seconds() {
    let getSeconds = this.date.getSeconds();
    if (getSeconds <= 9) {
      this.second_time.textContent = "0" + getSeconds;
    } else {
      this.second_time.textContent = getSeconds;
    }
  }

  dayOrNight() {
    // this.day_night.classList.remove("dayOrNight2");
    let getHours = this.date.getHours();
    if (getHours >= 12) {
      this.day_night.textContent = "PM";
    } else {
      this.day_night.textContent = "AM";
    }
  }

  showTime() {
    this.day_night.classList.remove("dayOrNight2");
    this.minute_time.classList.remove("minute2");
    this.second_time.classList.remove("second2");
    this.hour_time.classList.remove("hour2");

    flag = 0;
    this.date = new Date();
    this.hours();
    this.minutes();
    this.seconds();
    this.dayOrNight();

    this.stopTime = setInterval(() => {
      this.date = new Date();
      this.hours();
      this.minutes();
      this.seconds();
      this.dayOrNight();
    }, 1000);
  }

  // Show Date
  displayDate() {
    this.day_night.classList.remove("dayOrNight2");
    this.minute_time.classList.remove("minute2");
    this.second_time.classList.remove("second2");
    this.hour_time.classList.remove("hour2");
    flag = 1;

    clearInterval(this.stopTime);
    this.date = new Date();
    this.hour_time.textContent = this.date.getDate();
    this.minute_time.textContent = months[this.date.getMonth() - 1];
    this.minute_time.classList.add("month");

    this.second_time.textContent = this.date.getFullYear();
    this.day_night.textContent = days[this.date.getDay() - 1];
  }

  // Set Alarm
  setAlarm() {
    this.time_display.appendChild(this.on_off);
    this.minute_time.classList.remove("month");

    this.day_night.classList.add("dayOrNight2");
    this.minute_time.classList.add("minute2");
    this.second_time.classList.add("second2");
    this.hour_time.classList.add("hour2");

    clearInterval(this.stopTime);
    flag = 1;

    this.hour_time.innerHTML = choose_hour;
    this.minute_time.innerHTML = choose_minute;
    this.second_time.innerHTML = choose_second;
    this.day_night.innerHTML = amOrPm;
    this.on_off.innerHTML = onOrOff;

    this.on_off.style.marginRight = "10px";
  }
}

let alaramClock = new Clock(hours, minutes, seconds, dayOrNight);
alaramClock.showTime();

time.addEventListener("click", () => {
  if (flag === 1) alaramClock.showTime();
});

date.addEventListener("click", () => alaramClock.displayDate());

alarm.addEventListener("click", () => alaramClock.setAlarm());
