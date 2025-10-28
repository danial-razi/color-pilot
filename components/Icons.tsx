
import React from 'react';

const IconBase: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-5 h-5 ${className}`}
  >
    {children}
  </svg>
);

export const PictureIcon = () => <IconBase><path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909-.48- .48a.75.75 0 0 0-1.06 0l-5.18 5.181ZM15.5 6a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5Zm-12-2.25a.75.75 0 0 0 0 1.5h13.5a.75.75 0 0 0 0-1.5H3.5Z" clipRule="evenodd" /></IconBase>;
export const CodeBracketIcon = () => <IconBase><path fillRule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></IconBase>;
export const ClipboardIcon = () => <IconBase><path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3A1.5 1.5 0 0 1 13 3.5v1A1.5 1.5 0 0 1 11.5 6h-3A1.5 1.5 0 0 1 7 4.5v-1Zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-3Z" /><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h1a.75.75 0 0 1 .75.75v.01c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V4.75a.75.75 0 0 1 .75-.75h1A1.5 1.5 0 0 1 18 5.5v9A1.5 1.5 0 0 1 16.5 16h-13A1.5 1.5 0 0 1 2 14.5v-9Zm1.5-1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13Z" /></IconBase>;
export const CheckIcon = () => <IconBase><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></IconBase>;
export const TrashIcon = () => <IconBase><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75V4.5h8V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 2.5h-1V3.75c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V2.5h-1Z" /><path fillRule="evenodd" d="M3 4.5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5H3Zm.75 2.25a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75Zm3.75.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0v-8.5Zm4.5 0a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></IconBase>;
export const BookmarkIcon = () => <IconBase><path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13.09a.75.75 0 0 0 1.21.62L10 12.38l5.79 4.83a.75.75 0 0 0 1.21-.62V3.5A1.5 1.5 0 0 0 15.5 2h-11Z" clipRule="evenodd" /></IconBase>;
export const ArrowDownTrayIcon = () => <IconBase><path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v9.546l2.124-2.123a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06L9.25 13.3V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" /><path fillRule="evenodd" d="M3 14a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 14Z" clipRule="evenodd" /></IconBase>;