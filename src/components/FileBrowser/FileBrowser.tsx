import { Data } from '@/pages/api/readfiles';
import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from './FileBrowser.util';

interface GameConfig {
  main_file: string;
  title: string;
  author: string;
}

interface GameButtonProps {
  file: Data;
}
const GameButton: FC<GameButtonProps> = ({ file }) => {
  const [show, setShow] = useState<boolean>(false);

  const { data } = useSWR(`${file.url}/config.json`, fetcher);

  console.log('gamebutton ', file, data);

  return (
    <>
      {!data && 'Loading...'}
      {data && <button onClick={() => setShow(!show)}>{data?.title}</button>}
      {show && (
        <div>
          <span>{data?.author}</span>
          <a
            className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
            href={`${file.url}/${data?.main_file}`}
          >
            open
          </a>
        </div>
      )}
    </>
  );
};

interface GameListProps {
  fileList: Data[];
}

const GameList: FC<GameListProps> = ({ fileList }) => {
  return (
    <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>
      {fileList.map(
        (file: Data | undefined, index: number) =>
          file && (
            <li key={`game-${index}`}>
              <GameButton file={file} />
            </li>
          ),
      )}
    </ul>
  );
};

const FileBrowser = () => {
  const { data } = useSWR('/api/readfiles', fetcher);

  return (
    <div>
      <main>
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
          Files list
        </h1>
        {!data && 'Loading...'}
        {data && <GameList fileList={data} />}
      </main>
    </div>
  );
};

export default FileBrowser;
