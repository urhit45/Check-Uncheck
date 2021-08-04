const config = {
    s3: {
      REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
      BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME",
    },
    apiGateway: {
      REGION: "YOUR_API_GATEWAY_REGION",
      URL: "YOUR_API_GATEWAY_URL",
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_0QxvttM6r",
      APP_CLIENT_ID: "3jdrs34f02sh90mvh8mk4mupbp",
      IDENTITY_POOL_ID: "us-east-2:0a298bdd-4fd1-44c5-9669-afbb22e3678f",
    },
  };
  
  export default config;