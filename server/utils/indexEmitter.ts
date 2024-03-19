import { EventEmitter } from "node:events";

const cartEmitter = new EventEmitter();
const cartEmitterName = "cartupdated";

export default { cartEmitter, cartEmitterName };
