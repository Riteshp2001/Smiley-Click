import React from 'react';
import styled from 'styled-components';

import useSound from '@/hooks/use-sound.hook';

import Paragraph from '../Paragraph';
import ClientOnly from '../ClientOnly';
import MobileOnly from '../MobileOnly';
import DesktopOnly from '../DesktopOnly';
import VisuallyHidden from '@/components/VisuallyHidden';

const TwitterCTA = ({ children, href, onClick }) => {
  const childArray = React.Children.toArray(children);

  return (
    <Wrapper>
      <BirdCol href={href} target="_blank" onClick={onClick}>
        <Bird />
        <VisuallyHidden>Share this page on twitter</VisuallyHidden>
      </BirdCol>
      <MainCol>
        {childArray.map((child, i) => (
          <Paragraph key={i}>{child}</Paragraph>
        ))}

        <ArrowWrapper>
          <Arrow />
        </ArrowWrapper>

        <Trigger
          href={href}
          target="_blank"
          tabIndex={-1}
          onClick={onClick}
        >
          <MobileOnly>Share on Twitter</MobileOnly>
          <DesktopOnly>Click the bird</DesktopOnly>
        </Trigger>
      </MainCol>
    </Wrapper>
  );
};

const Bird = () => {
  const [hover, setHover] = React.useState(false);
  const [playBite, { stop }] = useSound('/sounds/bite.mp3', 0.4);

  const timeoutId = React.useRef(null);

  const playBiteAfterDelay = () => {
    timeoutId.current = window.setTimeout(playBite, 290);
  };

  React.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutId.current);
    };
  }, []);

  const path = hover
    ? `M78.62 203.59
    C172.96 203.59 224.56 125.43 224.56 57.6501
    C224.56 55.4301 224.56 53.2202 224.41 51.0202
    C234.448 40.7593 243.114 34.7689 250 13
    C240.639 28.6182 230.708 31.3384 220.54 32.5401
    C234.448 40.7593 243.114 34.7689 250 13
    C233.022 10.1447 222.006 14.3553 210.52 16.6202
    C202.787 8.397 192.559 2.95183 181.419 1.12728
    C170.279 -0.69727 158.848 1.20051 148.895 6.52695
    C138.943 11.8534 131.023 20.3115 126.362 30.5925C121.701 40.8735 120.558 52.4042 123.11 63.4001C102.718 62.3778 82.768 57.0785 64.5564 47.8461C46.3448 38.6136 30.2784 25.6546 17.4 9.81015C10.8409 21.1018 8.832 34.4688 11.7823 47.1895C14.7326 59.9103 22.4202 71.0284 33.28 78.2802C25.1174 78.0382 17.1328 75.8363 10 71.8602C10 72.0702 10 72.2901 10 72.5101C10.0032 84.3523 14.1026 95.8288 21.6028 104.993C29.103 114.157 39.5423 120.445 51.15 122.79C43.5987 124.85 35.6758 125.151 27.99 123.67C31.2676 133.862 37.6486 142.774 46.2407 149.161C54.8328 155.548 65.2061 159.089 75.91 159.29C57.7474 173.564 35.3106 181.313 12.21 181.29C8.12903 181.282 4.05204 181.035 0 180.55C23.4564 195.603 50.7491 203.587 78.62 203.55`
    : `M78.62 203.59
    C172.96 203.59 224.56 125.43 224.56 57.6501
    C224.56 55.4301 224.56 53.2202 224.41 51.0202
    C234.448 43.7593 243.114 34.7689 250 24.4702
    C240.639 28.6182 230.708 31.3384 220.54 32.5401
    C231.247 26.13 239.261 16.0479 243.09 4.17015
    C233.022 10.1447 222.006 14.3553 210.52 16.6202
    C202.787 8.397 192.559 2.95183 181.419 1.12728
    C170.279 -0.69727 158.848 1.20051 148.895 6.52695
    C138.943 11.8534 131.023 20.3115 126.362 30.5925C121.701 40.8735 120.558 52.4042 123.11 63.4001C102.718 62.3778 82.768 57.0785 64.5564 47.8461C46.3448 38.6136 30.2784 25.6546 17.4 9.81015C10.8409 21.1018 8.832 34.4688 11.7823 47.1895C14.7326 59.9103 22.4202 71.0284 33.28 78.2802C25.1174 78.0382 17.1328 75.8363 10 71.8602C10 72.0702 10 72.2901 10 72.5101C10.0032 84.3523 14.1026 95.8288 21.6028 104.993C29.103 114.157 39.5423 120.445 51.15 122.79C43.5987 124.85 35.6758 125.151 27.99 123.67C31.2676 133.862 37.6486 142.774 46.2407 149.161C54.8328 155.548 65.2061 159.089 75.91 159.29C57.7474 173.564 35.3106 181.313 12.21 181.29C8.12903 181.282 4.05204 181.035 0 180.55C23.4564 195.603 50.7491 203.587 78.62 203.55`;

  return (
    <BirdSvg
      viewBox="0 0 250 204"
      fill="none"
      onMouseEnter={() => {
        setHover(true);
        playBiteAfterDelay();
      }}
      onMouseLeave={() => {
        setHover(false);
        stop();
        window.clearTimeout(timeoutId.current);
      }}
    >
      <defs>
        <linearGradient
          id="twitter-gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="10%" style={{ stopColor: '#1DA1F2' }} />
          <stop offset="100%" style={{ stopColor: '#1162FF' }} />
        </linearGradient>
      </defs>
      <path d={path} fill="url(#twitter-gradient)" />
      <mask
        id="twitter-outline-mask"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="250"
        height="204"
      >
        <path
          d="M78.62 203.59C172.96 203.59 224.56 125.43 224.56 57.6501C224.56 55.4301 224.56 53.2202 224.41 51.0202C234.448 43.7593 243.114 34.7689 250 24.4702C240.639 28.6182 230.708 31.3384 220.54 32.5401C231.247 26.13 239.261 16.0479 243.09 4.17015C233.022 10.1447 222.006 14.3553 210.52 16.6202C202.787 8.397 192.559 2.95183 181.419 1.12728C170.279 -0.69727 158.848 1.20051 148.895 6.52695C138.943 11.8534 131.023 20.3115 126.362 30.5925C121.701 40.8735 120.558 52.4042 123.11 63.4001C102.718 62.3778 82.768 57.0785 64.5564 47.8461C46.3448 38.6136 30.2784 25.6546 17.4 9.81015C10.8409 21.1018 8.832 34.4688 11.7823 47.1895C14.7326 59.9103 22.4202 71.0284 33.28 78.2802C25.1174 78.0382 17.1328 75.8363 10 71.8602C10 72.0702 10 72.2901 10 72.5101C10.0032 84.3523 14.1026 95.8288 21.6028 104.993C29.103 114.157 39.5423 120.445 51.15 122.79C43.5987 124.85 35.6758 125.151 27.99 123.67C31.2676 133.862 37.6486 142.774 46.2407 149.161C54.8328 155.548 65.2061 159.089 75.91 159.29C57.7474 173.564 35.3106 181.313 12.21 181.29C8.12903 181.282 4.05204 181.035 0 180.55C23.4564 195.603 50.7491 203.587 78.62 203.55"
          fill="#1DA1F2"
        />
      </mask>
      <g mask="url(#twitter-outline-mask)">
        <path
          d="M142 170C71.2878 189.734 -5 165 -13 162L-35 179L29 233L255 214L233 53C218 112 185 158 142 170Z"
          fill="black"
          fillOpacity="0.15"
        />
        <path
          d="M137.81 33.6281C138.908 26.7935 142.892 20.4315 149.165 15.7718C155.444 11.1071 163.555 8.5 172 8.5"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M30 35C30 35 47.7854 49.8084 64.5 58.5C77 65 101.5 70 101.5 70"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M19.1737 82.188C21.1771 83.813 23.8334 84.6749 27.4746 85.5417C31.1157 86.4084 34.3933 86.7503 36.8641 86.3991"
          stroke="white"
          strokeOpacity="0.15"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </BirdSvg>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;

  margin-top: 64px;
  margin-bottom: 64px;
  margin-left: -64px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
  }
