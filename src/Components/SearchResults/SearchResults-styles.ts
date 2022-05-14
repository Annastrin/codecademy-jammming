import { css } from '@emotion/react';

export const search_results = css`
  width: 50%;
  height: 600px;
  overflow-y: scroll;
  padding: .88rem;
  background-color: rgba(1, 12, 63, 0.7);
  box-shadow: 0 4px 2px 2px #000000;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  @media only screen and (max-width: 1020px) {
    width: 90%;
    margin-bottom: 2rem;
  }
`;