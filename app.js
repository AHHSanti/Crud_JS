const express = require('express');
const routes = require('./routes');
const http = require('http');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const connection = require('express-myconnection');
const mysql = require('mysql');
const customers = require('./routes/customers'); // Assurez-vous que ce chemin est correct

// Create Express application
const app = express();

// Set port and view engine
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev')); // Logger middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(methodOverride('_method')); // Support for HTTP methods such as PUT and DELETE

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database connection middleware
app.use(
  connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'customer'
  }, 'request')
);

// Routes
app.get('/', routes.index);
app.get('/customers', customers.list); // This line will throw an error if `customers` is not defined
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);

// Error handler for development
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Start server
http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
