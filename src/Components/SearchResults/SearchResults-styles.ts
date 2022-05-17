import { css } from '@emotion/react';

export const search_results = css`
  width: 50%;
  height: 600px;
  overflow-y: scroll;
  padding: 2.27rem 1.16rem;
  background-color: rgba(1, 12, 63, 0.7);
  box-shadow: 0 4px 2px 2px #000000;
  scrollbar-width: none;

  h2 {
    line-height: 45px;
    border-bottom: 1px solid #6f6f6f;
  }

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  @media only screen and (max-width: 1020px) {
    width: 90%;
    margin-bottom: 2rem;
  }
`;