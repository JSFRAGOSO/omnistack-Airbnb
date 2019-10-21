const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashBoardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions',  SessionController.store);
routes.get('/session',  SessionController.index);
routes.post('/spots',  upload.single('thumbnail'), SpotController.store);
routes.get('/spots',  SpotController.index);
routes.get('/spots/:id_spot',  SpotController.show);
routes.patch('/spots/:id_spot',  SpotController.update);

routes.get('/dashboard',  DashBoardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store)
routes.get('/spots/:spot/bookings', BookingController.index);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;