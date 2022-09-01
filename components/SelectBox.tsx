import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type SelectBoxProps = {
  onChange: (value: number) => void;
  value: number;
  options: string[];
};

const SelectBox = ({ onChange, value, options }: SelectBoxProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const handleClick = () => {
    setIsSelecting(prevIsSelecting => !prevIsSelecting);
  };

  const handleClickItem = (item: number) => {
    onChange(item);
    setIsSelecting(false);
  };
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      onChange(Math.max(0, Number(value) - 1));
    } else {
      onChange(Math.min(13, Number(value) + 1));
    }
  };

  return (
    <div className="w-full">
      <div
        className="flex cursor-pointer justify-between border"
        onClick={handleClick}
        onWheel={handleWheel}
      >
        <div className="px-1">{value}</div>
        <div>{options[value]}</div>
        <div className="px-1 text-slate-500">
          <FontAwesomeIcon icon={faSort} />
        </div>
      </div>
      {isSelecting && (
        <div className="absolute w-20 border">
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
