import React from 'react';
import styled from 'styled-components';

import VisuallyHidden from '../VisuallyHidden';
import Tooltip from '../Tooltip';
import UnstyledButton from '../UnstyledButton';
import Em from '../Em';

const MAIN_AREA_HEIGHT = 250;
const LABEL_SHORT_DISTANCE = 16;
const LABEL_LONG_DISTANCE = 58;

const BarGraph = ({ scale, maxWidth, data }) => {
  return (
    <>
      <Graph aria-hidden={true}>
        <Bars style={{ maxWidth }}>
          {data.map((item, index) => {
            return (
              <Column key={item.id}>
                <BarWrapper>
                  <Tooltip
                    type="static"
                    content={
                      <>
                        {item.label} –{' '}
                        <Em style={{ color: 'var(--color-background)' }}>
                          {item.value}%
                        </Em>
                      </>
                    }
                  >
                    <Bar
                      style={{
                        height: (item.value / scale) * MAIN_AREA_HEIGHT,
                      }}
                    />
                  </Tooltip>
                </BarWrapper>
                <Label type={index % 2 === 0 ? 'even' : 'odd'}>
                  {item.label}
                </Label>
              </Column>
            );
          })}
        </Bars>
        <XAxis />
      </Graph>
      <LabelSpacing />
      <VisuallyHidden>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  <td>{item.value}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </VisuallyHidden>
    </>
  );
};

const Graph = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 64px;
`;

const Bars = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`;

const Column = styled.div`
  position: relative;
  flex: 1;
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: ${MAIN_AREA_HEIGHT}px;
`;

const Bar = styled(UnstyledButton)`
  position: relative;
  width: 75%;
  max-width: 50px;
  background: linear-gradient(
    90deg,
    hsl(320deg, 100%, 47%),
    hsl(326deg, 100%, 50%),
    hsl(322deg, 100%, 45%)
  );
  border-radius: 10px 10px 0 0;
  cursor: default;

  &:focus {
    outline: none;
    background: hsl(320deg, 100%, 65%);
  }

  &:after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    height: 5px;
    width: 50%;
    border-left: 3px solid hsla(0deg, 0%, 100%, 0.2);
    border-top: 3px solid hsla(0deg, 0%, 100%, 0.2);
    border-radius: 60%;
    mix-blend-mode: screen;
  }
`;

const XAxis = styled.div`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  left: -8px;
  right: -8px;
  top: ${MAIN_AREA_HEIGHT}px;
  height: 4px;
  background: var(--color-gray-900);
  border-radius: 10px;
  transform: translateY(-50%);
`;

const LabelSpacing = styled.div`
  height: 64px;
`;

const Label = styled.div`
  position: absolute;
  top: ${p =>
    p.type === 'odd'
      ? MAIN_AREA_HEIGHT + LABEL_SHORT_DISTANCE
      : MAIN_AREA_HEIGHT + LABEL_LONG_DISTANCE}px;
  left: -25%;
  right: -25%;
  text-align: center;
  color: var(--color-gray-700);
  font-size: 14px;
  line-height: 1;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin-left: auto;
    margin-right: auto;
    width: 1px;
    height: ${p =>
      p.type === 'odd' ? LABEL_SHORT_DISTANCE : LABEL_LONG_DISTANCE}px;
    background: var(--color-gray-700);
    transform: translateY(-100%);
  }
`;

export default BarGraph;
