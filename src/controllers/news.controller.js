const uuid = require("uuid");

const newsbd = [
  {
    id: "8302fc5b-bec9-4659-85b9-10773c1b49dc",
    title: "Título da notícia",
    brief: "Breve descrição da notícia",
    content: "Conteúdo completo da notícia",
    author_id: "4af3cb53-c2bc-45b4-ad54-6c8578480918",
    image: "https://exemplo.com/imagem.jpg",
    publish_date: "2023-04-28",
    createdAt: new Date(),
    modifiedAt: new Date(),
  },
];

const list = (req, res) => {
  const { author_id, publish_date } = req.query;

  if (author_id && publish_date) {
    const news = newsbd.filter(
      (n) => n.author_id === author_id && n.publish_date === publish_date
    );
    return res.json(news);
  } else if (author_id) {
    const news = newsbd.filter((n) => n.author_id === author_id);
    return res.json(news);
  } else if (publish_date) {
    const news = newsbd.filter((n) => n.publish_date === publish_date);
    return res.json(news);
  }

  return res.json(newsbd);
};

const getById = (req, res) => {
  const { id } = req.params;

  const news = newsbd.find((n) => n.id === id);

  if (!news) {
    return res.status(400).json({
      error: "@news/getById",
      message: `New not found ${id}`,
    });
  }
  return res.json(news);
};

const create = (req, res) => {
  const { title, brief, content, image, publish_date } = req.body;

  const id = uuid.v4();

  const author_id = req.author.id;

  const news = {
    id,
    title,
    brief,
    content,
    author_id,
    image,
    publish_date,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  newsbd.push(news);

  return res.status(201).json(news);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title, brief, content, image, publish_date } = req.body;

  const newsIndex = newsbd.findIndex((n) => n.id === id);

  if (newsIndex < 0) {
    return res.status(400).json({
      error: "@news/update",
      message: `News not found ${id}`,
    });
  }

  const { createdAt, author_id } = newsbd[newsIndex];

  const newsUpdate = {
    id,
    title,
    brief,
    content,
    author_id,
    image,
    publish_date,
    createdAt,
    modifiedAt: new Date(),
  };

  newsbd[newsIndex] = newsUpdate;

  return res.json(newsUpdate);
};

const remove = (req, res) => {
  const { id } = req.params;

  const newsIndex = newsbd.findIndex((n) => n.id === id);

  if (newsIndex < 0) {
    return res.status(400).json({
      error: "@news/remove",
      message: `News not found ${id}`,
    });
  }
  newsbd.splice(newsIndex, 1);

  return res.send();
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
