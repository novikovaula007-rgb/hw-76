import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IMessage, IMessageMutation} from "../../types";
import {axiosAPI} from "../../axiosAPI.ts";
import type {RootState} from '../../../app/store/store.ts';


interface messagesState {
    messages: IMessage[],
    loading: {
        fetchAllMessages: boolean,
        postNewMessage: boolean
    }
}

const initialState: messagesState = {
    messages: [],
    loading: {
        fetchAllMessages: false,
        postNewMessage: false
    }
}

export const fetchAllMessages = createAsyncThunk<IMessage[], string | undefined>(
    'messages/fetchAllMessages',
    async (datetime?: string) => {
        const url = datetime
            ? `/messages?datetime=${datetime}`
            : '/messages';
        const response = await axiosAPI.get<IMessage[]>(url);
        return response.data.reverse();
    }
);

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async (messageData: IMessageMutation) => {
        const response = await axiosAPI.post<IMessage>('/messages', messageData);
        return response.data;
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllMessages.pending, (state, action) => {
                if (!action.meta.arg) {
                    state.loading.fetchAllMessages = true;
                }
            })
            .addCase(fetchAllMessages.fulfilled, (state, action) => {
                state.loading.fetchAllMessages = false;

                const newMessages = action.payload;
                const isNew = action.meta.arg;

                if (isNew) {
                    state.messages = [ ...newMessages, ...state.messages];
                } else {
                    state.messages = newMessages;
                }
            })
            .addCase(fetchAllMessages.rejected, (state) => {
                state.loading.fetchAllMessages = false;
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.loading.postNewMessage = false;
            })
            .addCase(sendMessage.pending, (state) => {
                state.loading.postNewMessage = true;
            })
            .addCase(sendMessage.rejected, (state) => {
                state.loading.postNewMessage = false;
            })
    }
})

export const selectAllMessages = (state: RootState) => state.messages.messages;
export const selectPostMessageLoading = (state: RootState) => state.messages.loading.postNewMessage;
export const selectFetchMessagesLoading = (state: RootState) => state.messages.loading.fetchAllMessages;

export const messagesReducer = messagesSlice.reducer;