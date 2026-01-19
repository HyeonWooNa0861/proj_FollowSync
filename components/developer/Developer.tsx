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
          <div 
            key={index} 
            className={`developer-card ${index % 2 === 1 ? 'align-right' : 'align-left'}`}
          >
            <div className="card-content">
              <h3 className="developer-name">{dev.name}</h3>
              
              <div className="developer-contacts">
                {/* 전화번호 */}
                <div className="developer-contact">
                  <span className="contact-label">Tel.</span>
                  <a href={`tel:${dev.phone}`} className="contact-link">
                    {dev.phone}
                  </a>
                </div>

                {/* 인스타그램 */}
                <div className="developer-contact">
                  <span className="contact-label">IG</span>
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
                  <span className="contact-label">E-mail</span>
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
          padding: 32px;
          border-radius: 24px;
          border: 1px solid var(--card-border);
        }
        
        .developer-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        /* 명함 스타일 카드 */
        .developer-card {
          width: 380px;
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        
        .developer-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }
        
        /* 1번, 3번: 왼쪽 정렬 */
        .developer-card.align-left {
          align-self: flex-start;
        }
        
        /* 2번: 오른쪽 정렬 */
        .developer-card.align-right {
          align-self: flex-end;
        }
        
        .card-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .developer-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--primary);
        }
        
        .developer-contacts {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .developer-contact {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .contact-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--muted-foreground);
          min-width: 55px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .contact-link {
          font-size: 14px;
          color: var(--foreground);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          border-bottom: 1.5px solid transparent;
          line-height: 1.5;
        }

        .contact-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1.5px;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }

        .contact-link:hover {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        .contact-link:hover::after {
          width: 100%;
        }
        
        /* 태블릿: 768px 이하 */
        @media (max-width: 768px) {
          .developer-root {
            padding: 24px;
          }
          
          .developer-card {
            width: 100%;
            max-width: 400px;
          }
          
          /* 중앙 정렬 */
          .developer-card.align-right {
            align-self: center;
          }
          
          .developer-card.align-left {
            align-self: center;
          }
        }
        
        /* 모바일: 640px 이하 */
        @media (max-width: 640px) {
          .developer-root {
            padding: 16px;
          }
          
          .developer-list {
            gap: 16px;
          }
          
          .developer-card {
            width: 100%;
            padding: 20px;
          }
          
          .developer-name {
            font-size: 18px;
          }
          
          .contact-label {
            min-width: 60px;
            font-size: 10px;
          }
          
          .contact-link {
            font-size: 13px;
          }
        }
        
        /* 작은 모바일: 480px 이하 */
        @media (max-width: 480px) {
          .developer-card {
            padding: 16px;
          }
          
          .card-content {
            gap: 12px;
          }
          
          .developer-contacts {
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}