import { Subject } from "rxjs";

const cartChanged = new Subject();

export const sumOfCartService = {
    sendCartSum: (newCartSum) => cartChanged.next(newCartSum),
    getCartSum: () => cartChanged.asObservable()
}