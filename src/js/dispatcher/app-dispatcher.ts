
import {Dispatcher} from "flux";

const instance: Dispatcher<any> = new Dispatcher();
export default instance;

export const dispatch = instance.dispatch.bind(instance);
