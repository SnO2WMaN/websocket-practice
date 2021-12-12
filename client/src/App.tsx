import React, { useEffect, useState } from "react";
import { useInterval } from "react-use";
import useWebSocket from "react-use-websocket";

export const List: React.VFC = () => {
  const [messages, setMessages] = useState<{ id: string; body: string; postedAt: Date; }[]>([]);
  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:6666", {
    onOpen: () => console.log("opened"),
  });

  const receivedMessage = (
    received: { id: string; body: string; postedAt: string; },
  ) => (
    setMessages((prev) =>
      [...prev, { ...received, postedAt: new Date(received.postedAt) }]
        .sort(({ postedAt: a }, { postedAt: b }) => b.getTime() - a.getTime())
        .splice(0, 10)
    )
  );

  useEffect(() => {
    console.dir(lastMessage?.data);
  }, [lastMessage]);

  useInterval(
    () => {
      sendMessage("message");
    },
    1000,
  );

  return (
    <div>
      <ul>
        {messages.map(({ id, body: body, postedAt }) => (
          <li key={id}>
            <strong>{body}</strong>
            <time>{postedAt.toISOString()}</time>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const App: React.VFC = () => {
  return (
    <div>
      <List></List>
    </div>
  );
};
