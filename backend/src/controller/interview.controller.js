const pdfParse=require("pdf-parse")
const {generateInterviewReport,generateResumePdf}=require("../services/ai.service")
const interviewReportModel=require("../models/interviewReport.model")
/**
 * @description Generate an interview report based on candidate's resume, self-description and job description
 */

async function generateInterviewReportController(req,res) {
    const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {selfDescription,jobDescription,title}=req.body

    const interviewReportByAi=await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport=await interviewReportModel.create({
        
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi

    })
    res.status(201).json({
        message:"Interview Report Generated Successfully",
        interviewReport
    })
}
/**
 * @description Get the interview report by interview ID
 */
async function getInterviewReportController(req,res) {
    const { interviewId }=req.params;
    const interviewReport=await interviewReportModel.findOne({
        _id:interviewId,
        user:req.user.id
    })

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview Report Not Found."
        })
    }
    res.status(200).json({
        message:"Interview Report Feteched Successfully.",
        interviewReport
        })
    
}

async function getAllInterviewReportsController(req,res){
    const interviewReports=await interviewReportModel.find({
        user:req.user.id
    }).sort({
        createdAt:-1
    }).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message:"Interview Report Generated",
        interviewReports
    })
}


/**
 * @description Generate a resume PDF based on candidate's resume, self-description and job description
 */

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params
    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}



module.exports={generateInterviewReportController,getInterviewReportController,getAllInterviewReportsController,generateResumePdfController}