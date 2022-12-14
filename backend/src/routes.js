import { Router } from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import MeetupController from './app/controllers/MeetupController'
import SubscriptionController from './app/controllers/SubscriptionController'
import OrganizingController from './app/controllers/OrganizingController'

import validateUserStore from './app/validators/UserStore'
import validateUserUpdate from './app/validators/UserUpdate'
import validateSessionStore from './app/validators/SessionStore'
import validateMeetupStore from './app/validators/MeetupStore'
import validateMeetupUpdate from './app/validators/MeetupUpdate'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', validateUserStore, UserController.store)
routes.post('/sessions', validateSessionStore, SessionController.store)

routes.use(authMiddleware)

routes.put('/users', validateUserUpdate, UserController.update)

routes.get('/meetups', MeetupController.index)
routes.get('/meetups/:id', MeetupController.show)
routes.post('/meetups', validateMeetupStore, MeetupController.store)
routes.put('/meetups/:id', validateMeetupUpdate, MeetupController.update)
routes.delete('/meetups/:id', MeetupController.delete)

routes.get('/subscriptions', SubscriptionController.index)
routes.post('/subscriptions/:meetupId', SubscriptionController.store)
routes.delete('/subscriptions/:id', SubscriptionController.delete)

routes.get('/organizing', OrganizingController.index)

routes.post('/files', upload.single('file'), FileController.store)

export default routes
