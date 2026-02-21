import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks.ts";
import {fetchAllMessages, selectAllMessages} from "./MessagesSlice.ts";
import Message from "./components/Message/Message.tsx";
import MessageForm from "./components/MessageForm/MessageForm.tsx";

const Messages = () => {
        const dispatch = useAppDispatch();
        const messages = useAppSelector(selectAllMessages);

        const [lastTime, setLastTime] = useState<string | null>(null);

        const scrollToBottom = () => {
            const chat = document.getElementById('chat');
            if (chat) {
                chat.scrollTop = chat.scrollHeight;
            }
        };

        useEffect(() => {
            const firstLoad = async () => {
                const result = await dispatch(fetchAllMessages()).unwrap();
                if (result.length > 0) {
                    scrollToBottom();
                    setLastTime(result[0].datetime);
                }
            };
            firstLoad();
        }, [dispatch]);

        useEffect(() => {
            if (!lastTime) return;

            const interval = setInterval(async () => {
                const newMessages = await dispatch(fetchAllMessages(lastTime)).unwrap();
                if (newMessages.length > 0) {
                    scrollToBottom();
                    setLastTime(newMessages[0].datetime);
                }
            }, 3000);

            return () => clearInterval(interval);
        }, [dispatch, lastTime]);

        return (
            <>
                <Box
                    sx={{
                        width: '500px',
                        height: '400px',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        marginBottom: '10px',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        overflowY: 'scroll'
                }}
                    id='chat'
                >
                    {messages.map(message => {
                        return <Message key={message.id} message={message}/>
                    })}
                </Box>
                <MessageForm/>
            </>
        );
    }
;

export default Messages;