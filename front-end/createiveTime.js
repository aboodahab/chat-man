function creativeTime(time, ele) {
  let msgTime = new Date(time);

  const OurTime = new Date();
  const msgString = `${msgTime}`;
  const ourString = `${OurTime}`;
  const re = /\d+/gi;
  let hours = "";
  let ourDay = ourString.match(re);
  let msgDay = msgString.match(re);
  console.log(msgTime.getHours());
  if (msgTime.getHours() > 12) {
    hours = `${msgTime.getHours() - 12}:${addZero(msgTime.getMinutes())}pm`;
    console.log(hours);
  }
  if (msgTime.getHours() === 12) {
    hours = `${msgTime.getHours()}:${addZero(msgTime.getMinutes())}pm`;
    console.log(hours);
  }
  if (msgTime.getHours() < 12) {
    hours = `${msgTime.getHours()}:${addZero(msgTime.getMinutes())}am`;
    console.log(hours, "l");
  }
  if (msgTime.getHours() === 0) {
    hours = `12:${addZero(msgTime.getMinutes())}am`;
    console.log(hours, ":k");
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

  if (ourDay[1] > msgDay[1]) {
    ele.textContent = `${
      ourDay[1] - msgDay[1]
    } year ago ${msgTime.getFullYear()}/${
      msgTime.getMonth() + 1
    }/${msgTime.getDate()} ${hours}:`;
  }
}
let min = ``;
function addZero(minutes) {
  console.log(minutes);
  if (minutes < 10) {
    min = `0${minutes}`;
    console.log(min, minutes);
    return min;
  }
  console.log(min, minutes);
  return minutes;
}
export { addZero, creativeTime };
