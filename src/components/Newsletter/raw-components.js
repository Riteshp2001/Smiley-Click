import React from 'react';

import { COLORS, FONT_STACK } from './constants';

export function LargeHeading({ children }) {
  return (
    <h2
      style={{
        fontSize: 28,
        fontFamily: FONT_STACK,
        fontWeight: 500,
        color: COLORS.tertiary,
        WebkitFontSmoothing: 'antialiased',
        marginTop: 64,
        marginBottom: 16,
      }}
    >
      {children}
    </h2>
  );
}

export function SmallHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: 23,
        fontFamily: FONT_STACK,
        fontWeight: 500,
        color: COLORS.text,
        WebkitFontSmoothing: 'antialiased',
        marginTop: 48,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  );
}

export function VerySmallHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: 20,
        fontFamily: FONT_STACK,
        fontWeight: 500,
        color: COLORS.text,
        WebkitFontSmoothing: 'antialiased',
        marginTop: 48,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  );
}

export function Paragraph({ children, style = {} }) {
  return (
    <p
      style={{
        fontSize: 16,
        marginTop: 0,
        marginBottom: 24,
        lineHeight: 1.5,
        fontFamily: FONT_STACK,
        WebkitFontSmoothing: 'antialiased',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function SmallParagraph({ children, style = {} }) {
  return (
    <p
      style={{
        fontSize: 14,
        marginTop: 0,
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 1.5,
        fontFamily: FONT_STACK,
        WebkitFontSmoothing: 'antialiased',
        padding: '0px 24px',
        fontStyle: 'italic',
        color: COLORS.gray[700],
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Section({ children }) {
  return (
    <section
      style={{
        marginBottom: 32,
      }}
    >
      {children}
    </section>
  );
}

export function UnorderedList({ style = {}, children }) {
  return (
    <ul
      style={{
        fontSize: 16,
        padding: 0,
        margin: 0,
        marginBottom: 32,
        listStyle: 'none',
        ...style,
      }}
    >
      {children}
    </ul>
  );
}

export function ListItem({ style = {}, children }) {
  return (
    <li
      style={{
        marginBottom: 16,
        fontSize: 16,
        lineHeight: 1.4,
        fontFamily: FONT_STACK,
        color: COLORS.text,
        WebkitFontSmoothing: 'antialiased',
        ...style,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          paddingRight: 16,
          paddingTop: 0,
          height: 22,
          verticalAlign: 'middle',
          transform: 'translateY(-2px)',
        }}
      >
        <img
          alt=""
          src="https://www.joshwcomeau.com/images/newsletter/bullet-2x.png"
          style={{
            display: 'block',
            height: 16,
            width: 16,
            transform: 'translateY(2px)',
          }}
        />
      </span>
      {children}
    </li>
  );
}

export function Anchor(props) {
  return <a style={{ color: COLORS.primary }} {...props} />;
}

export function Pre({ children, style = {} }) {
  return (
    <pre
      style={{
        fontSize: 18,
        marginTop: 0,
        marginBottom: 32,
        marginLeft: 32,
        marginRight: 32,
        lineHeight: 1.4,
        fontWeight: 400,
        fontFamily: 'monospace',
        color: COLORS.text,
        WebkitFontSmoothing: 'antialiased',
        ...style,
      }}
    >
      {children}
    </pre>
  );
}

export const NewsletterLinkToPost = ({
  title,
  href,
  categories,
  imageSrc,
  summary,
}) => {
  return (
    <article>
      <a href={href}>
        <img
          alt=""
          src={imageSrc}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: 550,
            borderRadius: 10,
            marginBottom: 16,
          }}
        />
      </a>
      <h4 style={{ marginBottom: 8 }}>
        <a
          href={href}
          style={{
            fontSize: 22,
            fontWeight: 400,
            WebkitFontSmoothing: 'antialiased',
            textDecoration: `none`,
            color: COLORS.primary,
            fontFamily: FONT_STACK,
          }}
        >
          {title}
        </a>{' '}
        {categories && (
          <>
            —{' '}
            {categories.map((cat, index) => (
              <React.Fragment key={cat}>
                <span
                  style={{
                    fontSize: 16,
                    color: COLORS.gray[700],
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontFamily: FONT_STACK,
                  }}
                >
                  {cat}
                  {index !== categories.length - 1 && ', '}
                </span>
              </React.Fragment>
            ))}
          </>
        )}
      </h4>
      <Paragraph>{summary}</Paragraph>
    </article>
  );
};

export const SubscriberGreeting = ({ fallback, children }) => {
  const mergeTag = `​{% if subscriber.first_name != blank %}
    ${children('{{ subscriber.first_name }}')}
  {% else %}
    ${fallback}
  {% endif %}`;

  return <Paragraph>{mergeTag}</Paragraph>;
};

export function ViewOnline({ webUrl }) {
  return (
    <a
      href={webUrl}
      style={{
        display: 'block',
        background: COLORS.gray[100],
        borderRadius: 8,
        fontSize: 14,
        color: COLORS.gray[700],
        WebkitFontSmoothing: 'antialiased',
        padding: '12px 16px',
        marginBottom: 32,
        fontWeight: 400,
        opacity: 0.9,
        textDecoration: 'none',
        fontFamily: FONT_STACK,
        textAlign: 'center',
      }}
    >
      Trouble viewing this email?{' '}
      <span
        style={{
          color: COLORS.primary,
          fontWeight: 400,
        }}
      >
        Read it online
      </span>
    </a>
  );
}

export const Blockquote = ({ children, style = {} }) => (
  <blockquote
    style={{
      marginLeft: 32,
      fontStyle: 'italic',
      color: COLORS.gray[700],
      maxWidth: 500,
      ...style,
    }}
  >
    {children}
  </blockquote>
);

export const Strong = ({ children, style = {} }) => (
  <strong style={{ fontWeight: 600, ...style }}>{children}</strong>
);

export const Image = ({
  src,
  style = {},
  marginBottom = 32,
  ...delegated
}) => {
  // Automatically prefix the blog if it's not present.
  if (!src.match(/^http/i)) {
    src = `https://www.joshwcomeau.com${src}`;
  }

  return (
    <table
      width="100%"
      border="0"
      cellSpacing="0"
      cellPadding="0"
      style={{ marginBottom }}
    >
      <tr>
        <td align="center">
          <img
            src={src}
            style={{ marginBottom: 0, ...style }}
            {...delegated}
          />
        </td>
      </tr>
    </table>
  );
};

export const HorizontalRule = ({ children, style = {} }) => (
  <table
    width="100%"
    border="0"
    cellSpacing="0"
    cellPadding="0"
    style={{ marginTop: 48, marginBottom: 48 }}
  >
    <tr>
      <td align="center">
        <img
          alt=""
          src="https://www.joshwcomeau.com/images/horizontal-rule.png"
          width={418 / 4}
          height={58 / 4}
          style={{
            marginBottom: 0,
          }}
        />
      </td>
    </tr>
  </table>
);

export const RawOnly = ({ fallback, children }) => {
  return children;
};

export default {
  p: Paragraph,
  Paragraph,
  h1: LargeHeading,
  h2: SmallHeading,
  h3: VerySmallHeading,
  section: Section,
  ul: UnorderedList,
  li: ListItem,
  a: Anchor,
  pre: Pre,
  spicy: Strong,
  strong: Strong,
  blockquote: Blockquote,
  img: Image,
  NewsletterLinkToPost,
  SubscriberGreeting,
  ViewOnline,
  hr: HorizontalRule,
  SmallParagraph,
  RawOnly,
};
