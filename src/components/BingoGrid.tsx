import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
// components
import Block from './Block';
import Dropdown from './Dropdown';
import BingoCount from './BingoCount';
// helpers
import shuffleArray from '../helpers/shuffleArray';
import findCenterGrid from '../helpers/findCenterGrid';
import firework from '../helpers/fireworks';
// sound
import popSound from '../sounds/pop.wav';
import fireworksSound from '../sounds/fireworks.wav';

const popAudio = new Audio(popSound);
const fireworksAudio = new Audio(fireworksSound);

const playSound = (audioFile: HTMLAudioElement) => {
  audioFile.currentTime = 0;
  audioFile.play();
};

const phrasesArray = [
  'phrase',
  'phrase1',
  'phrase2',
  'phrase3',
  'phrase4',
  'phrase5',
  'phrase6',
  'phrase7',
  'phrase8',
  'phrase9',
  'phrase10',
  'phrase11',
  'phrase12',
  'phrase13',
  'phrase14',
  'phrase15',
  'phrase16',
  'phrase17',
  'phrase18',
  'phrase19',
  'phrase20',
  'phrase21',
  'phrase22',
  'phrase23',
  'phrase24',
  'phrase25',
];

const gridOptions = [
  {
    label: 'sm',
    value: 9,
  },
  {
    label: 'lg',
    value: 25,
  },
];

const BingoGridContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin: auto auto 0.5em;
`;

const BlocksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const BingoGrid = () => {
  const [gridSize, setGridSize] = useState(gridOptions[0]);

  // The index of the most recent block clicked
  const [blockClicked, setBlockClicked] = useState(-1);

  const [phrases, setPhrases] = useState(
    shuffleArray(phrasesArray)
      .slice(0, gridSize.value)
      .map((item) => ({ msg: item, strike: false })),
  );

  // An array to keep track of the bingos
  const [winningArray, setWinningArray] = useState([false]);

  const centerIndex = useMemo(() => findCenterGrid(gridSize.value), [gridSize]);

  const updateWinning = (win: boolean, index: number) => {
    if (win && !winningArray[index]) {
      setWinningArray((prevState) => {
        const newArr = [...prevState];
        newArr[index] = true;
        return newArr;
      });
      return true;
    }
    return false;
  };

  const checkHorizontal = (index: number, width: number) => {
    // check row
    const rowIndex = Math.floor(index / width);
    const row = [];
    for (let i = rowIndex * width; i < rowIndex * width + width; i++) {
      row.push(phrases[i]);
    }

    const win = row.filter((item) => item?.strike).length === width;

    return updateWinning(win, width + rowIndex);
  };

  const checkVertical = (index: number, width: number) => {
    // check column
    const colIndex = index % width;
    const col = [];
    for (let i = colIndex; i < gridSize.value; i = i + width) {
      col.push(phrases[i]);
    }

    const win = col.filter((item) => item?.strike).length === width;

    return updateWinning(win, colIndex);
  };

  const checkDiagonal = (index: number, width: number) => {
    // check top left to bottom right
    const diagonalDown = [];
    for (let i = 0; i < gridSize.value; i = i + width + 1) {
      diagonalDown.push(phrases[i]);
    }
    const downWin =
      diagonalDown.filter((item) => item?.strike).length === width;

    // check bottom left to top right
    const diagonalUp = [];
    for (let i = width - 1; i < gridSize.value - 1; i = i + width - 1) {
      diagonalUp.push(phrases[i]);
    }
    const upWin = diagonalUp.filter((item) => item?.strike).length === width;

    // all checks don't need to be called for correct bingo count (intersection)
    return (
      updateWinning(upWin, winningArray.length - 1) ||
      updateWinning(downWin, winningArray.length - 2)
    );
  };

  const checkWinning = (index: number) => {
    const width = Math.sqrt(gridSize.value);
    // all checks need to be called for correct bingo count (union)
    const verticalCheck = checkVertical(index, width);
    const horizontalCheck = checkHorizontal(index, width);
    const diagonalCheck = checkDiagonal(index, width);
    return verticalCheck || horizontalCheck || diagonalCheck;
  };

  const handleBlockClick = useCallback(
    (index: number) => {
      setPhrases(
        phrases.map((item, i) =>
          i === index ? { ...item, strike: true } : item,
        ),
      );
      setBlockClicked(index);
      playSound(popAudio);
    },
    [phrases],
  );

  const handleSizeChange = useCallback((event: BaseSyntheticEvent) => {
    const newGridSize =
      gridOptions.find((element) => element.value === event.target.value) ||
      gridOptions[0];
    setGridSize(newGridSize);
  }, []);

  // setup
  useEffect(() => {
    setPhrases(
      shuffleArray(phrasesArray)
        .slice(0, gridSize.value)
        .map((item, index) =>
          index === centerIndex
            ? { msg: item, strike: true }
            : { msg: item, strike: false },
        ),
    );

    // number of possible bingos
    const size = Math.sqrt(gridSize.value) * 2 + 2;
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(false);
    }
    setWinningArray(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerIndex]);

  // check if user is winning after block is clicked
  useEffect(() => {
    if (checkWinning(blockClicked)) {
      firework();
      playSound(fireworksAudio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockClicked]);

  const Blocks = phrases.map((item, index) =>
    index === centerIndex ? (
      <Block
        key={`block-${index}`}
        width={Math.sqrt(gridSize.value)}
        index={index}
        msg="Bingo"
        strike={true}
        handleClick={handleBlockClick}
      />
    ) : (
      <Block
        key={`block-${index}`}
        width={Math.sqrt(gridSize.value)}
        index={index}
        msg={item.msg}
        strike={item.strike}
        handleClick={handleBlockClick}
      />
    ),
  );

  return (
    <BingoGridContainer>
      <Options>
        <BingoCount
          count={winningArray.filter((item) => item).length}
          size={winningArray.length}
        />
        <Dropdown
          gridSize={gridSize}
          gridOptions={gridOptions}
          handleChange={handleSizeChange}
        />
      </Options>
      <BlocksContainer>{Blocks}</BlocksContainer>
    </BingoGridContainer>
  );
};

export default BingoGrid;
