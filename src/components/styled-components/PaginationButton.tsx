import styled from "styled-components";

export const PaginationButton = styled.button<{ bgColor?: string }>`
    border-radius: 3px;
    border: none;
    background: ${({ bgColor }) => bgColor ? bgColor : "#c8c2bc"};
    outline: none;
    transition: transform 0.5s;
        &: hover {
        transform: scale(1.5);
    }
        &: focus {
        background: #7c9473;
        transform: scale(1);
    }
`;