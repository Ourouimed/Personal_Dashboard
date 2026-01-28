import express from 'express'
import { addProject, getAllProjects } from '../controllers/projectsController.js'
import multer from 'multer';
import verifyJWT from '../middlewares/verifyJwt.js';
const router = express.Router()


// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add' , verifyJWT , upload.single("image") ,  addProject)
router.get('/' , verifyJWT , getAllProjects)

export default router