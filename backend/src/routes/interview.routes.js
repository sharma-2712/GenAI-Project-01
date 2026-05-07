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


/**
 * @route GET /api/interview/report/:interviewId
 * @description Get the interview report by interview ID
 * @access private
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportController)

/**
 * @route GET /api/interview/reports
 * @description Get all interview reports of the authenticated user
 * @access private  
 */
interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)


/**
 * @route POST /api/interview/resume/pdf
 * @description Generate resume PDF based on user self description, resume content and job description.
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)


module.exports=interviewRouter