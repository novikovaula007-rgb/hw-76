import React from 'react';
import {Box, Typography} from "@mui/material";
import type {IMessage} from "../../../../types";
import dayjs from "dayjs";

interface Props {
    message: IMessage;
}

const Message: React.FC<Props> = ({message}) => {

    const dateSetFormat = () => {
        const date = dayjs(message.datetime);
        const dateNow = dayjs();

        if (date.isSame(dateNow, 'day')) {
            return date.format('HH:mm');
        }

        if (dateNow.subtract(1, 'day').isSame(date, 'day')) {
            return `Yesterday ${date.format('HH:mm')}`;
        }

        if (!date.isSame(dateNow, 'year')) {
            return date.format('DD.MM.YYYY HH:mm');
        }

        return date.format('DD.MM HH:mm');
    }

    return (
        <Box>
            <Typography
                sx={{
                    marginBottom: '0',
                    marginLeft: 1,
                    fontWeight: 'bold',
                    color: 'text.secondary',
                    fontSize: '10px',
                }}
            >
                {message.author}
            </Typography>
            <Box
                sx={{
                    width: '400px',
                    margin: '10px',
                    padding: '8px 16px',
                    wordBreak: 'break-all',
                    borderRadius: '16px',
                    backgroundColor: '#d6d6d6',
                    color: 'text.primary',
                    boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                }}
            >
                <Typography variant="body1">{message.message}</Typography>
                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5,
                        fontSize: '0.7rem',
                        opacity: 0.8,
                    }}
                >{dateSetFormat()}</Typography>
            </Box>
        </Box>
    );
};

export default Message;