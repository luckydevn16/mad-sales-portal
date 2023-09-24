import {
  GetObjectAclCommandOutput,
  GetObjectCommand,
  GetObjectOutput,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import vars from "../config/vars";

const s3Client = new S3Client({ region: vars.aws.region });

export const getAllObjects = async (key: string) => {
  const params = {
    Bucket: vars.aws.bucket,
    Prefix: key,
  };

  let allFiles: any[] = [];

  await s3Client
    .send(new ListObjectsCommand(params))
    .then((data) => {
      const contents = data.Contents;
      contents?.map((item) => {
        allFiles.push({
          quoteId: key,
          orgName: item.Key,
          fileSize: item.Size,
          createdAt: item.LastModified,
        });
      });
      console.log("All matching files are fetched successfully!");
    })
    .catch((err) => {
      console.error("Error fetch list of files:", err);
    });

  return allFiles;
};

export const getObject = async (key: string) => {
  const params = {
    Bucket: vars.aws.bucket,
    Key: key,
  };
  
  let res = {};
  await s3Client
    .send(new GetObjectCommand(params))
    .then((data) => {   
      res = {
        status: "success",
        data      
      };
    })
    .catch((err) => {
      console.error("Error retrieving file from S3:", err);
      res = {
        status: "error",
      };
    });

  return res;
};
