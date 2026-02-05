import express from 'express'
import verifyJWT from '../middlewares/verifyJwt.js'
import { addJourney, deleteJourney, getTimeLine, updateJourney } from '../controllers/timelineController.js'
const router = express.Router()


router.get('/' , verifyJWT , getTimeLine)
router.post('/add' , verifyJWT , addJourney)
router.delete('/delete' , verifyJWT , deleteJourney)
router.put('/update/:id' , verifyJWT , updateJourney)

export default router