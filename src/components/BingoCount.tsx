import React, { memo } from 'react';

interface BingoCountInterface {
  count: number;
  size: number;
}

const BingoCount = (props: BingoCountInterface) => {
  return (
    <p>
      <strong>Bingo Count:</strong> {props.count}/{props.size}
    </p>
  );
};

export default memo(BingoCount);
