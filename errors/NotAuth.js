class NotAuth extends Error {
  constructor(message) {
    super(message);
    this.name = 'notAuth';
    this.statusCode = 401;
  }
}

module.exports = NotAuth;
