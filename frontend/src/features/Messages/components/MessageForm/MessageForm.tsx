import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {Button} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../app/store/hooks.ts";
import {selectPostMessageLoading, sendMessage} from "../../MessagesSlice.ts";
import {toast} from "react-toastify";

interface MessageForm {
    message: string;
    author: string;
}

const MessageForm = () => {
    const [message, setMessage] = useState<MessageForm>({message: '', author: ''})

    const messageSelectLoading = useAppSelector(selectPostMessageLoading);
    const dispatch = useAppDispatch();

    const changeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!message.author.trim().length || !message.message.trim().length) {
            toast.error('Please enter a author, message fields');
        } else {
            await dispatch(sendMessage(message));
            setMessage({message: '', author: ''});
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField
                    id="author"
                    name="author"
                    multiline
                    placeholder="Enter your name"
                    sx={{width: '250px',
                        display: 'block',
                    }}
                    value={message.author}
                    disabled={messageSelectLoading}
                    onChange={changeMessage}
                />
                <TextField
                    id="message"
                    name="message"
                    multiline
                    rows={4}
                    placeholder="Enter your message"
                    sx={{width: '500px'}}
                    value={message.message}
                    disabled={messageSelectLoading}
                    onChange={changeMessage}
                />
                <Button variant="contained"
                        type="submit"
                        color="primary"
                        loading={messageSelectLoading}
                        disabled={messageSelectLoading}
                        sx={{marginLeft: '10px'}}
                >
                    <SendIcon/>
                </Button>
            </form>
        </div>
    );
};

export default MessageForm;