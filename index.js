const express = require('express');
const cors = require('cors'); // Импортируем CORS
const logger = require('./middleware/logger'); // Импортируем наш logger
const errorHandler = require('./middleware/erroeHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
// Импортируем роуты
const paintingRoutes = require('./routes/paintingRoutes');
const countRoutes = require ('./routes/countRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// 1. CORS middleware - разрешаем запросы с любого origin
app.use(cors());
// 2. Middleware для парсинга JSON
app.use(express.json());
// 3. Подключаем logger как глобальный middleware
if(process.env.NODE_ENV==='development'){
app.use(logger);
}
// Подключаем роуты
app.use('/api/paintings', paintingRoutes);
app.use('/api/count',countRoutes);


app.get('/health',(req,res)=>{
  res.json({
    success:true,
    massage:'Сервер работате прекрасно',
    timestamp:new Date().toISOString()
  });
});
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Режим: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Статус: http://localhost:${PORT}/health`);
  console.log(`API картин: http://localhost:${PORT}/api/paintings`);

});
