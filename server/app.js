const express = require('express');

const { userValidator, loginValidator } = require('./services/validators');
const UserController = require('./controllers/users.controller');
const { port } = require('./config/config');

const app = express();

app.use(express.json());

app.post('/api/signup', userValidator, UserController.create);
app.post('/api/login', loginValidator, UserController.login);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
