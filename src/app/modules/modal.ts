
export class AppModal {
    constructor() {

    }

    /**
     *
     * @param modal
     * @param title
     * @param body
     * @returns {Promise<TResult>|Promise<U>}
     */
    static alert(modal, title:string, body:string) {
        return modal.alert()
            .title(title)
            .body(body)
            .open()
            .then(dialog => dialog.result);
    }

    /**
     *
     * @param modal
     * @param title
     * @param body
     * @returns {Promise<TResult>|Promise<U>}
     */
    static confirm(modal, title:string, body:string) {
        return modal.confirm()
            .title(title)
            .body(body)
            .open()
            .then(dialog => dialog.result);
    }

    /**
     *
     * @param modal
     * @param title
     * @param body
     * @returns {any}
     */
    static prompt(modal, title:string, body:string) {
        return modal.prompt()
            .title(title)
            .body(body)
            .open()
            .then(dialog => dialog.result);
    }
}
