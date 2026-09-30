import { useMemo, useState } from 'react'
import {
  BookOpen, BrainCircuit, CheckCircle2, ChevronRight, FileText,
  Flame, GraduationCap, LayoutDashboard, Menu, MessageCircle,
  Moon, Plus, Search, Settings, Sparkles, Target, Trophy, Upload,
  X, Zap
} from 'lucide-react'

type Tab = 'Dashboard' | 'My Notes' | 'Quiz' | 'Daily Test' | 'AI Tutor'

const notes = [
  { title: 'Cyber Security — Unit 2', meta: 'PDF • 18 pages', color: 'violet' },
  { title: 'AWS Cloud Fundamentals', meta: 'PDF • 24 pages', color: 'blue' },
  { title: 'Engineering Mathematics II', meta: 'PDF • 42 pages', color: 'amber' },
]

const quizQuestions = [
  ['What does AWS S3 primarily provide?', 'Object storage'],
  ['Which service is commonly used for user authentication in Amplify?', 'Amazon Cognito'],
  ['What is the main purpose of encryption?', 'Protect data from unauthorized access'],
]

function App() {
  const [tab, setTab] = useState<Tab>('Dashboard')
  const [dark, setDark] = useState(true)
  const [menu, setMenu] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [question, setQuestion] = useState('')
  const [answered, setAnswered] = useState<number[]>([])

  const progress = useMemo(() => Math.round((answered.length / quizQuestions.length) * 100), [answered])

  const notify = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  return (
    <div className={dark ? 'app dark' : 'app light'}>
      <aside className={menu ? 'sidebar open' : 'sidebar'}>
        <div className="brand">
          <div className="brand-icon"><Sparkles size={20}/></div>
          <div><b>AI Student</b><span>Cloud</span></div>
        </div>
        <nav>
          {(['Dashboard','My Notes','Quiz','Daily Test','AI Tutor'] as Tab[]).map((item) => (
            <button className={tab === item ? 'nav active' : 'nav'} onClick={() => {setTab(item);setMenu(false)}} key={item}>
              {item === 'Dashboard' && <LayoutDashboard size={18}/>}
              {item === 'My Notes' && <FileText size={18}/>}
              {item === 'Quiz' && <BrainCircuit size={18}/>}
              {item === 'Daily Test' && <Target size={18}/>}
              {item === 'AI Tutor' && <MessageCircle size={18}/>}
              {item}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <button className="nav"><Settings size={18}/> Settings</button>
          <div className="profile-mini">
            <div className="avatar">S</div>
            <div><b>Student</b><span>Free workspace</span></div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
          <div className="search"><Search size={18}/><input placeholder="Search notes, quizzes, topics..." /></div>
          <div className="top-actions">
            <button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? <Moon size={18}/> : <Zap size={18}/>}</button>
            <div className="avatar">S</div>
          </div>
        </header>

        <section className="content">
          {tab === 'Dashboard' && (
            <>
              <div className="hero">
                <div>
                  <div className="eyebrow"><Sparkles size={15}/> AI-powered learning workspace</div>
                  <h1>Learn smarter.<br/><span>Ship your goals.</span></h1>
                  <p>Turn your PDFs into notes, quizzes and daily practice — all in one cloud workspace.</p>
                  <button className="primary" onClick={() => setUploadOpen(true)}><Upload size={18}/> Upload study material</button>
                </div>
                <div className="hero-orb"><div><BrainCircuit size={52}/><span>AI</span></div></div>
              </div>

              <div className="stats">
                <Stat icon={<Flame/>} label="Study streak" value="7 days" />
                <Stat icon={<BookOpen/>} label="Notes created" value="18" />
                <Stat icon={<CheckCircle2/>} label="Quiz accuracy" value="86%" />
                <Stat icon={<Trophy/>} label="XP earned" value="1,240" />
              </div>

              <div className="section-head"><div><h2>Continue learning</h2><p>Pick up where you left off.</p></div><button className="text-btn" onClick={() => setTab('My Notes')}>View all <ChevronRight size={16}/></button></div>
              <div className="cards">
                {notes.map((n, i) => <NoteCard key={n.title} {...n} onOpen={() => {setTab('My Notes'); notify('Opening ' + n.title)}} />)}
              </div>

              <div className="grid-two">
                <div className="panel">
                  <div className="panel-head"><div><h3>Daily goal</h3><p>Keep your momentum going.</p></div><Target/></div>
                  <div className="goal"><div className="ring"><b>72%</b></div><div><b>36 / 50 minutes</b><span>14 minutes remaining today</span></div></div>
                  <div className="progress"><span style={{width:'72%'}}/></div>
                </div>
                <div className="panel">
                  <div className="panel-head"><div><h3>Quick actions</h3><p>Start something new.</p></div><Plus/></div>
                  <div className="quick">
                    <button onClick={() => setUploadOpen(true)}><Upload/>Upload PDF</button>
                    <button onClick={() => setTab('Quiz')}><BrainCircuit/>Generate quiz</button>
                    <button onClick={() => setTab('AI Tutor')}><MessageCircle/>Ask AI</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'My Notes' && <Page title="My Notes" subtitle="Your cloud study library." action={<button className="primary small" onClick={() => setUploadOpen(true)}><Upload size={16}/> Upload</button>}>
            <div className="cards">{notes.concat([{title:'PPS — C Programming',meta:'PDF • 31 pages',color:'green'}]).map(n => <NoteCard key={n.title} {...n} onOpen={() => notify('AI summary ready to generate')} />)}</div>
          </Page>}

          {tab === 'Quiz' && <Page title="AI Quiz" subtitle="Test your understanding.">
            <div className="quiz-panel">
              <div className="quiz-top"><span>Cloud Fundamentals</span><b>{progress}% complete</b></div>
              {quizQuestions.map((q, i) => <div className="question" key={q[0]}><b>{i+1}. {q[0]}</b><button className={answered.includes(i) ? 'answer selected':'answer'} onClick={() => {setAnswered([...new Set([...answered,i])]);notify('Answer recorded')}}>{q[1]}</button><button className="answer">Not sure</button></div>)}
            </div>
          </Page>}

          {tab === 'Daily Test' && <Page title="Daily Test" subtitle="A focused 15-minute practice session.">
            <div className="empty-card"><div className="big-icon"><Target/></div><h2>Today's test is ready</h2><p>10 questions • 15 minutes • 100 XP</p><button className="primary" onClick={() => setTab('Quiz')}>Start test <ChevronRight/></button></div>
          </Page>}

          {tab === 'AI Tutor' && <Page title="AI Tutor" subtitle="Ask questions about your study material.">
            <div className="chat">
              <div className="chat-intro"><div className="big-icon"><BrainCircuit/></div><h2>What are you learning?</h2><p>Ask a question in English or Hindi. Your tutor will explain it simply.</p></div>
              <div className="suggestions">{['Explain AWS S3 in simple words','Make a 5-question quiz','Explain this topic in Hindi'].map(s => <button onClick={() => setQuestion(s)} key={s}>{s}</button>)}</div>
              <div className="chat-input"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask your AI tutor..." onKeyDown={e=>e.key==='Enter' && notify('AI response will connect here')} /><button onClick={() => notify('AI response will connect here')}><Sparkles size={18}/></button></div>
            </div>
          </Page>}
        </section>
      </main>

      {uploadOpen && <div className="modal-bg" onClick={() => setUploadOpen(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setUploadOpen(false)}><X/></button><div className="big-icon"><Upload/></div><h2>Upload study material</h2><p>PDF, PPT, DOCX or TXT files. AI will turn them into study resources.</p><div className="dropzone" onClick={() => notify('File picker will connect to Amazon S3')}><Upload size={28}/><b>Click to choose a file</b><span>Maximum 25 MB</span></div><button className="primary full" onClick={()=>{setUploadOpen(false);notify('S3 upload connection ready for next step')}}>Continue</button></div></div>}
      {toast && <div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
    </div>
  )
}

function Stat({icon,label,value}:{icon:React.ReactNode,label:string,value:string}) {
  return <div className="stat"><div className="stat-icon">{icon}</div><div><span>{label}</span><b>{value}</b></div></div>
}
function NoteCard({title,meta,color,onOpen}:{title:string,meta:string,color:string,onOpen:()=>void}) {
  return <button className="note-card" onClick={onOpen}><div className={`note-icon ${color}`}><FileText/></div><div><b>{title}</b><span>{meta}</span></div><ChevronRight className="chev"/></button>
}
function Page({title,subtitle,action,children}:{title:string,subtitle:string,action?:React.ReactNode,children:React.ReactNode}) {
  return <><div className="page-head"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>{children}</>
}
export default App
