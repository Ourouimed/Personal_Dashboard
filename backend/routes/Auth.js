import express from 'express'
import { login, logout, verifySession } from '../controllers/authController.js'
import verifyJWT from '../middlewares/verifyJwt.js'
const router = express.Router()

router.post('/login'  , login )
router.post('/logout' , logout)
router.get('/verify-session' , verifyJWT , verifySession)


export default router