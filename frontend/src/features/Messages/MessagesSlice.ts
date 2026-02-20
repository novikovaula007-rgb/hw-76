import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Message, MessageMutation} from "../../types";
import {axiosAPI} from "../../axiosAPI.ts";
import type {RootState} from '../../../app/store/store.ts';


interface messagesState {
    messages: Message[],
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

export const fetchAllMessages = createAsyncThunk<Message[], string>(
    'messages/fetchAllMessages',
    async (datetime?: string) => {
        const url = datetime
            ? `/messages?datetime=${datetime}`
            : '/messages';
        const response = await axiosAPI.get<Message[]>(url);
        return response.data;
    }
);

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async (messageData: MessageMutation) => {
        const response = await axiosAPI.post<Message>('/messages', messageData);
        return response.data;
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllMessages.pending, (state) => {
                state.loading.fetchAllMessages = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.loading.fetchAllMessages = false;
                state.messages = action.payload;
            })
            .addCase(fetchAllMessages.rejected, (state) => {
                state.loading.fetchAllMessages = false;
            })
            .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
                state.messages.push(action.payload);
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
export const selectMessagesLoading = (state: RootState) => state.messages.loading;

export const messagesReducer = messagesSlice.reducer;