import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  try {
    let conversation = await Conversation.findOne({
      partipicans: { $all: [senderId, receiverId] },
    });

    if (receiverId == senderId) {
      return res.status(400).json({ message: `You can't message yourself` });
    }

    if (!conversation) {
      conversation = await Conversation.create({
        partipicans: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      content: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]);

    //TODO: ADD SOCKET.IO

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;
  try {
    const conversation = await Conversation.findOne({
      partipicans: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
