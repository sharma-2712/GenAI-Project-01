const {GoogleGenAI}=require("@google/genai")
const {z}=require("zod")
const {zodToJsonSchema}=require("zod-to-json-schema")
const puppeteer=require('puppeteer')


const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
});


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
    
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
Act as a Senior Technical Interviewer.

INPUT:
- Resume: ${resume}
- Self Description: ${selfDescription}
- Job Description: ${jobDescription}

OUTPUT RULES (STRICT JSON ONLY):
1. matchScore: realistic (100 = perfect match)

2. technicalQuestions:
   - Avoid generic questions
   - Reference resume technologies (e.g., MongoDB → indexing, aggregation)
   - Include:
     • question (concise)
     • intention (short: what skill is tested)
     • answer (brief but complete: approach + reasoning + best practice)

3. behavioralQuestions:
   - Focus: conflict, learning speed, teamwork
   - Include:
     • question
     • intention (short)
     • answer (structured guidance in brief)

4. skillGaps:
   - Only missing skills (JD vs Resume)
   - Include: skill & severity must be one of: low, medium, high (lowercase only).
5. preparationPlan:
   - preparationPlan.day must be a number (1,2,3,4,5,6,7)
   - Short structured daily roadmap for 7 days
   - Include: day, focus & tasks (concise bullets)
6. title: Extracted job title from the job description.

CONSTRAINTS:
- Keep responses concise
- Avoid repetition
- Maintain structure exactly
- No markdown, no extra text
STRICT RULE:
- Return ONLY valid JSON
- Do NOT use \`\`\`json or \`\`\`
- Do NOT add any text before or after JSON

Return only JSON.
`;
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents:prompt,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
            temperature: 0.2, // Lower temperature for more focused, professional technical answers
        
        },
    });

    
    return JSON.parse(response.text);
    
}


async function generatePdfFromHtml(htmlContent){
    const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});
    const page=await browser.newPage();
    await page.setContent(htmlContent,{waitUntil:"networkidle0"})
    const pdfBuffer=await page.pdf({
        format:"A4", margin:{
            top:"20mm",
            bottom:"20mm",
            left:"15mm",
            right:"15mm"
        } })  
    await browser.close();
    return pdfBuffer;


} 

async function generateResumePdf({resume,selfDescription,jobDescription}){
    const resumePdfSchema=z.object({
        html:z.string().describe("The HTML content of the resume PDF which can be converted to PDF using a library like puppeteer")
    })
   const prompt = `Generate a professional resume in HTML format.
    
    INPUTS:
    - Current Data: ${resume}
    - Self-Desc: ${selfDescription}
    - Target Job: ${jobDescription}

    CRITICAL: The "html" field must contain a single valid JSON string. 
    Escape all internal double quotes with backslashes. 
    Ensure the HTML is complete and valid.
    The resume should be tailored for the target job, highlighting relevant skills and experience.
    The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
    You can hightlight the content using some colors or different font but the overall design should be simple and professional.
    The content should be ATS friendly, i.e. it should be easily parsable by ATS system without losing important information or formatting.
    The resume should be concise and should not exceed 2 pages when converted to PDF. Focus on quality of content rather than quantity and make sure to include all the relevant information that can increase the chances of getting an interview call for the target job.`;


const response=await ai.models.generateContent({
    model:"gemini-3-flash-preview",
    contents:prompt,   
    config:{
        responseMimeType:"application/json",
        responseSchema:zodToJsonSchema(resumePdfSchema),
        temperature:0.2
    }
})
    const jsonContent= JSON.parse(response.text)
    const pdfBuffer=await generatePdfFromHtml(jsonContent.html)
    return pdfBuffer
}



module.exports={generateInterviewReport,generateResumePdf}