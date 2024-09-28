import dotenv from 'dotenv';
import createApp from './src/App.js';

dotenv.config();
const app = createApp();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`zap-js api running on port ${PORT}`);
});