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
router.get('/users/:id', authMiddleware, userController.readyById)
router.delete('/users/:id', authMiddleware, userController.delete)
router.put('/users/:id', authMiddleware, userController.update)

router.post('/disciplines', disciplineController.create)
router.get('/disciplines', disciplineController.ready)
router.get('/disciplines/:id', disciplineController.readyById)
router.delete('/disciplines/:id', disciplineController.delete)
router.put('/disciplines/:id', disciplineController.update)

router.post('/courses', courseController.create)
router.get('/courses', courseController.ready)
router.get('/courses/:id', courseController.readyById)
router.delete('/courses/:id', courseController.delete)
router.put('/courses/:id', courseController.update)

export { router }