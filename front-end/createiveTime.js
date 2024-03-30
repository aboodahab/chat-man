function creativeTime(msgTime, ele, hours) {
  const OurTime = new Date();
  const msgString = `${msgTime}`;
  const ourString = `${OurTime}`;
  const re = /\d+/gi;

  let ourDay = ourString.match(re);
  let msgDay = msgString.match(re);
  if (msgTime.getHours() > 12) {
    hours = `${msgTime.getHours() - 12}:${addZero(msgTime.getMinutes())}pm`;
  }

  if (msgTime.getHours() < 12) {
    hours = `${msgTime.getHours()}:${addZero(msgTime.getMinutes())}am`;
  }
  if (msgTime.getHours() === 0) {
    hours = `12:${addZero(msgTime.getMinutes())}am`;
  }

  if (ourDay[0] > msgDay[0]) {
    ele.textContent = `${
      ourDay[0] - msgDay[0]
    } day ago ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}`;
  }
  if (ourDay[0] === msgDay[0]) {
    ele.textContent = `today ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}`;
  }
  if (OurTime.getMonth() > msgTime.getMonth()) {
    ele.textContent = `${
      OurTime.getMonth() - msgTime.getMonth()
    } month ago ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}:`;
  }
  ourDay[1], msgDay[1];
  if (ourDay[1] > msgDay[1]) {
    ele.textContent = `${
      ourDay[1] - msgDay[1]
    } year ago ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}:`;
  }
}
function addZero(minutes) {
  let min = ``;
  if (minutes < 10) {
    min = `0${minutes}`;

    return min;
  }
  return minutes;
}
export { addZero, creativeTime };
