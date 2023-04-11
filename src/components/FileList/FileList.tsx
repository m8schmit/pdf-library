import { Data } from '@/pages/api/readfiles';
import { FC } from 'react';

interface FileListProps {
  fileList: Data[];
}

const FileList: FC<FileListProps> = ({ fileList }) => {
  console.log('fileList ', fileList);
  return (
    <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>
      {fileList.map(
        (file: Data | undefined, index: number) =>
          file && (
            <li className='ml-6'>
              {file.isFile && (
                <a
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  key={`file-${index}`}
                  href={file.url}
                >
                  {file.name}
                </a>
              )}
              {!file.isFile && (
                <>
                  <span>{file.name}</span>
                  {file.data && <FileList fileList={file.data} />}
                </>
              )}
            </li>
          ),
      )}
    </ul>
  );
};

export default FileList;
