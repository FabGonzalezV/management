// request-logger.js

const requestLogger = (req, res, next) => {
    const date = new Date().toISOString();
    const method = req.method;
    const url = req.url;
  
    console.log(`[${date}] ${method} ${url}`);
  
    // Continúa con la solicitud
    next();
  };
  
export  default requestLogger;
  