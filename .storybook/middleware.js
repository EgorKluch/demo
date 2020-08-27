const express = require('express');
const path = require('path');

module.exports = function (app) {
    app.use('/intl', express.static(path.resolve(__dirname, '../assets/intl')));
};
