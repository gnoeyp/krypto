import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import { encodeText } from '../utils/utils';
import { CONSONANTS } from '../utils/constants';
import SelectBox from '../components/SelectBox';

const options = CONSONANTS.map((consonant, index) => ({
  label: `${index} ${consonant}`,
  value: index,
}));

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

  const handleChangeKey = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newKey = [...encryptKey];
    newKey[index] = Number(event.currentTarget.value);
    setEncryptKey(newKey);
  };

  const shuffle = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return [...array];
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-3xl font-bold underline">KRypto</h1>
        <h2>Make your encryption key</h2>
        <div>
          {CONSONANTS.map((consonant, index) => (
            <div key={index}>
              {consonant}
              <SelectBox
                options={options}
                onChange={event => handleChangeKey(index, event)}
                value={encryptKey[index]}
              />
            </div>
          ))}
        </div>
        <button onClick={() => setEncryptKey(shuffle(encryptKey))}>
          Shuffle
        </button>
        <h2>Enter your message</h2>
        <textarea value={message} onChange={handleChange} />
        <div>{encryptedMessage}</div>
      </div>
    </div>
  );
};

export default Home;
