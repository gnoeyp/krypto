import { CONSONANTS } from '../utils/constants'
import SelectBox from './SelectBox';

type KeyDialProps = {
  onChange: (index: number, value: number) => void
  encryptKey: number[]
}

const KeyDial = ({ onChange, encryptKey }: KeyDialProps) => {
  return (
    <div className="flex p-2">
      {CONSONANTS.map((consonant, index) => (
        <div key={index} className="flex w-20 flex-col items-center border">
          <div className="text-center">{consonant}</div>
          <SelectBox
            options={CONSONANTS}
            onChange={value => onChange(index, value)}
            value={encryptKey[index]}
          />
        </div>
      ))}
    </div>
  );
};

export default KeyDial
