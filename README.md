## Build instructions

- Clone the project

- install the necessary dependencies

```bash
  npm install
```

- build the project

```bash
 npm run build
```

- run the project

```bash
 npm run start
```

The project should be running on [http://localhost:3000](http://localhost:3000)

### Important

- I have added test Mongo url in the code, just to make things fast.
- I have included my API-KEY for coin API in the env file.
- I am aware that it is standard practice to exclude these types of files from Git repositories. However, to expedite your review process, I have included them in this instance.
- Data will polled for every 60 seconds.
- Polling will be started when user first visit our page to keep it simple.
