import { io } from 'socket.io-client';

/**
 * TODO: adicionar isso em uma variável de ambiente
 */
const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL);
