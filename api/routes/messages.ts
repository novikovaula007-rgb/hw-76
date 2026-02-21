import express from "express";
import fileDb from "../fileDb";
import {Request, Response} from "express";
import {MessageMutation} from "../types";

export const messagesRouter = express.Router();

messagesRouter.get('/', async (req: Request, res: Response) => {
    const queryDate = req.query.datetime;
    let messages = await fileDb.getMessages();

    if (queryDate) {
        const date = new Date(queryDate as string);

        if (isNaN(date.getDate())) {
            return res.status(400).send({error: "Data is incorrect"});
        }

        const filteredMessages = messages.filter(m => new Date(m.datetime) > date);
        return res.send(filteredMessages);
    }
    messages.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    return res.send(messages.slice(-30));
});

messagesRouter.post('/', async (req: Request, res: Response) => {
    if (!req.body.message || !req.body.author) {
        return res.status(400).send({error: "Please enter a author, message fields"});
    }

    const newMessage: MessageMutation = {
        message: req.body.message,
        author: req.body.author
    }

    const savedMessage = await fileDb.addMessage(newMessage);
    return res.send(savedMessage);
});