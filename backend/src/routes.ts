import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { CourseController } from './controllers/CourseController'
import { DisciplineController } from './controllers/DisciplineController'
import { GridController } from './controllers/GridController'
import { HistoricController } from './controllers/HistoricController'
import { HistoricDisciplineController } from './controllers/HistoricDisciplineController'
import { StudentController } from './controllers/StudentController'
import { UserController } from './controllers/UserController'
import authMiddleware from './middlewares/authMiddleware'
import authMiddlewareAdmin from './middlewares/authMiddlewareAdmin'

const router = Router()

const authController = new AuthController()
const userController = new UserController()
const disciplineController = new DisciplineController()
const courseController = new CourseController()
const studentController = new StudentController()
const gridController = new GridController()
const historicController = new HistoricController()
const historicDisciplineController = new HistoricDisciplineController()

router.post('/auth', authController.authenticate)

router.post('/users', authMiddlewareAdmin, userController.create)
router.get('/users', authMiddlewareAdmin, userController.ready)
router.get('/users/:id', authMiddlewareAdmin, userController.readyById)
router.delete('/users/:id', authMiddlewareAdmin, userController.softDelete)
router.put('/users/:id', authMiddlewareAdmin, userController.update)

router.post('/disciplines', authMiddleware, disciplineController.create)
router.get('/disciplines', authMiddleware, disciplineController.ready)
router.get('/disciplines/:id', authMiddleware, disciplineController.readyById)
router.delete('/disciplines/:id', authMiddleware, disciplineController.softDelete)
router.put('/disciplines/:id', authMiddleware, disciplineController.update)

router.post('/courses', courseController.create)
router.get('/courses', courseController.ready)
router.get('/courses/:id', courseController.readyById)
router.delete('/courses/:id', courseController.delete)
router.put('/courses/:id', courseController.update)

router.post('/students', studentController.create)
router.get('/students/:page', studentController.ready)
router.get('/students/:id', studentController.readyById)
router.delete('/students/:id', studentController.delete)
router.put('/students/:id', studentController.update)

router.post('/grids', gridController.create)
router.get('/grids', gridController.ready)
router.get('/grids/:course_id', gridController.readyByCourseId)
router.delete('/grids/:course_id', gridController.delete)
router.put('/grids/:course_id', gridController.update)

router.post('/historics', historicController.create, historicDisciplineController.execute)
router.get('/historics', historicController.readyByStudent)
router.delete('/historics/:id', historicController.deleteById)
router.delete('/historics', historicController.deleteByStudent)
router.put('/historics/:id', historicController.update)

export { router }

