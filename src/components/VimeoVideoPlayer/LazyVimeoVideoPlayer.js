import dynamic from 'next/dynamic';

const LazyVimeoVideo = dynamic(() => import('./VimeoVideoPlayer'), {
  ssr: false,
});

export default LazyVimeoVideo;
