// Sounds - howler;
var ringing = new Howl({
  src: ["alarm.mp3"],
  loop: true,
});

class Clock {
  constructor(hour_time, minute_time, second_time, day_night) {
    this.hour_time = hour_time;
    this.minute_time = minute_time;
    this.second_time = second_time;
    this.day_night = day_night;
    this.time_display = timeDisplay;

    this.amPm_alarm_time = "AM";
    this.second_alarm_time = "00";
    this.minute_alarm_time = "00";
    this.hour_alarm_time = "00";
    this.isDisabled = true;
    this.isSet = "off";
    this.alarmIsSet = false;
    this.on_off = document.createElement("div");
  }

  // Showing Time
  hours() {
    let getHours = this.date.getHours();
    if (getHours > 12) {
      getHours = getHours - 12;
      this.hour_time.textContent =
        getHours < 10 ? "0" + getHours + "  :" : getHours + "  :";
    } else {
      this.hour_time.textContent =
        getHours < 10 ? "0" + getHours + "  :" : getHours + "  :";
    }
    return getHours;
  }

  minutes() {
    this.minute_time.classList.remove("month");
    let getMinutes = this.date.getMinutes();
    this.minute_time.textContent =
      getMinutes <= 9 ? "0" + getMinutes + "  :" : getMinutes + "  :";

    return getMinutes;
  }

  seconds() {
    let getSeconds = this.date.getSeconds();
    this.second_time.textContent =
      getSeconds <= 9 ? "0" + getSeconds : getSeconds;

    return getSeconds;
  }

  dayOrNight() {
    let getHours = this.date.getHours();
    this.day_night.textContent = getHours >= 12 ? "PM" : "AM";
    return this.day_night.textContent;
  }

  showTime() {
    this.commonInTimeDate();
    flag = 0;
    this.callForTime();
    this.stopTime = setInterval(() => this.callForTime(), 1000);
  }

  // Show Date
  displayDate() {
    this.commonInTimeDate();
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

    let hour_val = document.querySelector(".custom-select-hour");
    let minu_val = document.querySelector(".custom-select-minute");
    let second_val = document.querySelector(".custom-select-second");
    let amPm_val = document.querySelector(".custom-select-ap");
    let onOff_val = document.querySelector("input[type='button']");

    hour_val.value = this.hour_alarm_time;
    minu_val.value = this.minute_alarm_time;
    second_val.value = this.second_alarm_time;
    amPm_val.value = this.amPm_alarm_time;
    onOff_val.disabled = this.isDisabled;
    onOff_val.value = this.isSet;

    onOff_val.style.marginBottom = "18px";
    onOff_val.style.marginLeft = "5px";
    onOff_val.style.marginRight = "5px";

    onOff_val.disabled = this.hour_alarm_time > 0 ? false : true;

    this.changeAlarmIcon(this.alarmIsSet);
    hour_val.addEventListener("change", () => {
      this.hour_alarm_time = hour_val.value;
      if (this.hour_alarm_time > 0) {
        onOff_val.disabled = false;
        onOff_val.value = "on";
        this.alarmIsSet = true;
        this.isSet = "on";
      } else {
        onOff_val.disabled = true;
        this.alarmIsSet = false;
        this.isSet = "off";
        this.stopTheSound();
        clearInterval(this.animClock);
      }
      if (onOff_val.disabled) {
        onOff_val.value = "off";
        this.stopTheSound();
        clearInterval(this.animClock);
      }
      this.changeAlarmIcon(this.alarmIsSet);
    });

    minu_val.addEventListener(
      "change",
      () => (this.minute_alarm_time = minu_val.value)
    );
    second_val.addEventListener(
      "change",
      () => (this.second_alarm_time = second_val.value)
    );
    amPm_val.addEventListener(
      "change",
      () => (this.amPm_alarm_time = amPm_val.value)
    );

    onOff_val.addEventListener("click", () => {
      if (onOff_val.value === "on") {
        onOff_val.value = "off";
        this.turnOnOff();
      } else {
        onOff_val.value = "on";
        this.alarmIsSet = true;
        this.isSet = "on";
      }
      if (onOff_val.disabled) {
        onOff_val.value = "off";
        this.turnOnOff();
      }
      this.changeAlarmIcon(this.alarmIsSet);
    });
  }

  changeAlarmIcon(isSet = false) {
    alarm.src = isSet
      ? "https://img.icons8.com/ios-glyphs/30/000000/alarm-on.png"
      : "https://img.icons8.com/pastel-glyph/64/000000/alarm-clock--v3.png";
  }

  playTheSound = () => ringing.play();

  stopTheSound = () => ringing.stop();

  animatedClock() {
    this.animClock = setInterval(() => {
      alarm.classList.add("shrinker");
      alarm.classList.toggle("expand");
    }, 200);
  }

  ringAlarm(h, m, s, dn) {
    if (this.isSet === "on") {
      if (
        parseInt(this.hour_alarm_time) === h &&
        parseInt(this.minute_alarm_time) === m &&
        +this.second_alarm_time === s &&
        this.amPm_alarm_time === dn
      ) {
        this.playTheSound();
        this.animatedClock();
      }
    }
  }

  alwaysRunning() {
    setInterval(() => {
      this.date = new Date();
      let getHours = this.date.getHours();
      let nightOrDay = getHours >= 12 ? "PM" : "AM";
      getHours = getHours > 12 ? getHours - 12 : getHours;
      this.ringAlarm(
        getHours,
        this.date.getMinutes(),
        this.date.getSeconds(),
        nightOrDay
      );
    }, 1000);
  }

  commonInTimeDate() {
    this.time_display.appendChild(this.on_off);
    this.time_display.removeChild(this.on_off);
    this.day_night.classList.remove("dayOrNight2");
    this.minute_time.classList.remove("minute2");
    this.second_time.classList.remove("second2");
    this.hour_time.classList.remove("hour2");
  }

  callForTime() {
    this.date = new Date();
    this.hours();
    this.minutes();
    this.seconds();
    this.dayOrNight();
  }

  turnOnOff() {
    this.alarmIsSet = false;
    this.isSet = "off";
    this.stopTheSound();
    clearInterval(this.animClock);
  }
}

let alarmClock = new Clock(hours, minutes, seconds, dayOrNight);
alarmClock.showTime();
alarmClock.alwaysRunning();

time.addEventListener("click", () => {
  if (flag === 1) alarmClock.showTime();
});

date.addEventListener("click", () => alarmClock.displayDate());

alarm.addEventListener("click", () => alarmClock.setAlarm());
