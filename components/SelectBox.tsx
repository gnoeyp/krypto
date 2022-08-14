type Option = {
  label: string;
  value: any;
};

type SelectBoxProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  defaultValue: number | string;
  options: Option[];
};

const SelectBox = ({ onChange, defaultValue, options }: SelectBoxProps) => {
  return (
    <select onChange={onChange} defaultValue={defaultValue}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
