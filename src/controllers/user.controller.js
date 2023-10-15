import Messenger from '../utils/messenger';

const messenger = new Messenger();
messenger.compose('{0} Content', 'content');

const allAccess = (req, res) => {
    res.status(200).send(str.f);
    messenger.from(res.status(200)).send('content', ['Public']);
};
const userBoard = (req, res) => {
    messenger.from(res.status(200)).send('content', ['User']);
};
const adminBoard = (req, res) => {
    messenger.from(res.status(200)).send('content', ['Admin']);
};
const moderatorBoard = (req, res) => {
    messenger.from(res.status(200)).send('content', ['Moderator']);
};

export default { allAccess, userBoard, adminBoard, moderatorBoard };
