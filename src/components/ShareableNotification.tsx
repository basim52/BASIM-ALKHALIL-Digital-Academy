
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Language } from '../lib/translations';

interface ShareableNotificationProps {
  lang: Language;
  studentName: string;
  message?: string;
  lessonName?: string;
  reportMarkdown?: string;
  roadmapLevel?: string;
  schedule?: { day: string, time: string, subject?: string }[];
  type: string;
  id?: string;
}

export const ShareableNotification = ({ lang, studentName, message, lessonName, reportMarkdown, roadmapLevel, schedule, type, id = "shareable-card" }: ShareableNotificationProps) => {
  const isRtl = lang === 'ar';

  const levels = [
    { id: 'A1', label: 'A1', icon: '🌱' },
    { id: 'A2', label: 'A2', icon: '🌿' },
    { id: 'B1', label: 'B1', icon: '🌳' },
    { id: 'B2', label: 'B2', icon: '🎓' },
    { id: 'C1', label: 'C1', icon: '🏆' },
    { id: 'C2', label: 'C2', icon: '👑' }
  ];

  const currentIdx = levels.findIndex(l => l.id === roadmapLevel);
  const isReport = type === 'report';

  return (
    <div 
      id={id}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        width: isReport ? '1350px' : '650px',
        padding: isReport ? '3.5rem' : '3rem',
        backgroundColor: '#ffffff',
        border: '12px solid #ecfdf5',
        borderRadius: '3rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Cairo, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        // Force LTR for the container to maintain layout stability in canvas
        direction: 'ltr',
        textAlign: 'left'
      }}
    >
      {/* Background Decorations */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          width: '16rem', 
          height: '16rem', 
          borderRadius: '9999px', 
          transform: 'translate(50%, -50%)', 
          opacity: 0.5,
          backgroundColor: '#ecfdf5' 
        }} 
      />
      <div 
        style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '16rem', 
          height: '16rem', 
          borderRadius: '9999px', 
          transform: 'translate(-50%, 50%)', 
          opacity: 0.5,
          backgroundColor: '#eff6ff' 
        }} 
      />
      
      {/* Header */}
      <div 
        style={{ 
          display: 'flex',
          // If RTL, we reverse the row to pull logo to the left and text to the right
          flexDirection: isRtl ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          marginBottom: '3rem', 
          borderBottom: '2px solid #d1fae5', 
          paddingBottom: '2rem' 
        }}
      >
        <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
          <h1 
            style={{ 
              fontSize: '1.875rem', 
              fontWeight: 900, 
              letterSpacing: '-0.025em', 
              margin: 0,
              color: '#002147' 
            }}
          >
            BKD ACADEMY
          </h1>
          <p 
            style={{ 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              fontSize: '10px', 
              marginTop: '0.25rem',
              color: '#10b981' 
            }}
          >
            Towards Better Language
          </p>
        </div>
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4rem', 
            height: '4rem', 
            borderRadius: '1.5rem', 
            backgroundColor: '#002147', 
            boxShadow: '0 20px 25px -5px rgba(0, 33, 71, 0.2)' 
          }}
        >
          <span style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>B</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '3rem', textAlign: isRtl ? 'right' : 'left' }}>
        <div 
          style={{ 
            display: 'inline-block',
            padding: '0.25rem 1rem',
            borderRadius: '9999px',
            fontSize: '10px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1.5rem',
            border: '1px solid #a7f3d0',
            backgroundColor: '#d1fae5', 
            color: '#047857'
          }}
        >
          {type === 'schedule' 
            ? (schedule && schedule.length === 1 ? 'Class Details' : 'Weekly Schedule') 
            : (type === 'encouragement' ? 'Encouragement' : (type === 'report' ? 'AI Smart Report' : (type === 'roadmap' ? 'Academic Roadmap' : 'Academic Alert')))}
        </div>
        
        <h2 
          style={{ 
            fontSize: '2.25rem', 
            fontWeight: 900, 
            lineHeight: 1.25, 
            marginBottom: (lessonName || type === 'roadmap') ? '0.5rem' : '2rem',
            color: '#1e293b' 
          }}
        >
          {studentName}
        </h2>

        {type === 'roadmap' && (
           <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', marginBottom: '2rem' }}>
             Current Level: {roadmapLevel}
           </div>
        )}

        {lessonName && type !== 'roadmap' && (
          <div 
            style={{ 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              color: '#10b981', 
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {lessonName}
          </div>
        )}
        
        <div 
          style={{ 
            position: 'relative',
            padding: '2rem', 
            borderRadius: '2rem', 
            border: '1px solid #f1f5f9',
            backgroundColor: '#f8fafc',
            textAlign: isRtl ? 'right' : 'left',
            direction: isRtl ? 'rtl' : 'ltr'
          }}
        >
          {type === 'schedule' && schedule ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {schedule.map((item, index) => (
                <div key={index} style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between', marginBottom: item.subject ? '0.5rem' : 0 }}>
                    <span style={{ fontWeight: 900, color: '#002147' }}>{item.day}</span>
                    <span style={{ fontWeight: 700, color: '#10b981' }}>{item.time}</span>
                  </div>
                  {item.subject && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', textAlign: isRtl ? 'right' : 'left' }}>
                      {item.subject}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : type === 'report' ? (
            <div style={{ position: 'relative', zIndex: 10 }}>
               <div 
                 style={{ 
                   fontSize: '1rem', 
                   fontWeight: 500, 
                   lineHeight: 1.7, 
                   color: '#334155',
                   maxHeight: '100%',
                   overflow: 'visible',
                   columnCount: 2,
                   columnGap: '3.5rem',
                   columnRule: '2px dashed #e2e8f0',
                   direction: isRtl ? 'rtl' : 'ltr',
                   textAlign: isRtl ? 'right' : 'left'
                 }}
               >
                 <ReactMarkdown 
                   components={{
                     h1: ({children}) => (
                       <h1 style={{
                         fontSize: '1.5rem', 
                         fontWeight: 900, 
                         color: '#002147', 
                         marginBottom: '1.5rem', 
                         marginTop: '0px',
                         textAlign: 'center',
                         borderBottom: '2px solid #e2e8f0',
                         paddingBottom: '0.75rem',
                         columnSpan: 'all' as any,
                         width: '100%'
                       }}>
                         {children}
                       </h1>
                     ),
                     h2: ({children}) => (
                       <h2 style={{
                         fontSize: '1.15rem', 
                         fontWeight: 900, 
                         color: '#002147', 
                         marginBottom: '0.75rem', 
                         marginTop: '1.25rem',
                         borderBottom: '1px solid #f1f5f9',
                         paddingBottom: '0.25rem'
                       }}>
                         {children}
                       </h2>
                     ),
                     h3: ({children}) => <h3 style={{fontSize: '1.05rem', fontWeight: 800, color: '#002147', marginBottom: '0.5rem', marginTop: '1rem'}}>{children}</h3>,
                     p: ({children}) => <p style={{marginBottom: '0.75rem'}}>{children}</p>,
                     ul: ({children}) => <ul style={{marginBottom: '1rem', paddingInlineStart: '1.25rem', listStyleType: 'disc'}}>{children}</ul>,
                     ol: ({children}) => <ol style={{marginBottom: '1rem', paddingInlineStart: '1.25rem', listStyleType: 'decimal'}}>{children}</ol>,
                     li: ({children}) => <li style={{marginBottom: '0.4rem'}}>{children}</li>,
                     strong: ({children}) => <strong style={{fontWeight: 900, color: '#b45309'}}>{children}</strong>,
                   }}
                 >
                   {reportMarkdown}
                 </ReactMarkdown>
               </div>
               <div style={{ 
                 marginTop: '2rem', 
                 padding: '1rem', 
                 backgroundColor: '#002147', 
                 color: '#ffffff', 
                 borderRadius: '1rem',
                 fontSize: '0.75rem',
                 fontWeight: 800,
                 textAlign: 'center'
               }}>
                 {isRtl ? 'تحليل ذكي مدعوم بـ GEMINI 3 FLASH' : 'SMART ANALYSIS POWERED BY GEMINI 3 FLASH'}
               </div>
            </div>
          ) : type === 'roadmap' ? (
            <div style={{ padding: '1rem 0' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '2rem' }}>
                  {/* Progress Line */}
                  <div style={{ position: 'absolute', top: '2rem', left: 0, width: '100%', height: '4px', backgroundColor: '#f1f5f9', borderRadius: '2px' }} />
                  <div style={{ 
                    position: 'absolute', 
                    top: '2rem', 
                    left: 0, 
                    width: `${(currentIdx / (levels.length - 1)) * 100}%`, 
                    height: '4px', 
                    backgroundColor: '#10b981', 
                    borderRadius: '2px',
                    transition: 'width 1s ease'
                  }} />
                  
                  {levels.map((level, idx) => (
                    <div key={level.id} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ 
                        width: '4rem', 
                        height: '4rem', 
                        borderRadius: '1rem', 
                        backgroundColor: idx <= currentIdx ? '#10b981' : '#ffffff',
                        border: '2px solid',
                        borderColor: idx <= currentIdx ? '#10b981' : '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: idx === currentIdx ? '0 10px 15px -3px rgba(16, 185, 129, 0.3)' : 'none'
                      }}>
                        {level.icon}
                      </div>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: 900, 
                        color: idx <= currentIdx ? '#002147' : '#cbd5e1' 
                      }}>
                        {level.label}
                      </span>
                    </div>
                  ))}
               </div>
               <div style={{ 
                 backgroundColor: '#ecfdf5', 
                 padding: '1.5rem', 
                 borderRadius: '1.5rem', 
                 border: '1px solid #d1fae5',
                 textAlign: 'center'
               }}>
                 <p style={{ margin: 0, fontWeight: 700, color: '#065f46', fontSize: '1rem' }}>
                   {isRtl 
                    ? `رائع! لقد أكملت ${((currentIdx + 1) / levels.length * 100).toFixed(0)}% من المسار التعليمي` 
                    : `Great! You have completed ${((currentIdx + 1) / levels.length * 100).toFixed(0)}% of the learning path`}
                 </p>
               </div>
            </div>
          ) : (
            <>
              <svg 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                style={{ 
                  position: 'absolute',
                  top: '1rem',
                  left: isRtl ? 'auto' : '1rem',
                  right: isRtl ? '1rem' : 'auto',
                  width: '3rem', 
                  height: '3rem', 
                  color: '#f1f5f9',
                  transform: isRtl ? 'none' : 'scaleX(-1)',
                  opacity: 0.5
                }}
              >
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 12.1046 13.1216 13 12.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V5C10.017 4.44772 10.4647 4 11.017 4H19.017C20.6738 4 22.017 5.34315 22.017 7V15C22.017 16.6569 20.6738 18 19.017 18H16.017C15.4647 18 15.017 18.4477 15.017 19V21H14.017ZM4.017 21L4.017 18C4.017 16.8954 4.9124 16 6.017 16H9.017C9.56931 16 10.017 15.5523 10.017 15V9C10.017 8.44772 9.56931 8 9.017 8H5.017C4.46474 8 4.017 8.44772 4.017 9V11C4.017 12.1046 3.1216 13 2.017 13H1.017C0.464741 13 0.0170068 12.5523 0.0170068 12V5C0.0170068 4.44772 0.464741 4 1.017 4H9.017C10.6738 4 12.017 5.34315 12.017 7V15C12.017 16.6569 10.6738 18 9.017 18H6.017C5.46474 18 5.017 18.4477 5.017 19V21H4.017Z" />
              </svg>
              <p 
                style={{ 
                  position: 'relative',
                  zIndex: 10,
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  lineHeight: 1.8, 
                  margin: 0,
                  color: '#334155',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {message}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div 
        style={{ 
          display: 'flex',
          flexDirection: isRtl ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            style={{ 
              width: '1rem', 
              height: '1rem', 
              borderRadius: '9999px', 
              backgroundColor: '#10b981' 
            }} 
          />
          <span 
            style={{ 
              fontSize: '10px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              lineHeight: 1,
              color: '#94a3b8' 
            }}
          >
            Verification: {new Date().toLocaleDateString('en-US')}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRtl ? 'flex-start' : 'flex-end', textAlign: isRtl ? 'left' : 'right' }}>
          <span 
            style={{ 
              fontSize: '10px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              marginBottom: '0.25rem',
              color: '#10b981' 
            }}
          >
            Towards Better Language
          </span>
          <div 
            style={{ 
              fontSize: '1.25rem', 
              fontWeight: 900, 
              color: '#002147' 
            }}
          >
            BKD ACADEMY
          </div>
        </div>
      </div>
    </div>
  );
};
