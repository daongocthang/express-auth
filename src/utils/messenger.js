import { str } from '.';

class Messenger {
    #response;
    #messages = {};

    from(response) {
        this.#response = response;
        return this;
    }

    compose(content, tag) {
        if (typeof tag === 'string') this.#messages[tag] = content;
        return this;
    }

    send(tag, args) {
        let message = this.#messages[tag];

        message = str.format(message, args);

        this.#response.send({ message });
        this.#response = undefined;
    }
}

export default Messenger;
