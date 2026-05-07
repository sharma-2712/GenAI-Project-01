import React, { useState } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useParams, useNavigate } from 'react-router'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Question Card ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>0{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>AI Strategic Focus</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ── Behavioral Card ──────────────────────────────────────────────────────────
const BehavioralCard = ({ item, index }) => {
    return (
        <div className='b-card'>
            <p className='b-card__question'>"{item.question}"</p>
            <div className='b-card__section'>
                <span className='b-card__tag'>Resume Talking Point</span>
                <p className='b-card__answer'>{item.answer}</p>
            </div>
        </div>
    )
}

// ── RoadMap Day ──────────────────────────────────────────────────────────────
const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__left'>
            <span className='roadmap-day__label'>DAY</span>
            <span className='roadmap-day__number'>0{day.day}</span>
        </div>
        <div className='roadmap-day__right'>
            <h4 className='roadmap-day__focus'>{day.focus}</h4>
            <p className='roadmap-day__tasks'>
                {day.tasks.join(' ')}
            </p>
        </div>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className='interview-page'>

            {/* ── Page Header ── */}
            <header className='interview-header'>
                <div className='interview-header__left'>
                    <span className='interview-header__eyebrow'>Interview Analysis Report</span>
                    <h1 className='interview-header__title'>
                        {report.title || 'Candidate Assessment'}
                    </h1>
                    <p className='interview-header__subtitle'>
                        A comprehensive architectural evaluation of technical proficiency and cultural resonance for this role.
                    </p>
                </div>
                <div className='interview-header__right'>
                    <div className={`match-ring ${scoreColor}`}>
                        <svg viewBox="0 0 120 120" className='match-ring__svg'>
                            <circle className='match-ring__track' cx="60" cy="60" r="50" />
                            <circle
                                className='match-ring__fill'
                                cx="60" cy="60" r="50"
                                strokeDasharray={`${2 * Math.PI * 50}`}
                                strokeDashoffset={`${2 * Math.PI * 50 * (1 - report.matchScore / 100)}`}
                            />
                        </svg>
                        <div className='match-ring__inner'>
                            <span className='match-ring__value'>{report.matchScore}</span>
                            <span className='match-ring__pct'>%</span>
                        </div>
                        <span className='match-ring__label'>MATCH SCORE</span>
                    </div>
                </div>
            </header>

            {/* ── Two-Column Body ── */}
            <div className='interview-body'>

                {/* ── Left Column ── */}
                <div className='interview-col interview-col--left'>
                    {/* Section Title */}
                    <h2 className='col-title col-title--italic'>Technical Vectors</h2>

                    {/* Technical Questions */}
                    <div className='q-list'>
                        {report.technicalQuestions.map((q, i) => (
                            <QuestionCard key={i} item={q} index={i} />
                        ))}
                    </div>
                </div>

                {/* ── Right Column ── */}
                <div className='interview-col interview-col--right'>

                    {/* Behavioral Section */}
                    <div className='right-panel'>
                        <h2 className='col-title'>Behavioral Resonance</h2>
                        <div className='b-list'>
                            {report.behavioralQuestions.map((q, i) => (
                                <BehavioralCard key={i} item={q} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Roadmap Section */}
                    <div className='right-section'>
                        <h2 className='col-title'>Execution Roadmap</h2>
                        <div className='roadmap-list'>
                            {report.preparationPlan.map((day) => (
                                <RoadMapDay key={day.day} day={day} />
                            ))}
                        </div>
                    </div>

                    {/* Skill Gaps */}
                    {report.skillGaps && report.skillGaps.length > 0 && (
                        <div className='right-section'>
                            <h2 className='col-title'>Skill Gaps</h2>
                            <div className='skill-gaps__list'>
                                {report.skillGaps.map((gap, i) => (
                                    <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Footer Bar ── */}
            <footer className='interview-footer'>
                <div className='interview-footer__left'>
                    <div className='footer-badge'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" /></svg>
                    </div>
                    <div>
                        <span className='footer-badge__eyebrow'>Verification Status</span>
                        <p className='footer-badge__text'>Analysis Certified by InterviewAI</p>
                    </div>
                </div>
                <div className='interview-footer__right'>
                    <button
                        className='footer-btn footer-btn--primary'
                        onClick={() => getResumePdf(interviewId)}
                    >
                        Download PDF Report
                    </button>
                    <button
                        className='footer-btn footer-btn--ghost'
                        onClick={() => navigate('/')}
                    >
                        ← Back to Home
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default Interview