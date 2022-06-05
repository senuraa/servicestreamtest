import React from 'react';
import {ArrowDown, ArrowUp} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";


const SortButtons = ({onClickUp, onClickDown}:SortButtonsProps) => {
  return (
      <>
        <Button variant={'light'} className={'mx-2'} onClick={onClickUp}>
          <ArrowUp />
        </Button>
        <Button variant={'light'} className={'mx-2'} onClick={onClickDown} >
          <ArrowDown />
        </Button>
        </>
  );
};
type SortButtonsProps = {
  onClickUp: () => void
  onClickDown: () => void
}

export default SortButtons;
