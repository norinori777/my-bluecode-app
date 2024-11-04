// convertBufferToFile 関数は、バッファデータを File オブジェクトに変換します。
const convertBufferToFile = (bufferData: { type: string, data: number[] }, fileName: string, mimeType: string): File => {
    // bufferData.data 配列から Uint8Array を作成します。
    const byteArray = new Uint8Array(bufferData.data)
        // Uint8Array から Blob オブジェクトを作成します。
    const blob = new Blob([byteArray], { type: mimeType })
        // Blob オブジェクトから File オブジェクトを作成し、返します。
    return new File([blob], fileName, { type: mimeType })
}

export const convertBase64ToFile = (base64Data: string, fileName: string, mimeType: string): File => {
    // Base64データをデコードしてバイナリ文字列に変換
    const byteString = atob(base64Data)
    // バイナリ文字列の長さを持つ Uint8Array の新しいインスタンスを作成
    const byteArray = new Uint8Array(byteString.length)
    // 文字列を配列に格納
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i)
    }
    // Uint8Array を使用して Blob オブジェクトを作成
    const blob = new Blob([byteArray], { type: mimeType })
     // Blob オブジェクトを使用して File オブジェクトを作成
    return new File([blob], fileName, { type: mimeType })
}