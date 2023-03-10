import express from 'express'
import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js'

const router = express.Router()

router.route('/').post(createJob)
router.route('/').get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob)
router.route('/:id').patch(updateJob)

export default router