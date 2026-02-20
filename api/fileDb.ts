import {Message, MessageMutation} from "./types";
import crypto from "crypto";
import {promises as fs} from 'fs';

const fileName = './db.json';

let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },

    async getMessages () {
        return data;
    },

    async addMessage (item: MessageMutation) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const newMessage = {id: id, datetime: date, ...item};
        data.push(newMessage);
        await this.save();
        return newMessage;
    },

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;