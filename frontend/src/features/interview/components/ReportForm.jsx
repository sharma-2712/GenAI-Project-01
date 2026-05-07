import React from 'react'
import ResumeUploadSection from './ResumeUploadSection'
import '../style/reportForm.scss'

const ReportForm = ({ formData, handlers }) => {
  return (
    <div className='report-form-wrapper'>
      <div className='form-header'>
        <h2 className='form-title'>Report Generator</h2>
        <p className='form-subtitle'>Prepare your interview strategy by aligning your experience with target roles.</p>
      </div>

      <div className='form-container'>
        <div className='form-left-section'>
          {/* Target Job Description */}
          <div className='form-section'>
            <div className='section-header'>
              <svg className='section-icon' width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" fill="none"/>
                <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" fill="none"/>
                <line x1="8" y1="15" x2="14" y2="15" stroke="currentColor" fill="none"/>
              </svg>
              <label htmlFor='jobDescription'>Target Job Description</label>
            </div>
            <textarea
              id='jobDescription'
              name='jobDescription'
              className='form-textarea'
              placeholder='Paste the full job description here. Include requirements, responsibilities, and company values...'
              value={formData.jobDescription}
              onChange={handlers.onJobDescriptionChange}
            />
            <div className='parsing-badge'>AUTO-PARSING ACTIVE</div>
          </div>
        </div>

        <div className='form-right-section'>
          {/* Resume Upload */}
          <ResumeUploadSection
            resumeFile={formData.resumeFile}
            onUpload={handlers.onResumeUpload}
            onRemove={handlers.onRemoveResume}
          />

          {/* Self Description */}
          <div className='form-section'>
            <div className='section-header'>
              <svg className='section-icon' width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="8" r="4"/>
                <path d="M 12 14 C 8 14 4 16 4 20 L 20 20 C 20 16 16 14 12 14 Z"/>
              </svg>
              <label htmlFor='selfDescription'>Self Introduction</label>
            </div>
            <textarea
              id='selfDescription'
              name='selfDescription'
              className='form-textarea'
              placeholder='Share your elevator pitch or how you typically introduce yourself to interviewers'
              value={formData.selfDescription}
              onChange={handlers.onSelfDescriptionChange}
            />
          </div>

          {/* Generate Button */}
          <button 
            className='btn-generate-report'
            onClick={handlers.onGenerateReport}
          >
            Generate Interview Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportForm
