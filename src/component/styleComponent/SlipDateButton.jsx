import styled from "styled-components";

const SlipDateButton = styled.button`
  position: relative;
  cursor: pointer;
  color: #555;
  transition: background-color 0.2s ease, color 0.2s ease;
  padding: 15px;
  transition: box-shadow 0.3s ease;
  
    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 10px;
        background-color: currentColor;
    }

    &:hover {
        box-shadow: 0 0 0 2px rgb(230, 230, 255);
    }

    ${({ dir }) =>
    dir === 'left'
        ? `
        &::before {
            top: calc(50% - 2px);
            transform: rotate(45deg);
        }
        &::after {
            top: calc(50% - -4px);
            transform: rotate(-45deg);
        }
        `
        : `
        &::before {
            top: calc(50% - 3px);
            transform: rotate(-45deg);
        }
        &::after {
            top: calc(50% - -4px);
            transform: rotate(45deg);
        }
        `
    }
`;

export default SlipDateButton;