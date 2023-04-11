This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Add files
- Create a `files` folder in `~/public`.
- In this file folder each sub-folder containing a `config.json` file are considered as "main pdf folder".
- Then all the sub-folders of this "main pdf folder" will be considered as "secondary files folders".

Currently the `config.json` look like this: 


```json
{
  "main_file": string,
  "title": string,
  "author": string
}
```

It will certainly change in the next iterations.

- finally run `docker-compose up`; the app should be visible on `http://localhost:4222/`.

