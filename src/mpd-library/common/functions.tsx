

export function sortArrayByProperty(property: string) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a: any,b: any) => {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export function sortByMultipleProperties(sortArr: Array<string>) {
    const arrCopy = sortArr.slice();
    return (obj1: any, obj2: any) => {
        let i = 0;
        let result = 0;
        const numberOfProperties = arrCopy.length;
        while(result === 0 && i < numberOfProperties) {
            result = sortArrayByProperty(arrCopy[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

export function filterArrByProperty(array:any, filter: string, filterProperies?: Array<string>) {
    return array.filter((listItem: any) => {
      return Object.keys(listItem).some((property: any) => {
          if(filterProperies){
            return listItem[property].toString().toLowerCase().indexOf(filter) !== -1 && (filterProperies.indexOf(property) > -1); 
          }
          else {
            return listItem[property].toString().toLowerCase().indexOf(filter) !== -1; 
          }
      });
    });
}

