class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 404;
  }
}

module.exports = {
  NotFound,
};
