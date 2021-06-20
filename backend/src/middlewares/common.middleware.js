function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
  
    res.status(500).json('error', { error: err })
}
  
function requestLogger(req, res, next) {
    res.once('finish', () => {
      const log = [req.method, req.path];
      if (req.body && Object.keys(req.body).length > 0) {
        log.push(JSON.stringify(req.body));
      }
      log.push('->', res.statusCode);
      console.log(log.join(' '));
    });
    next();
}

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

module.exports = {
    logErrors,
    requestLogger,
    errorHandler
}