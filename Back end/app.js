const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
console.log(process.env)
const cors = require('cors');
const createDb = require('./utils/createDb');
const checkIfDatabaseIsEmpty = require('./utils/checkIfDataBaseIsEmpty');


const {createDatabaseIfNotExists} = require('./db/createDataBaseIfNotExist');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const orderRouter = require('./routes/orderRouter')

const { create } = require('./models/products');
const { verifyToken }= require('./middlewares/verify-token');

const app = express();
app.use(cors());




// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', orderRouter)

app.use('/api/products', productsRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.get( "/welcome", function(req, res){
  return res.json({message:"hola"})
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: res.locals.error });
});
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

// Creacion de base de datos EN CASO DE QUE NO EXISTA
async function startDb () {
  try {
    await createDatabaseIfNotExists(); // Crea la base de datos en caso de que no exista

    
    const isDatabaseEmpty = await checkIfDatabaseIsEmpty();
    console.log(isDatabaseEmpty)
    if(isDatabaseEmpty) {
      console.log('Base de datos sincronizada')
      await createDb();
      console.log('Data pusheada  la base de datos')
    } else {
      console.log('Datos existentes en la base de datos, no hizo falta crear datos nuevos');
    }
  } catch (error) {
    console.error('Error al sincronizar/crear base de datos')
  }
}

startDb();


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});




module.exports = app;
