'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { socket } from '../socket';

export default function Chat() {
    const { user: currentUser, logout } = useAuth();
    const [users, setUsers] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chattingWith, setChattingWith] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [userStatus, setUserStatus] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users', {
                    method: 'GET',
                });
                const data = await response.json();
                const usersById = data.reduce((acc, user) => {
                    acc[user.uuid] = user;
                    return acc;
                }, {});
                setUsers(usersById);
            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!chattingWith) {
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `/api/messages?senderId=${currentUser.uuid}&recipientId=${chattingWith.uuid}`,
                    {
                        method: 'GET',
                    }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessages(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMessages();
    }, [chattingWith]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        const hasListener = socket.listeners('userstatus').length;
        if (hasListener) {
            return;
        }

        socket.on('userstatus', (payload) => {
            setUserStatus((prev) => ({
                ...prev,
                [payload.uuid]: payload.status,
            }));
        });

        socket.emit('online', {
            uuid: currentUser.uuid,
        });

        socket.on('onlineusers', async ({ onlineUsers }) => {
            setUserStatus((prev) => {
                return {
                    ...prev,
                    ...onlineUsers,
                };
            });
        });

        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });
    }, []);

    const onLogout = async () => {
        if (currentUser) {
            socket.emit('offline', { uuid: currentUser.uuid });
        }
        socket.off();
        await logout();
        router.push('/login');
    };

    const loadMessages = (user) => async () => {
        setChattingWith(user);
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) {
            return;
        }

        const message = {
            senderId: currentUser.uuid,
            recipientId: chattingWith.uuid,
            content: newMessage.trim(),
            _id: crypto.randomUUID(),
        };

        setMessages([...messages, message]);
        setNewMessage('');

        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: currentUser.uuid,
                recipientId: chattingWith.uuid,
                content: newMessage,
            }),
        });

        const isSendingMessageToMyself =
            message.senderId === message.recipientId;
        if (isSendingMessageToMyself) {
            return;
        }
        socket.emit('newmessage', message);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* <!-- Sidebar --> */}
            <div className="w-1/4 bg-white border-r border-gray-300 flex flex-col">
                {/* <!-- Sidebar Header --> */}

                <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
                    <div className="flex items-center justify-between">
                        <div className="flex align-center">
                            <img
                                src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ms-3">
                                <div className="text-lg font-semibold">
                                    {currentUser?.name}
                                </div>
                                <div className="text-sm font-semibold">
                                    {currentUser?.email}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            title="Sair"
                            className="px-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-log-out"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" x2="9" y1="12" y2="12" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* <!-- Contact List --> */}

                {loading ? (
                    <div className="flex justify-center items-center flex-grow">
                        <div className="loadersmall"></div>
                    </div>
                ) : (
                    <div
                        className="overflow-y-auto flex-grow custom-scrollbar"
                        style={{ height: 0 }}
                    >
                        {Object.values(users).map((user) => (
                            <div
                                className={`flex items-center cursor-pointer hover:bg-gray-100 p-4 rounded-md ${
                                    chattingWith
                                        ? chattingWith.uuid === user.uuid
                                            ? 'bg-gray-100'
                                            : ''
                                        : ''
                                }`}
                                key={user._id}
                                onClick={loadMessages(user)}
                            >
                                <div className="w-12 h-12 bg-gray-300 relative rounded-full mr-3">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user.name
                                            .split(' ')
                                            .join('+')}`}
                                        alt="User Avatar"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <span
                                        className={`user-status ${
                                            user.uuid === currentUser?.uuid
                                                ? 'online'
                                                : userStatus[user.uuid] ??
                                                  'offline'
                                        } `}
                                    ></span>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg text-gray-950 font-semibold">
                                        {user.uuid === currentUser?.uuid
                                            ? 'Você'
                                            : user.name}
                                    </h2>
                                    <p className="text-gray-600">Hoorayy!!</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {chattingWith ? (
                <div className="flex-1">
                    {/* <!-- Chat Header --> */}
                    <header className="bg-white p-4 text-gray-700">
                        <div className="flex align-center">
                            <img
                                src={`https://ui-avatars.com/api/?name=${chattingWith.name
                                    .split(' ')
                                    .join('+')}`}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ms-3">
                                <div className="text-lg font-semibold">
                                    {chattingWith.uuid === currentUser?.uuid
                                        ? 'Você'
                                        : chattingWith.name}
                                </div>
                                <div className="text-sm font-semibold">
                                    {chattingWith.uuid === currentUser?.uuid
                                        ? 'Online'
                                        : userStatus[chattingWith.uuid] ||
                                          'Offline'}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* <!-- Chat Messages --> */}
                    <div
                        className="h-screen overflow-y-auto p-4 pb-36"
                        style={{
                            backgroundImage:
                                'url(https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png)',
                        }}
                    >
                        {messages.map((message) =>
                            message.senderId === currentUser?.uuid ? (
                                <div
                                    className="flex justify-end mb-4 cursor-pointer"
                                    key={message._id}
                                >
                                    <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                        <p>{message.content}</p>
                                    </div>
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${users[
                                                message.senderId
                                            ].name
                                                .split(' ')
                                                .join('+')}`}
                                            alt="My Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex mb-4 cursor-pointer"
                                    key={message._id}
                                >
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${users[
                                                message.senderId
                                            ].name
                                                .split(' ')
                                                .join('+')}`}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                    <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                        <p className="text-gray-700">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* <!-- Chat Input --> */}
                    <footer className="bg-white border-t border-gray-300 p-3 absolute bottom-0 w-3/4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Digite sua mensagem..."
                                className="w-full p-3 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-950"
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' ? sendMessage() : null
                                }
                                value={newMessage}
                            />
                            <button
                                className="bg-indigo-500 text-white p-3 rounded-md ml-2"
                                title="Enviar"
                                onClick={sendMessage}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-send-horizontal"
                                >
                                    <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                                    <path d="M6 12h16" />
                                </svg>
                            </button>
                        </div>
                    </footer>
                </div>
            ) : (
                <div className="w-3/4 h-screen flex justify-center items-center">
                    <div className="text-5xl me-2">Bem-vindo ao zap-js</div>{' '}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="55"
                        height="55"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-circle"
                    >
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                </div>
            )}
        </div>
    );
}
