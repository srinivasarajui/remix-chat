import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import type { ChatMessage } from "~/chat";

export interface IChatProps {
  user: string;
  users: Set<string>;
  messages: ChatMessage[];
}

export default function ChatComponents(props: IChatProps) {
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (transition.state === "submitting") {
      formRef.current?.reset();
    }
  }, [transition.state]);
  return (
    <div className="grow flex flex-row h-full">
      <div className="basis-1/3">
        <span>Users</span>
      <ul>
            {[...props.users].map(( user , index) => (
              <li key={index}>
                <strong>{user}</strong>
              </li>
            ))}
          </ul>

        </div>
      <div className="flex flex-col basis-2/3">
        <div className="grow">
        <div className="overflow-y-auto">
          <ul>
            {props.messages.map(({ user, message }, index) => (
              <li key={index}>
                <strong>{user}: </strong>
                {message}
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div>
          <Form ref={formRef} method="post" replace>
            <input type="text" name="message" className="input w-full max-w-xs" placeholder="Type here"  />
            <button type="submit" name="_action" value="send-message"  className="btn gap-2">
              Send
              <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
