import { CONSONANTS } from '../utils/constants';
import SelectBox from './SelectBox';

type KeyDialProps = {
  onChange: (index: number, value: number) => void;
  encryptKey: number[];
};

const KeyDial = ({ onChange, encryptKey }: KeyDialProps) => {
  const singleConsonants = CONSONANTS.filter((_, index) => {
    return ![1, 4, 8, 10, 13].includes(index);
  });
  return (
    <div className="flex p-2">
      {singleConsonants.map((consonant, index) => (
        <div key={index} className="flex w-20 flex-col items-center border">
          <div className="text-center">{consonant}</div>
          <SelectBox
            options={singleConsonants}
            onChange={value => onChange(index, value)}
            value={encryptKey[index]}
          />
        </div>
      ))}
    </div>
  );
};

export default KeyDial;
