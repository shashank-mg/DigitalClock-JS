let hours = document.querySelector(".hour");
let minutes = document.querySelector(".minute");
let seconds = document.querySelector(".second");
let dayOrNight = document.querySelector(".dayOrNight");

class Clock {
  constructor(hour_time, minute_time, second_time, day_night) {
    this.hour_time = hour_time;
    this.minute_time = minute_time;
    this.second_time = second_time;
    this.day_night = day_night;
  }

  hours() {
    let getHours = this.date.getHours();
    if (getHours > 12) {
      if (getHours.length < 2) {
        this.hour_time.textContent = "0" + getHours;
      } else {
        this.hour_time.textContent = "0" + (getHours - 12);
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
    let getHours = this.date.getHours();
    if (getHours > 12) {
      this.day_night.textContent = "PM";
    } else {
      this.day_night.textContent = "AM";
    }
  }

  showTime() {
    setInterval(() => {
      this.date = new Date();
      this.hours();
      this.minutes();
      this.seconds();
      this.dayOrNight();
    }, 1000);
  }
}

let alaramClock = new Clock(hours, minutes, seconds, dayOrNight);
alaramClock.showTime();
