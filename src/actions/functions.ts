import * as moment from "moment";

export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor;
    if (userAgent.match(/Android/i)) {
        return "Android";
    }

    if (userAgent.match(/iPhone|iPad|iPod/i)) {
        return "iOS";
    }
    return "unknown";
}


export function createTimeIntervals(format: string, hourDivider: number) {
  const startDate = moment().startOf("day");
  const dates = [];
  let t = hourDivider * 24;
  while (t--) {
    dates.push(startDate.format(format));
    startDate.add(60 / hourDivider, "minute");
  }
  return dates;
}

export function validatePhone(phone: string) {
  return (phone.charAt(0) === '+')
}

export function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password: string) {
  if(password){
    return password.length > 5;
  }
  return false;
}

export function validateName(name: string) {
  if(name){
    return name.split(' ').length > 0;
  }
  return false;
}

export function duplicateIndex(arr: Array<any>, property: string) {
  const tmpArr = [];
  for(let i = 0; i < arr.length; i++) {
    if(tmpArr.indexOf(arr[i][property]) < 0){ 
      tmpArr.push(arr[i][property]);
    } else {
      return i; // Duplicate value for property1 found
    }
  }
  return -1; // No duplicate values found for property1
}