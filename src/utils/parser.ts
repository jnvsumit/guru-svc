export const s3UrlParser = (s3Url: string): {key: string, bucketName: string} =>{
    const s3Array: string[] = s3Url.split("//");
    const urlData: string = s3Array[s3Array.length - 1];
    const urlDataArray: string[] = urlData.split("/");

    const key: string = urlDataArray[urlDataArray.length - 1];
    const bucketName: string = urlDataArray[0].split(".")[0];

    return {key, bucketName};
}