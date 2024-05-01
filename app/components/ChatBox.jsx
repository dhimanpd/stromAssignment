'use client'

import React, { useEffect, useState } from 'react';
import styles from './ChatBox.module.css';


export default function ChatBox({token}) {
  let inputBox = null;

  const getConversation = (messages) =>{
    let conv = "Do not use quotes in answer. Given the conversation, reply as an intelligent chatbot\n"
    messages.forEach(element => {
      conv = conv + `\n${element.author}: ${element.data}\n`
    });
    return `${conv}convAI:`
  }
  const getAIResponse = async (message) => {
    const myHeaders = new Headers();

    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const raw = JSON.stringify({
      "prompt": getConversation(message)
    });
    
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    return fetch("http://165.22.64.171:8000/api/llm/", requestOptions)

  }

  let messageEnd = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;


  const sendChatMessage =  (messageText) => {
    const currentConv= [...receivedMessages,{author:"me",data:messageText}]
    setMessages(currentConv);
    getAIResponse(currentConv)
      .then((response) => response.text())
      .then((result) => {setMessages(receivedMessages => [...receivedMessages,{author:"AI",data:result}]);})
      .catch((error) => console.error(error));
    setMessageText("");
    inputBox.focus();
  }

  const handleFormSubmission =  (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
    // const author = message.connectionId === ably.connection.id ? "me" : "other";
    const author = message.author
    return <span key={index} className={styles.message} data-author={author}>{message.data}</span>;
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div className="flex">
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div ref={(element) => { messageEnd = element; }}
       
        style={{ width: "800px" }}></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={(element) => { inputBox = element; }}
          value={messageText}
          placeholder="Type a message..."
          onChange={e => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="rounded-2xl p-7"
        ></textarea>
      <button type="submit" className="rounded-2xl bg-slate-300 mx-2" disabled={messageTextIsEmpty}>Send </button>
      </form>
    </div>
    </div>
  )
}