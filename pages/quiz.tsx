import { NextPage } from 'next';
import KeyDial from '../components/KeyDial';
import { encodeText, shuffle } from '../utils/utils';
import { useState, useMemo, useEffect } from 'react';

const messages = [
  '편견은 내가 다른 사람을 사랑하지 못하게 하고 오만은 다른 사람이 나를 사랑하지 못하게 한다',
  '아픔이 있으면 회복이 있듯이 너의 인생도 곧 꽃들이 활짝 필 것이다',
];

const Quiz: NextPage = () => {
  const [message, setMessage] = useState<string>('');
  const [encryptKey, setEncryptKey] = useState<number[]>([]);
  const [decryptKey, setDecryptKey] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ]);

  useEffect(() => {
    setMessage(messages[0]);
    setEncryptKey(
      shuffle([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ]),
    );
  }, []);

  const encryptedMessage = useMemo(() => {
    if (message.length > 0 && encryptKey)
      return encodeText(message, encryptKey);
    return message;
  }, [encryptKey, message]);

  const decryptedMessage = useMemo(() => {
    if (encryptedMessage && encryptedMessage.length > 0 && decryptKey)
      return encodeText(encryptedMessage.join(''), decryptKey);
    return encryptedMessage;
  }, [decryptKey, encryptedMessage]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleChangeKey = (index: number, value: number | string) => {
    const newKey = [...decryptKey];
    newKey[index] = Number(value);
    setDecryptKey(newKey);
  };

  return (
    <div>
      <h1>Today&apos;s Quiz</h1>
      <div>{encryptedMessage}</div>
      <div>{decryptedMessage}</div>
      <KeyDial onChange={handleChangeKey} encryptKey={decryptKey} />
    </div>
  );
};

export default Quiz;
