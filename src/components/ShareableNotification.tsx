
import React from 'react';
import { Language } from '../lib/translations';

interface ShareableNotificationProps {
  lang: Language;
  studentName: string;
  message?: string;
  schedule?: { day: string, time: string }[];
  type: string;
  id?: string;
}

export const ShareableNotification = ({ lang, studentName, message, schedule, type, id = "shareable-card" }: ShareableNotificationProps) => {
  const isRtl = lang === 'ar';

  return (
    <div 
      id={id}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        textAlign: isRtl ? 'right' : 'left',
        width: '600px',
        padding: '3rem',
        direction: isRtl ? 'rtl' : 'ltr',
        backgroundColor: '#ffffff',
        border: '12px solid #ecfdf5',
        borderRadius: '3rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Cairo, "IBM Plex Sans Arabic", sans-serif'
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
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          marginBottom: '3rem', 
          borderBottom: '2px solid #d1fae5', 
          paddingBottom: '2rem' 
        }}
      >
        <div>
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
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '3rem' }}>
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
          {type === 'schedule' ? 'Weekly Schedule' : (type === 'encouragement' ? 'Encouragement' : 'Academic Alert')}
        </div>
        
        <h2 
          style={{ 
            fontSize: '2.25rem', 
            fontWeight: 900, 
            lineHeight: 1.25, 
            marginBottom: '2rem',
            color: '#1e293b' 
          }}
        >
          {studentName}
        </h2>
        
        <div 
          style={{ 
            position: 'relative',
            padding: '2rem', 
            borderRadius: '2rem', 
            border: '1px solid #f1f5f9',
            backgroundColor: '#f8fafc' 
          }}
        >
          {type === 'schedule' && schedule ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {schedule.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 900, color: '#002147' }}>{item.day}</span>
                  <span style={{ fontWeight: 700, color: '#10b981' }}>{item.time}</span>
                </div>
              ))}
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
                  transform: isRtl ? 'none' : 'scaleX(-1)'
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
                  lineHeight: 1.625, 
                  margin: 0,
                  color: '#334155' 
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
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
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
