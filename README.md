## zap-js

### Como executar

1. Subir container com o mongo

```bash
docker pull mongo
docker run --name my-mongo -d -p 27017:27017 mongo
```

2. Rodar a api

```bash
cd api
npm install
npm run start
```

3. Rodar o client do zap-js

```bash
cd client
npm install
npm run start
```