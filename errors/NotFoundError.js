class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'notFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
