"use client";

import React from "react";

type Developer = {
  name: string;
  phone: string;
  instagram: string;
  email: string;
};

const developers: Developer[] = [
  { 
    name: "나현우", 
    phone: "010-4090-0861", 
    instagram: "@sigebert111",
    email: "nahw0861@kookmin.ac.kr"
  },
  { 
    name: "이예준", 
    phone: "010-5330-0251", 
    instagram: "@iyejun_5226",
    email: "dldpwns5226@gmail.com"
  },
  { 
    name: "김용준", 
    phone: "010-9537-9370", 
    instagram: "@yongjun_1115",
    email: "ccowon1115@kookmin.ac.kr"
  },
];

export default function Developer() {
  return (
    <section className="developer-root">
      <div className="developer-list">
        {developers.map((dev, index) => (
          <div key={index} className="developer-card">
            <div className="developer-avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            
            <div className="developer-info">
              <h3 className="developer-name">{dev.name}</h3>
              
              <div className="developer-contacts">
                {/* 전화번호 */}
                <div className="developer-contact">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="contact-icon"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href={`tel:${dev.phone}`} className="contact-link">
                    {dev.phone}
                  </a>
                </div>

                {/* 인스타그램 */}
                <div className="developer-contact">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="contact-icon"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <a 
                    href={`https://instagram.com/${dev.instagram.replace('@', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    {dev.instagram}
                  </a>
                </div>

                {/* 이메일 */}
                <div className="developer-contact">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="contact-icon"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href={`mailto:${dev.email}`} className="contact-link">
                    {dev.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .developer-root {
          background: var(--card);
          padding: 24px;
          border-radius: 24px;
          border: 1px solid var(--card-border);
        }
        
        .developer-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .developer-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid var(--card-border);
          background: var(--card);
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .developer-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }
        
        .developer-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .developer-avatar svg {
          width: 32px;
          height: 32px;
          color: var(--primary-foreground);
        }
        
        .developer-info {
          flex: 1;
          min-width: 0;
        }
        
        .developer-name {
          font-size: 18px;
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 12px 0;
        }
        
        .developer-contacts {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .developer-contact {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .contact-icon {
          width: 16px;
          height: 16px;
          color: var(--muted-foreground);
          flex-shrink: 0;
        }
        
        .contact-link {
          font-size: 14px;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          word-break: break-all;
        }
        
        .contact-link:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 640px) {
          .developer-card {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          
          .developer-contacts {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}