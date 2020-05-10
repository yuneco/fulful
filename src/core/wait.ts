const wait = (ms: number) => new Promise(resolve => window.setTimeout(resolve, ms))
export default wait
