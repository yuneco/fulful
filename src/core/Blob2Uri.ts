export function blob2uri (blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string || '')
    }
    reader.onabort = () => {
      reject(new Error('aborted'))
    }
    reader.onerror = () => {
      reject(new Error('error'))
    }
    reader.readAsDataURL(blob)
  })
}
