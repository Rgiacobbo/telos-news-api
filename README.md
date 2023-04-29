## 🚀 Tecnologias

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [uuid](https://github.com/uuidjs/uuid)

## ❓ Como utilizar

### Como instalar

```bash
$ yarn
```

### ❓ .env

Faça uma cópia do .env.example e mude o nome do arquivo para ".env". Edite esse arquivo colando os dados para conexão com o banco de dados, e se necessário, altere os dados do JWT.

```bash
$ cp .env.example .env
```

### Como inicializar

```bash
yarn dev
```

### Descrição

A API de noticias tem como funcionalidades o cadastros de autoes e suas noticias.

### Recursos disponiveis

/authors - obtem as informações dos autores.
/news - obtem as informações das noticias.
/authenticate - Faz a autenticação do autor.

#### Parametros

##### Author

POST Author-Create: /authors  
201 OK - O autor foi criado com sucesso.
400 Bad Request - Email já existe.

GET Author-List: /authors
200 OK - Retorna a lista de autors

GET Author-Read: /authors/id
200 OK - Retorna as informações do autor.
400 Not Found - Autor não foi encontrado.

PUT Author-Update: /authors/id
200 OK - Autor foi atualizado com sucesso.
400 Not Found - Autor não foi encontrado.

DELETE Author-Delete: /authors/id
SEM RETORNO - Foi deletedo com sucesso.
400 Not Found - Autor não foi encontrado.

##### News

POST News-Create: /news  
201 OK - A notica foi criada com sucesso.
400 Bad Request - Noticia já existe.

GET News-List: /news
200 OK - Retorna a lista de Noticias.

GET News-List: /news?author_id=&publish_date=
200 OK - Retorna a lista de Noticias do autor selecionado e da data de publicação.
400 Not Found - Noticia não foi encontrada.

GET News-List: /news?author_id=
200 OK - Retorna a lista de Noticias do autor selecionado.
400 Not Found - Noticia não foi encontrada.

GET News-List: /news?publish_date=
200 OK - Retorna a lista de Noticias da data selecionada.
400 Not Found - Noticia não foi encontrada.

GET News-Read: /news/id
200 OK - Retorna as informações da Noticia.
400 Not Found - Noticia não foi encontrada.

PUT News-Update: /news/id
200 OK - Noticia foi atualizada com sucesso.
400 Not Found - Noticia não foi encontrada.

DELETE News-Delete: /news/id
SEM RETORNO - Foi deleteda com sucesso.
400 Not Found - Noticia não foi encontrada.

##### Authenticate

POST Authenticate-Login: /authenticate
200 OK - Autor foi autenticado com sucesso.
400 Bad Request - Email ou senha invalida.
