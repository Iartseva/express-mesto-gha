const messages = {
  cardDeleted: 'Карточка удалена!',
};

const regexp = {
  urlReg: /https?:\/{2}\b[^\\.][\w\-\\.]{1,}\.[a-z]{2,6}([\w\S]{1,})?/,
  emailReg: /^([^@\s]+@([-A-Za-z0-9]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
};

module.exports = { messages, regexp };
