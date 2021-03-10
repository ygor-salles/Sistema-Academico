import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { CourseController } from './controllers/CourseController'
import { DisciplineController } from './controllers/DisciplineController'
import { UserController } from './controllers/UserController'
import authMiddleware from './middlewares/authMiddleware'

const router = Router()

const authController = new AuthController()
const userController = new UserController()
const disciplineController = new DisciplineController()
const courseController = new CourseController()

router.post('/auth', authController.authenticate)

router.post('/users', authMiddleware, userController.create)
router.get('/users', authMiddleware, userController.ready)
router.get('/users/:email', authMiddleware, userController.readyByEmail)
router.delete('/users/:email', authMiddleware, userController.delete)
router.put('/users/:email', authMiddleware, userController.update)

router.post('/disciplines', disciplineController.create)
router.get('/disciplines', disciplineController.ready)
router.get('/disciplines/:code', disciplineController.readyByCode)
router.delete('/disciplines/:code', disciplineController.delete)
router.put('/disciplines/:code', disciplineController.update)

router.post('/courses', courseController.create)
router.get('/courses', courseController.ready)
router.get('/courses/:name', courseController.readyByName)
router.delete('/courses/:name', courseController.delete)
router.put('/courses/:name', courseController.update)

export { router }