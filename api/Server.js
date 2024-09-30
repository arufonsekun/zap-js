import dotenv from 'dotenv';
import createApp from './src/App.js';
import { Socket } from 'socket.io';

dotenv.config();
createApp();