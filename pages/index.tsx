import type { NextPage } from 'next';
import { useState, useMemo } from 'react';
import { encodeText, shuffle } from '../utils/utils';
import KeyDial from '../components/KeyDial';

const Home: NextPage = () => {
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
    <div className="flex flex-col items-center p-20">
      <h1 className="text-3xl font-bold">KRypto</h1>
      <h2 className="text-xl">Make your encryption key</h2>

      <div className="flex flex-col items-center p-5">
        <KeyDial onChange={handleChangeKey} encryptKey={encryptKey} />
        <button
          className="w-36 border bg-gray-100 p-1 text-gray-800 hover:bg-gray-200"
          onClick={() => setEncryptKey(shuffle(encryptKey))}
        >
          Shuffle
        </button>
      </div>
      <div className="flex flex-col items-center p-5">
        <h2 className="text-xl">Enter your message</h2>
        <textarea
          className="w-96 border"
          value={message}
          onChange={handleChange}
        />
        <div className="h-20 w-96 border">{encryptedMessage}</div>
      </div>
    </div>
  );
};

export default Home;
