export const convertBufferToFile = (bufferData: { type: string, data: number[] }, fileName: string, mimeType: string): File => {
    const byteArray = new Uint8Array(bufferData.data)
    const blob = new Blob([byteArray], { type: mimeType })
    return new File([blob], fileName, { type: mimeType })
  }