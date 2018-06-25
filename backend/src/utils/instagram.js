

const {
    Account,
    CookieMemoryStorage,
    Device,
    Feed,
    Session,
    Thread,
    Upload
} = require('instagram-private-api').V1;

// TODO tmp cache
const profile = {
  pk: 3954419038,
  username: "lookfortrends",
  fullName: "Sasha",
  isPrivate: false,
  profilePicUrl: "https://scontent-frx5-1.cdninstagram.com/vp/e5721d5bfa20c80291fa2604b1184009/5BBFDB6C/t51.2885-19/s150x150/16464243_1265781306839679_3871367032511397888_n.jpg"
};

class Instagram {
  async init({ user }) {
    const device = new Device(user.igLogin);
    const storage = new CookieMemoryStorage();

    this.igSession = await Session.create(device, storage, user.igLogin, user.igPassword);
  }

  /*
  async follow(accountId) {
    return Relationship.create(this.session, accountId);
  }

  async unfollow(accountId) {
    return Relationship.destroy(this.session, accountId);
  }
  */

  async getCurrentUser() {
    console.log('getCurrentUser');
    // const accountId = await this.igSession.getAccountId();
    // tmp cache
    /*
    if (profile) {
      console.log('get-new-user-profile');
      profile = await Account.getById(this.igSession, accountId);
    } */
    return Promise.resolve({ _params: profile });
  }

  async getInbox() {
    const inbox = new Feed.Inbox(this.igSession);
    return inbox.get();
  }

  async getThread(threadId) {
    return Thread.getById(this.igSession, threadId);
  }

  async seen(thread) {
    new Thread(this.session, thread).seen();
  }

  async sendMessage({ text, thread, to }) {
    if (!thread && !to) {
      throw Error('"thread" or "to" must be defined');
    }

    if (thread) {
      return thread.broadcastText(text);
    } else if (to) {
      // return new Thread(this.igSession, thread).broadcastText(text);
      return Thread.configureText(this.igSession, to, text);
    }
  }

  async sendPhoto({ file, thread, to }) {
    if (!thread && !to) {
      throw Error('"thread" or "to" must be defined');
    }

    const upload = await Upload.photo(this.igSession, file);

    console.log('sendPhoto-------🐒', upload);

    if (thread) {
      return thread.broadcastText('img');
      return thread.configurePhoto(upload._params.uploadId);
    } else if (to) {
      return Thread.configurePhoto(this.igSession, to, upload.params.uploadId);
    }

    throw Error('"thread" or "to" must be defined');
  }

  async searchUsers(username) {
    return Account.search(this.igSession, username);
  }
}

module.exports = Instagram;
