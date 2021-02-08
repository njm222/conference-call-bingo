import React from 'react';
import styled from 'styled-components';

interface BlockPropsInterface {
  width: number;
  index: number;
  msg: string;
  strike: boolean;
  handleClick: (arg0: number) => void;
}

interface BlockStylePropsInterface {
  width: number;
  strike: boolean;
}

const BlockContainer = styled.div`
  cursor: pointer;
  width: ${(props: BlockStylePropsInterface) => 90 / props.width}%;
  height: ${(props: BlockStylePropsInterface) => 65 / props.width}vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px dashed #000;
  transition: all ease-in 500ms;
  background: ${(props: BlockStylePropsInterface) =>
    props.strike ? '#D6E4FF' : '#B4C2FF'};
  opacity: ${(props: BlockStylePropsInterface) => (props.strike ? '0.5' : '1')};
  text-decoration: ${(props: BlockStylePropsInterface) =>
    props.strike ? 'line-through' : 'unset'};
  pointer-events: ${(props: BlockStylePropsInterface) =>
    props.strike ? 'none' : 'unset'};
`;

const Block = (props: BlockPropsInterface) => {
  return (
    <BlockContainer
      onClick={() => props.handleClick(props.index)}
      width={props.width}
      strike={props.strike}
    >
      <h5>{props.msg}</h5>
    </BlockContainer>
  );
};

export default Block;
