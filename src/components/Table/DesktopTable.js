import React from 'react';
import styled from 'styled-components';

const DesktopTable = ({
  data,
  fields,
  mobileHeadingLevel = 'h2',
  ...delegated
}) => {
  const [hovering, setHovering] = React.useState(null);

  return (
    <Wrapper {...delegated} onMouseLeave={() => setHovering(null)}>
      <thead>
        <tr>
          {fields.map(field => (
            <th
              key={field.key}
              style={{
                flex: field.flex,
                minWidth: field.minWidth,
              }}
            >
              {field.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr
            key={item.slug}
            onMouseEnter={() => setHovering(item.slug)}
            style={{
              '--highlight-opacity': hovering === item.slug ? 0.6 : 0,
            }}
          >
            {fields.map(field => {
              const renderMethod = field.renderDesktop;

              return (
                <td
                  key={field.key}
                  style={{ flex: field.flex, minWidth: field.minWidth }}
                >
                  {renderMethod ? (
                    renderMethod(item)
                  ) : (
                    <TextTruncate>{item[field.key]}</TextTruncate>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Wrapper>
  );
};

const Wrapper = styled.table`
  width: 100%;
  display: none;

  @media ${p => p.theme.breakpoints.mdAndLarger} {
    display: block;
  }

  th {
    text-align: left;
    font-weight: var(--font-weight-bold);
    font-size: 13px;
    text-transform: uppercase;
    color: var(--color-gray-700);
    padding: 6px 14px;
    border-bottom: 3px solid var(--color-gray-700);

    &:last-of-type {
      padding-right: 0;
    }
  }

  tr {
    display: flex;
    position: relative;
  }

  tbody tr:first-of-type:after {
    border-radius: 0 0 16px 16px;
  }

  tbody tr:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0px;
    right: 0;
    bottom: 0;
    background: var(--color-muted);
    border-radius: 16px;
    pointer-events: none;
    opacity: var(--highlight-opacity);
    transition: opacity 200ms;
  }

  td {
    font-size: 15px;
    padding: 14px;

    &:first-of-type {
      font-weight: var(--font-weight-medium);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* padding-left: 0; */

      a {
        color: var(--color-primary);
        text-decoration: none;
      }
    }

    &:last-of-type {
      padding-right: 0;
    }
  }
`;

const TextTruncate = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 48px;
  overflow: hidden;
`;

export default DesktopTable;
