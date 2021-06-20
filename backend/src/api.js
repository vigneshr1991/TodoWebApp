/* eslint-disable no-console */
const express = require('express');
const app = express();

const graphqlHttp = require('./graphql');
const todoRouter = require('./todo/todo.route');
const commonMiddleware = require('./middlewares/common.middleware');

app.use(commonMiddleware.logErrors)
app.use(commonMiddleware.errorHandler)
app.use(commonMiddleware.requestLogger);
app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/graphql', graphqlHttp);
app.use('/', todoRouter);

module.exports = app;
