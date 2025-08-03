import styled from "styled-components"

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;

    button {
      padding: 0;
      border-radius: 100%;
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-content: center;
      background-color: transparent;
      transition: transform 0.3s ease-in-out;
      
        img{
            margin: auto;      
        }
        &:hover{
            transform: scale(1.2);
        }
    }
`;

export default ButtonGroup;