import styled from "styled-components";

export const NavigButton = styled.button`
    border-radius: 3px;
    border: none;
    background: #cfdac8;
    outline: none;
    padding: 1vh 2vh;
    transition: transform 0.5s;
    color: white;
        &: hover {
        background: #7c9473;
        transform: scale(1.125);
    }
        &: focus {
        transform: scale(1);
    }
`;