export default defineAppConfig({
  success: {
    statusMessage: "Success",
  },
  error: {
    badrequest: {
      statusCode: 400,
      statusMessage: "Bad Request",
    },
    unauthorized: {
      statusCode: 401,
      statusMessage: "Unauthorized",
    },
    notfound: {
      statusCode: 404,
      statusMessage: "Not Found",
    },
    toomanyrequests: {
      statusCode: 429,
      statusMessage: "Too Many Requests",
    },
    internalservererror: {
      statusCode: 500,
      statusMessage: "Internal Server Error",
    },
  },
});
