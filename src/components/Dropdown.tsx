import React, { BaseSyntheticEvent, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

interface GridOptionsInterface {
  label: string;
  value: number;
}
interface MenuInterface {
  gridSize: GridOptionsInterface;
  gridOptions: GridOptionsInterface[];
  handleChange: (arg0: BaseSyntheticEvent) => void;
}

const Dropdown = (props: MenuInterface) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const MenuItems = props.gridOptions.map((item, index) => (
    <MenuItem key={`dropdown-${index}`} value={item.value}>
      {item.label}
    </MenuItem>
  ));

  return (
    <FormControl>
      <InputLabel>Size:</InputLabel>
      <Select
        id="menu-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={props.handleChange}
        value={props.gridSize.value}
      >
        {MenuItems}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
