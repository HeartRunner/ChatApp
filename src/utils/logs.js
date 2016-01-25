export function printObjects(object) {
  Object.keys(object).forEach( key => {
    console.warn(key, object[key]);
  })
}
