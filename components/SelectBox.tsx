import { useEffect, useState } from 'react';

type Option = {
  label: string;
  value: any;
};

type SelectBoxProps = {
  onChange: (value: number | string) => void;
  value: number | string;
  options: Option[];
};

const SelectBox = ({ onChange, value, options }: SelectBoxProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const handleClick = () => {
    setIsSelecting(true);
  };

  const handleClickItem = (item: number | string) => {
    onChange(item);
    setIsSelecting(false);
  };

  return (
    <div>
      <div className="border" onClick={handleClick}>
        {value}
      </div>
      {isSelecting && (
        <div className="absolute border">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => handleClickItem(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  /*
  return (
    <select
      className="w-20 border bg-black"
      onChange={onChange}
      value={Number(value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
  */
};

export default SelectBox;
