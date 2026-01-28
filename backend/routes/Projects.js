import express from 'express'
import { addProject, deleteProject, getAllProjects, updateProject } from '../controllers/projectsController.js'
import multer from 'multer';
import verifyJWT from '../middlewares/verifyJwt.js';
const router = express.Router()


// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add' , verifyJWT , upload.single("image") ,  addProject)
router.get('/' , verifyJWT , getAllProjects)
router.delete('/delete', verifyJWT , deleteProject)
router.put('/update/:id' , verifyJWT , upload.single("image") , updateProject)

export default router