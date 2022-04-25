import { css } from '@emotion/react';

export const track = css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(256, 256, 256, 0.8);
`;

export const track_information = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 72px;

  h3 {
    margin-bottom: .22rem;
  }

  p {
    font-size: .83rem;
    font-weight: 300;
    color: rgba(256, 256, 256, 0.8);
  }
`;

export const track_action = css`
  cursor: pointer;
  padding: .5rem;
  font-size: 1.05rem;
  transition: color .25s;
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;

  &:hover {
    color: rgba(265, 265, 265, .5);
  }
`;
