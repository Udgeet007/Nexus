import { S3 } from "aws-sdk";
import fs from "fs";

// replace with your own credentials
const s3 = new S3({
    accessKeyId: "jwlwxz3zrxzvr56ebsserqxkmjpq",
    secretAccessKey: "j2yv4jlhxp7myioyugjqhi2zvsih7ijo63fhzrcadbqpfzuoz5lxm",
    endpoint: "https://gateway.storjshare.io"
})

// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}
