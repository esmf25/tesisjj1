
import React from 'react';

interface IconProps {
  className?: string;
}

export const LeafIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 4 13V8a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v2a7 7 0 0 1-7 7Z"></path>
    <path d="M11 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
  </svg>
);

export const FlaskConicalIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 2h7"></path>
    <path d="M14 2v6.342a2 2 0 0 1-.505 1.414L6.558 17.586A2 2 0 0 0 8 20.414V22h8v-1.586a2 2 0 0 0 1.442-2.828L10.505 9.756A2 2 0 0 1 10 8.342V2"></path>
  </svg>
);

export const DropletsIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.7-3.02C8.13 8.5 7 7.5 7 6c0-1.1.9-2 2-2s2 .9 2 2c0 1.5-1.13 2.5-2.3 3.23-.9.55-1.7 1.3-1.7 2.27 0 1.13.9 2.05 2 2.05s2-.92 2-2.05c0-1.16-.57-2.26-1.7-3.02C8.13 8.5 7 7.5 7 6c0-1.1.9-2 2-2s2 .9 2 2"></path>
    <path d="M12.56 6.51c.9.55 1.7 1.3 1.7 2.27 0 1.13-.9 2.05-2 2.05s-2-.92-2-2.05c0-1.16.57-2.26 1.7-3.02C13.87 5.5 15 4.5 15 3c0-1.1-.9-2-2-2s-2 .9-2 2c0 1.5 1.13 2.5 2.3 3.23"></path>
    <path d="M18.82 12.05c.9.55 1.7 1.3 1.7 2.27 0 1.13-.9 2.05-2 2.05s-2-.92-2-2.05c0-1.16.57-2.26 1.7-3.02C17.13 10.5 16 9.5 16 8c0-1.1.9-2 2-2s2 .9 2 2c0 1.5-1.13 2.5-2.3 3.23"></path>
    <path d="M7.6 19.3c.9.55 1.7 1.3 1.7 2.27 0 1.13-.9 2.05-2 2.05s-2-.92-2-2.05C5.3 20.36 5.87 19.3 7 18.5c1.13-.73 2.3-1.73 2.3-3.23 0-1.1-.9-2-2-2s-2 .9-2 2c0 1.5 1.13 2.5 2.3 3.23"></path>
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path><path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path><path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);
