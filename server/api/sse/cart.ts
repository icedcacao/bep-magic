export default defineEventHandler(async (event) => {
  const { send } = useSSE(event, `sse:${indexEmitter.cartEmitterName}`);

  const callbackEmitter = () => {
    send(() => ({ message: "Cart Updated!" }));
  };

  indexEmitter.cartEmitter.on(indexEmitter.cartEmitterName, callbackEmitter);

  event.node.req.on("close", () => {
    indexEmitter.cartEmitter.removeListener(
      indexEmitter.cartEmitterName,
      callbackEmitter
    );
  });
});
