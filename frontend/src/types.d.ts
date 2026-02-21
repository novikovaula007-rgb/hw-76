export interface IMessage {
    id: string,
    datetime: string,
    author: string,
    message: string
}

export interface IMessageMutation {
    author: string,
    message: string
}