import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Spinner from '@/components/Spinner';
import ClientOnly from '@/components/ClientOnly';

function CenteredSpinner({ height = 300 }) {
  return (
    <SpinnerWrapper style={{ height }}>
      <Spinner />
    </SpinnerWrapper>
  );
}

export const Opposing = dynamic(() => import('./Opposing'), {
  loading: CenteredSpinner,
});

export const WithBreak = dynamic(() => import('./WithBreak'), {
  loading: CenteredSpinner,
});

export const Asymmetrical = dynamic(() => import('./Asymmetrical'), {
  loading: CenteredSpinner,
});

export const SameDirection = dynamic(
  () => import('./SameDirection'),
  {
    loading: CenteredSpinner,
  }
);

export const Multi = dynamic(() => import('./Multi'), {
  loading: CenteredSpinner,
});

export const NegativeIntro = dynamic(
  () => import('./NegativeIntro'),
  {
    loading: CenteredSpinner,
  }
);

export const Negative = dynamic(() => import('./Negative'), {
  loading: CenteredSpinner,
});

export const Mixed = dynamic(() => import('./Mixed'), {
  loading: CenteredSpinner,
});

export const Padded = dynamic(() => import('./Padded'), {
  loading: CenteredSpinner,
});
export const Gap = dynamic(() => import('./Gap'), {
  loading: CenteredSpinner,
});

export const Horizontal = dynamic(() => import('./Horizontal'), {
  loading: CenteredSpinner,
});

export const Nested = dynamic(() => import('./Nested'), {
  loading: CenteredSpinner,
});

export const StyledComponents = dynamic(
  () => import('./StyledComponents'),
  {
    loading: CenteredSpinner,
  }
);

const SpinnerWrapper = styled.div`
  display: grid;
  place-content: center;
`;

const map = {
  Opposing,
  WithBreak,
  Asymmetrical,
  SameDirection,
  Multi,
  NegativeIntro,
  Negative,
  Mixed,
  Padded,
  Gap,
  Horizontal,
  Nested,
  StyledComponents,
};

const MarginCollapse = ({ id, ...delegated }) => {
  const Component = map[id];
  return (
    <ClientOnly>
      <Component {...delegated} />
    </ClientOnly>
  );
};

export default MarginCollapse;
