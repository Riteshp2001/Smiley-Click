import dynamic from 'next/dynamic';

const TransformDemo = dynamic(() => import('./TransformDemo'));

export default TransformDemo;
