const uuid = require("uuid");

const { generateHash } = require("../utils/hashProvider");

const authors = [
  {
    id: "4af3cb53-c2bc-45b4-ad54-6c8578480918",
    name: "John Doe",
    biography: "Exemplo biogafico",
    email: "john.doe@example.com.br",
    password: "password1234",
    createdAt: new Date(),
    modifiedAt: new Date(),
  },
];

const list = (req, res) => {
  return res.json(authors);
};

const getById = (req, res) => {
  const { id } = req.params;

  const author = authors.find((a) => a.id === id);

  if (!author) {
    return res.status(400).json({
      error: "@author/getById",
      message: "Author not found",
    });
  }

  return res.json(author);
};

const create = async (req, res) => {
  const { name, biography, email, password } = req.body;

  const authorIndex = authors.findIndex((a) => a.email === email);

  if (authorIndex > 0) {
    return res.status(400).json({
      error: "@author/create",
      message: `Email already exists  ${email}`,
    });
  }

  const id = uuid.v4();

  const hashedPassword = await generateHash(password);

  const author = {
    id,
    name,
    biography,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  authors.push(author);

  return res.status(201).json(author);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, biography, email, password } = req.body;

  const authorIndex = authors.findIndex((a) => a.id === id);

  if (authorIndex < 0) {
    return res.json({
      error: "@author/update",
      message: `Author not found ${id}`,
    });
  }

  const { createdAd } = authors[authorIndex];

  const authorUpdade = {
    id,
    name,
    biography,
    email,
    password,
    createdAd,
    modifiedAt: new Date(),
  };

  if (password) {
    authorUpdade.password = await generateHash(password);
  } else {
    authorUpdade.password = authors[authorIndex].password;
  }

  authors[authorIndex] = authorUpdade;

  return res.json(authorUpdade);
};

const remove = (req, res) => {
  const { id } = req.params;

  const authorIndex = authors.findIndex((a) => a.id === id);

  if (authorIndex < 0) {
    return res.status(400).json({
      error: "@authors/remove",
      message: `Author not found ${id}`,
    });
  }

  authors.splice(authorIndex, 1);
  return res.send();
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  authorDatabase: authors,
};
