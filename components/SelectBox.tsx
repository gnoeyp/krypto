type Option = {
  label: string;
  value: any;
};

type SelectBoxProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: number | string;
  options: Option[];
};

const SelectBox = ({ onChange, value, options }: SelectBoxProps) => {
  return (
    <select onChange={onChange} value={Number(value)}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
