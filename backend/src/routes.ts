import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { CourseController } from './controllers/CourseController'
import { DisciplineController } from './controllers/DisciplineController'
import { GridController } from './controllers/GridController'
import { StudentController } from './controllers/StudentController'
import { UserController } from './controllers/UserController'
import authMiddleware from './middlewares/authMiddleware'

const router = Router()

const authController = new AuthController()
const userController = new UserController()
const disciplineController = new DisciplineController()
const courseController = new CourseController()
const studentController = new StudentController()
const gridController = new GridController()

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

router.post('/students', studentController.create)
router.get('/students', studentController.ready)
router.get('/students/:id', studentController.readyById)
router.delete('/students/:id', studentController.delete)
router.put('/students/:id', studentController.update)

router.post('/grids', gridController.create)
router.get('/grids', gridController.ready)
router.get('/grids/:course_id', gridController.readyByCourseId)
router.delete('/grids/:course_id', gridController.delete)
router.put('/grids/:course_id', gridController.update)

export { router }

