import * as moment from "moment";
import { IMPDTreeNode } from "../mpd-library/";

export function AbrNum(num: any, decPlaces: number) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate num abbreviations
  const abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);

    // If the num is bigger or equal do the abbreviation
    if (size <= num) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      num = Math.round(num * decPlaces / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (num === 1000 && i < abbrev.length - 1) {
        num = 1;
        i++;
      }

      // Add the letter for the abbreviation
      num += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return num;
}

export function convertUTCToDate(date: string) {
  if (date) {
    return moment.unix(parseInt(date, 10)).calendar();
  }
  return;
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

export function isEmpty(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function sortList(list: Array<any>, asc?: boolean) {
  if (list) {
    list.sort(function compare(a, b) {
      const dateA = new Date(parseInt(a.date, 10) * 1000) as any;
      const dateB = new Date(parseInt(b.date, 10) * 1000) as any;
      if (asc) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }
  return list;
}

export function forEachNode(
  nodes: Array<IMPDTreeNode>,
  callback: (node: IMPDTreeNode) => void
) {
  if (nodes == null) {
    return;
  }
  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes || [], callback);
  }
}

export function formatDateTime(metric: number, filler: string, str: string) {
  return metric > 0 ? str + metric + " " + filler : str;
}

export function convertUTCToFormattedText(date: string) {
  const unixDate = moment.unix(parseInt(date, 10));
  const myDate = unixDate.format("DD/MM/YY");
  const myTime = unixDate.format("hh:mmA");
  return myDate + " at " + myTime;
}

export function updateMoment() {
  moment.updateLocale("en", {
    calendar: {
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      lastWeek: "[Last] dddd",
      nextWeek: "[Next] dddd",
      sameElse: "L"
    }
  });
  return moment;
}

export function getListItem(currentList: Array<any>, id: number | string) {
  const parentItem = currentList.filter(obj => {
    return obj.id === id;
  })[0];
  if (parentItem === undefined) {
    let childItem;
    currentList.filter(parentObj => {
      if (parentObj.childNodes) {
        parentObj.childNodes.some((childObj: any) => {
          if (childObj.id === id) {
            childItem = childObj;
          }
        });
      }
    });
    return childItem;
  } else {
    return parentItem;
  }
}

export function validateEmail(email?: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password?: string) {
  if(password){
    return password.length > 5;
  }
  return false;
}

export function doesStringExistInArr(text: string, array: Array<string>) {
  let index = -1;
  for(let i = 0; i < array.length; i++) {
    const topItem = array[i].toLowerCase();
    if(text.includes(topItem)) {
      index = i;
    } 
  }
  return index;
}

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
  // const hourDivider = 2;
  let t = hourDivider * 24;
  while (t--) {
    dates.push(startDate.format(format));
    startDate.add(60 / hourDivider, "minute");
  }
  return dates;
}