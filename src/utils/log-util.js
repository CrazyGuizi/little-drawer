const isDebug = true

export function log(){
  if (isDebug) {
    console.log.apply(console, arguments);
  }
}
