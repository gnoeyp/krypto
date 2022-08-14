type SelectBoxProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  defaultValue: number | string;
};

const SelectBox = ({ onChange, defaultValue }: SelectBoxProps) => {
  return (
    <select onChange={onChange} defaultValue={defaultValue}>
      {Array.from({ length: 19 }).map((_, index) => {
        return (
          <option key={index} value={index}>
            {index}
          </option>
        );
      })}
    </select>
  );
};

export default SelectBox;
