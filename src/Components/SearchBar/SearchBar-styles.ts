import { css } from '@emotion/react';

export const searchBar = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6.94rem;
  margin-bottom: 6.33rem;

  & input {
    width: 287px;
    padding: .88rem 0;
    border: 1px solid #fff;
    border-radius: 3px;
    margin-bottom: 2.22rem;
    color: #010c3f;
    text-align: center;
    font-size: 1rem;
  }

  & input:focus {
    outline: none;
  }
`;

export const searchButton = css`
  cursor: pointer;
  width: 8.11rem;
  padding: .77rem 0;
  border-radius: 54px;
  background-color: #010c3f;
  text-align: center;
  font-size: .833rem;
  transition: background-color .25s;
  border: 0px;
  color: #fff;
  font-weight: 500;

  &:hover {
    background-color: rgba(108, 65, 233, .7);
  }
`;