import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: var(--color-error);
  background-color: var(--color-error-background);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 3em;

  code {
    background-color: var(--color-error-background);
  }

  *:last-child {
    margin-bottom: 0;
  }
`;

export default ErrorMessage;
