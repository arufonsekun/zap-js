
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
cp .env.example .env
npm run start
```

3. Rodar o client do zap-js

```bash
cd client
npm install
npm run start
```
4. Acesse [http://localhost:3000](http://localhost:3000), você deverá ver a seguinte página:

![image](https://github.com/user-attachments/assets/04ada4fc-fc58-4551-9fdb-649beea3ed87)


### Referências

* [Flowbite](https://flowbite.com/blocks/marketing/login/)
* [Tailwind CSS Chat Web By dhaifullah](https://www.creative-tim.com/twcomponents/component/chat-web-tailwind)
