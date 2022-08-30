import { useState } from 'react';

type SelectBoxProps = {
  onChange: (value: number | string) => void;
  value: number;
  options: string[];
};

const SelectBox = ({ onChange, value, options }: SelectBoxProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const handleClick = () => {
    setIsSelecting(prevIsSelecting => !prevIsSelecting);
  };

  const handleClickItem = (item: number | string) => {
    onChange(item);
    setIsSelecting(false);
  };
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      onChange(Math.max(0, Number(value) - 1));
    } else {
      onChange(Math.min(18, Number(value) + 1));
    }
  };

  return (
    <div className="w-full">
      <div
        className="cursor-pointer border"
        onClick={handleClick}
        onWheel={handleWheel}
      >
        {value} {options[value]}
      </div>
      {isSelecting && (
        <div className="absolute border">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className={
                  index === value
                    ? 'cursor-pointer bg-gray-100'
                    : 'cursor-pointer bg-white hover:bg-gray-100'
                }
                onClick={() => handleClickItem(index)}
              >
                {index} {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
