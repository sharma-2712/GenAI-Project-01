const express=require('express')
const authMiddleware=require("../middleware/auth.middleware")
const interviewController=require("../controller/interview.controller")
const upload=require('../middleware/file.middleware')

const interviewRouter=express.Router()



/**
 * @route POST /api/interview/generate-report
 * @desc Generate an interview report based on candidate's resume, self-description and job description
 * @access private
 * @body { resume: string, selfDescription: string, jobDescription: string }
 * @returns { matchScore: number, technicalQuestions: array, behavioralQuestions: array, skillGaps: array, preparationPlan: array }
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

module.exports=interviewRouter