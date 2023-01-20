const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  captureUncaught: true, 
  captureUnhandledRejections: true,
  payload: {
    enviroment: process.env.NODE_ENV,
  },
};

export default rollbarConfig;