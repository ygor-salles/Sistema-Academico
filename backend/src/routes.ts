import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { UserController } from './controllers/UserController'
import authMiddleware from './middlewares/authMiddleware'

const router = Router()

const userController = new UserController()
const authController = new AuthController()

router.post('/users', userController.create)
router.get('/users', authMiddleware, userController.ready)
router.get('/users/:email', userController.readyByEmail)
router.delete('/users/:email', userController.delete)
router.put('/users/:email', userController.update)

router.post('/auth', authController.authenticate)



export { router }