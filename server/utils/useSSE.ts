import { H3Event } from "h3";
import { createHooks } from "hookable";

export interface ServerSentEvent {
  [key: string]: <T, R>(data: T) => R | void;
}

const sseHooks = createHooks<ServerSentEvent>();

export const useSSE = (event: H3Event, hookName: string) => {
  setHeader(event, "content-type", "text/event-stream");
  setHeader(event, "cache-control", "no-cache");
  setHeader(event, "connection", "keep-alive");

  sseHooks.hook(hookName, (data: any) => {
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
    event.node.res.flushHeaders();
  });

  const send = (callback: () => any) => {
    sseHooks.callHook(hookName, callback());
  };
  const close = () => {
    event.node.res.end();
  };
  event._handled = true;
  event.node.req.on("close", close);
  return { send };
};
