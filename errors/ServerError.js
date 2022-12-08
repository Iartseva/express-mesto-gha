class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 500;
  }
}

module.exports = {
  ServerError,
};
