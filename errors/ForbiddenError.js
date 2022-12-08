class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 403;
  }
}

module.exports = {
  ForbiddenError,
};