`;

const BirdCol = styled.a`
  position: relative;
  z-index: 2;
  margin-right: 48px;
  padding-bottom: 32px;
  padding-top: 16px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    margin-bottom: -48px;
    margin-right: 0;
  }
`;

const MainCol = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  background: var(--color-muted);
  padding: 32px;
  border-radius: 16px;
`;

const ArrowWrapper = styled.div`
  position: absolute;
  left: -90px;
  top: 100px;
  bottom: 32px;
  pointer-events: none;

  * {
    vector-effect: non-scaling-stroke;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    display: none;
  }
`;

const Trigger = styled.a`
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  display: block;
  text-decoration: none;
  cursor: default;
`;

const BirdSvg = styled.svg`
  width: 125px;
  display: block;
  transform: rotate(0deg);
  transform-origin: center 90%;
  transition: transform 200ms 200ms;

  &:hover {
    transform: rotate(4deg);
    transition: transform 200ms;

    path {
      transition: d 200ms 100ms cubic-bezier(0.6, -0.4, 1, 0.79);
    }
  }

  path {
    transition: d 200ms cubic-bezier(0.6, -0.4, 1, 0.79);
  }
`;

const Arrow = () => (
  <svg
    viewBox="0 0 310 129"
    fill="none"
    preserveAspectRatio="none"
    style={{
      width: 330,
      height: '100%',
      overflow: 'visible',
    }}
  >
    <path
      d="M10.9756 5C31.3756 18.3237 42.2813 22.3973 46.3024 42.0904C51.5051 67.5697 18.9366 75 6.00002 96.4577C-15.9765 132.91 85.5 124.914 108 124.914H310M10.9756 5C16.4488 12.6215 18.9366 26.9662 18.9366 26.9662M10.9756 5C22.5 8.5 38 7 38 7"
      stroke="var(--color-text)"
      strokeWidth="3"
    />
  </svg>
);

export default function WhimsicalTwitterCTAWRapper(props) {
  return (
    <ClientOnly>
      <TwitterCTA {...props} />
    </ClientOnly>
  );
}
