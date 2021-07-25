const statusMessages = {
  200: 'Done',
  201: 'Created',
  400: 'Invalid format',
  500: 'Internal error',
};

const success = (req, res, data = 'ok', message, statusCode = 200) => {
  res.status(statusCode).send({
    data: data,
    message: message
      ? message
      : statusMessages[statusCode]
      ? statusMessages[statusCode]
      : statusMessages[200],
  });
};

module.exports = {
  success,
};
