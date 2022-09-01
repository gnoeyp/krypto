import { NextPage } from 'next';
import KeyDial from '../components/KeyDial';
import { encodeText, shuffle } from '../utils/utils';
import { useState, useMemo, useEffect } from 'react';

type QuizProps = {
  message: string;
};

export async function getServerSideProps() {
  const { messages } = await import('../data.json');

  const message = messages[Math.floor(Math.random() * messages.length)];

  const encryptKey = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  console.log(encryptKey);

  const encryptedMessage = encodeText(message, encryptKey);

  return {
    props: {
      message: encryptedMessage,
    },
  };
}

const Quiz: NextPage<QuizProps> = ({ message }) => {
  const [decryptKey, setDecryptKey] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ]);

  const decryptedMessage = useMemo(() => {
    if (message && message.length > 0 && decryptKey)
      return encodeText(message, decryptKey);
    return message;
  }, [decryptKey, message]);

  const handleChangeKey = (index: number, value: number | string) => {
    const newKey = [...decryptKey];
    newKey[index] = Number(value);
    setDecryptKey(newKey);
  };

  return (
    <div>
      <h1>Today&apos;s Quiz</h1>
      <div>Encrypted: {message}</div>
      <div>Decrypted: {decryptedMessage}</div>
      <KeyDial onChange={handleChangeKey} encryptKey={decryptKey} />
      <button>Submit</button>
    </div>
  );
};

export default Quiz;
