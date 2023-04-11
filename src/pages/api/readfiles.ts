import { readdirSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { join, resolve } from 'path';

export interface Data {
  isMainFolder: boolean;
  name: string;
  url: string;
  isFile: boolean;
  data?: Data[];
}

export default (_req: NextApiRequest, res: NextApiResponse<Data[]>) => {
  const dirRelativeToPublicFolder = 'files';

  const getPath = (url: string) => resolve('./public', url);

  const formatUrl = (path: string, filenames: string) =>
    join(
      '/',
      path.substring(path.search(dirRelativeToPublicFolder), path.length),
      filenames,
    );

  const isMainFolder = (files: Data[]) =>
    !!files && !!files.find(({ name }) => name === 'config.json');

  const flatMainFolder = (files: Data[], filteredFolders: Data[]) =>
    files.forEach((file) => {
      if (file.isMainFolder) {
        filteredFolders.push(file);
      }
      if (file.data) {
        flatMainFolder(file.data, filteredFolders);
      }
    });

  const getDirFiles = (path: string): Data[] => {
    const filenames = readdirSync(path, { withFileTypes: true });
    return filenames.map((file) => {
      const url = formatUrl(path, file.name);
      return {
        isMainFolder:
          !file.isFile() &&
          isMainFolder(getDirFiles(getPath(url.substring(1, url.length)))),
        name: file.name,
        url,
        isFile: file.isFile(),
        ...(!file.isFile() && {
          data: getDirFiles(getPath(url.substring(1, url.length))),
        }),
      };
    });
  };

  const filteredFolders: Data[] = [];
  flatMainFolder(
    getDirFiles(getPath(dirRelativeToPublicFolder)),
    filteredFolders,
  );

  res.status(200).json(filteredFolders);
};
