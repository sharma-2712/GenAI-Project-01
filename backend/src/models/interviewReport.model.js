const mongoose = require('mongoose');

/**
 * - Job Description Schema:String
 * - Resume text: String
 * - Self Description : String
 * 
 * -Match Score:Number
 * 
 * - Technical Questions: [{
 *              question:"",
 *              answer:"",
 *              intention:""}]
 * - Behavioral Questions: [{
 *              question:"",
 *              answer:"",
 *              intention:""}]
 * - Skill Gaps : [{
 *              skill:"",
 *              severity:{
 *              type:String,
 *              enum:["low","medium","high"]},
 * }]
 * - Preparation Plan: [{
 *             day:Number,
 *            focusArea:String,
 *            tasks:[String]
 * }]
 * 
 */

const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical Question is required"],
    },
    intention:{
        type:String,
        required:[true,"Intention is required"],
    },
    answer:{
        type:String,
        required:[true,"Answer is required"],
    }
},{_id:false})

const behavioralQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Behavioral Question is required"],
    },
    intention:{
        type:String,
        required:[true,"Intention is required"],
    },
    answer:{
        type:String,
        required:[true,"Answer is required"],
    }
},{_id:false})


const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String, 
        required:[true,"Skill is required"],
    },
    severity:{  
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"],
    }
},{_id:false})  

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"],
    },
    focus:{
        type:String,            
        required:[true,"Focus Area is required"],
    },
    tasks:[{    
        type:String,
        required:[true,"At least one task is required"],
    }]
},{_id:false})  

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,'Job description is required']
    },
    resume:{
        type:String,

    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{
    timestamps:true
})

const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema);

module.exports=interviewReportModel