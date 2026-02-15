import express from 'express'
import verifyJWT from '../middlewares/verifyJwt.js'
import { addTask, changeStatus, deleteTask, getAllTasks } from '../controllers/tasksController.js'
const router = express.Router()


router.post('/add' , verifyJWT ,  addTask)
router.post('/changeStatus' , verifyJWT ,  changeStatus)
router.get('/' , verifyJWT ,  getAllTasks)
router.delete('/delete', verifyJWT , deleteTask)

export default router