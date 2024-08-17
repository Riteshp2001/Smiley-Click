import dynamic from 'next/dynamic';

const MainContent = dynamic(() => import('./MainContent'));

export default MainContent;
