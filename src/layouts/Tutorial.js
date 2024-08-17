import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MDXRemote } from 'next-mdx-remote';

import { COLOR_SWAP_TRANSITION_DURATION } from '@/constants';
import { getFormattedName } from '@/helpers/category.helpers';
import useOverscrollBackground from '@/hooks/use-overscroll-background.hook';
import useHits from '@/hooks/use-hits.hook';
import { COMPONENTS } from '@/helpers/mdx-components.helpers';

import TutorialLayout from '@/components/TutorialLayout';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Heading from '@/components/Heading';
import TableOfContents from '@/components/TableOfContents';
import ContentLikeButton from '@/components/ContentLikeButton';
import ToastySubscribe from '@/components/ToastySubscribe/LazyToastySubscribe';
import ContentFooterTutorial from '@/components/ContentFooter/ContentFooterTutorial';
import { ContentProvider } from '@/components/ContentContext';

const Tutorial = ({ frontmatter, mdx, headings }) => {
  const {
    slug,
    categorySlug,
    title,
    subtitle,
    seoTitle,
    abstract,
    noNewsletter,
    isPublished,
    humanReadableDate,
    newsletterCta,
    nextPost,
    ogExtension = 'png',
  } = frontmatter;

  const hits = useHits(slug);

  const formattedCategory = getFormattedName(categorySlug);

  const heroRef = React.useRef();

  useOverscrollBackground('var(--color-muted)', heroRef);

  const hasSubtitle = !!subtitle;

  const [
    enableSmoothScrolling,
    setEnableSmoothScrolling,
  ] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setEnableSmoothScrolling(true),
      5000
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ContentProvider
      contentType="tutorial"
      slug={slug}
      title={title}
      subtitle={subtitle}
      category={categorySlug}
      formattedCategory={formattedCategory}
      isPublished={isPublished}
      location={typeof window !== 'undefined' && window.location}
      hits={hits}
    >
      <TutorialLayout
        includeNewsletterSignup={!noNewsletter}
        newsletterCta={newsletterCta}
        hero={
          <Hero ref={heroRef}>
            <MaxWidthWrapper maxWidth="68.75rem">
              <Breadcrumbs>
                <Breadcrumbs.Crumb href="/">Home</Breadcrumbs.Crumb>
                <Breadcrumbs.Crumb href={`/tutorials`}>
                  Tutorials
                </Breadcrumbs.Crumb>
                <Breadcrumbs.Crumb
                  href={`/tutorials/${categorySlug}`}
                >
                  {formattedCategory}
                </Breadcrumbs.Crumb>
              </Breadcrumbs>

              <Title type="large-title" alone={!hasSubtitle}>
                {title}
              </Title>
              {subtitle && <Subtitle as="span">{subtitle}</Subtitle>}
            </MaxWidthWrapper>
          </Hero>
        }
      >
        <Main maxWidth="68.75rem">
          <Sidebar>
            <TableOfContents headings={headings} />
            <LikeWrapper>
              <ContentLikeButton slug={slug} />
            </LikeWrapper>
          </Sidebar>
          <Article data-layout="tutorial">
            <a id="introduction" style={{ scrollMarginTop: 70 + 48 }}>
              <h2
                style={{
                  height: '1px',
                  opacity: 0,
                  overflow: 'hidden',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                Introduction
              </h2>
            </a>

            {/* TUTORIAL CONTENTS */}
            <MDXRemote {...mdx} components={COMPONENTS} />

            <ContentFooterTutorial
              publishedOn={humanReadableDate}
              slug={slug}
              hits={hits}
              nextPost={nextPost}
            />
          </Article>
        </Main>
      </TutorialLayout>

      <SEO
        title={title}
        seoTitle={seoTitle}
        canonicalPath={`/${categorySlug}/${slug}/`}
        description={abstract}
        ogImage={`/images/og-${slug}.${ogExtension}`}
      />

      {enableSmoothScrolling && <SmoothScrolling />}

      <ToastySubscribe
        variant={categorySlug === 'career' ? 'careers' : 'default'}
      />
    </ContentProvider>
  );
};

const SmoothScrolling = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
`;

const Hero = styled.div`
  padding-top: 48px;
  padding-bottom: 36px;
  background: var(--color-muted);
  transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms;
`;

const Title = styled(Heading)`
  margin-bottom: 16px;
  font-weight: var(--font-weight-medium);

  margin-top: ${(p) => (p.alone ? 8 : 24)}px;
`;
const Subtitle = styled.span`
  display: block;
  font-size: 1.25rem;
  margin-top: -8px;
  margin-bottom: 24px;
  font-weight: var(--font-weight-book);
  color: var(--color-gray-700);
`;

const Main = styled(MaxWidthWrapper)`
  padding-top: 48px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-start; /* required for sticky sidebar */
`;

const Article = styled.article`
  flex: 1 1 42.875rem;

  /*
    Certain blog posts, like the Spring Physics intro,
    cause overflows. We want to clamp this to 100%,
    at the largest.

    IF YOU CHANGE THIS, check:
    http://localhost:8040/animation/a-friendly-introduction-to-spring-physics/
  */
  max-width: min(42.875rem, 100%);
`;

const Sidebar = styled.aside`
  flex: 0 100000 15.625rem;
  display: none;
  position: sticky;
  top: 148px;
  max-height: calc(100vh - 148px);
  overflow: auto;
  padding-bottom: 16px;
  margin-left: auto;
  /* Optical alignment */
  margin-top: 4px;

  @media (min-width: 67.75rem) {
    display: block;
  }

  @media (orientation: landscape) {
    &::-webkit-scrollbar {
      width: 4px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: var(--color-gray-300);
      transition: background-color 400ms;
    }
  }
`;

const LikeWrapper = styled.div`
  @media (min-width: 67.5rem) {
    padding-left: 32px;
  }
`;

export default Tutorial;
