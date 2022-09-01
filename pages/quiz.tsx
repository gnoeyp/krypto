import { NextPage } from 'next';
import KeyDial from '../components/KeyDial';
import { encodeText, shuffle, Keys } from '../utils/utils';
import { useState, useMemo, useEffect } from 'react';

type QuizProps = {
  answer: string;
  message: string;
};

export async function getServerSideProps() {
  const { messages } = await import('../data.json');

  const id = Math.floor(Math.random() * messages.length);

  const message = messages[id];
  const encryptKey = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  const encryptedMessage = encodeText(message, encryptKey);

  return {
    props: {
      message: encryptedMessage,
      answer: message,
    },
  };
}

const Quiz: NextPage<QuizProps> = ({ answer, message }) => {
  const [answered, setAnswered] = useState<boolean>(false);
  const [decryptKey, setDecryptKey] = useState<Keys[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ]);

  const decryptedMessage = useMemo(() => {
    if (message && message.length > 0 && decryptKey)
      return encodeText(message, decryptKey);
    return message;
  }, [decryptKey, message]);

  const handleChangeKey = (index: number, value: number | string) => {
    const newKey = [...decryptKey];
    newKey[index] = Number(value) as Keys;
    setDecryptKey(newKey);
  };

  return (
    <div>
      <h1>Today&apos;s Quiz</h1>
      <div>Encrypted: {message}</div>
      <div>Decrypted: {decryptedMessage}</div>
      <KeyDial onChange={handleChangeKey} encryptKey={decryptKey} />
      <button
        onClick={() => {
          if (answer === decryptedMessage) {
            setAnswered(true);
          }
        }}
        disabled={answered}
      >
        Submit
      </button>
      <div>{answered && 'Correct!'}</div>
    </div>
  );
};

export default Quiz;
