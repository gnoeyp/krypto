import { NextPage } from 'next';
import KeyDial from '../components/KeyDial';
import { encodeText } from '../utils/utils';
import { useState, useMemo } from 'react';

const Quiz: NextPage = () => {
  const [message, setMessage] = useState<string>('');
  const [encryptKey, setEncryptKey] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ]);

  const encryptedMessage = useMemo(() => {
    if (message.length > 0 && encryptKey)
      return encodeText(message, encryptKey);
    return message;
  }, [encryptKey, message]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };
  const handleChangeKey = (index: number, value: number | string) => {
    const newKey = [...encryptKey];
    newKey[index] = Number(value);
    setEncryptKey(newKey);
  };

  return (
    <div>
      <h1>Today&apos;s Quiz</h1>
      <div>이건 퀴즈 메세지입니다</div>
      <KeyDial onChange={handleChangeKey} encryptKey={encryptKey} />
      <textarea
        className="w-96 border"
        value={message}
        onChange={handleChange}
      />
      <div className="h-20 w-96 border">{encryptedMessage}</div>
    </div>
  );
};

export default Quiz;
