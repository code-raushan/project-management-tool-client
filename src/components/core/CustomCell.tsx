// CustomCell.tsx
import React from "react";
import SelectEditor from "./Selector";

type CustomCellProps = {
  cell: any;
  getValue: () => string;
  onChange: (value: string) => void;
};

const CustomCell: React.FC<CustomCellProps> = ({
  cell,
  getValue,
  onChange,
}) => {
  if (cell.customEditor) {
    return (
      <SelectEditor
        getValue={getValue}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  return <span>{cell.value}</span>;
};

export default CustomCell;
