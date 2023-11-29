//从最外层开始执行，这个和链式调用，洋葱模型相似，异曲同工
export interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  constructor(private emails: string[]) {}

  send(message: string): void {
    console.log(`Sending email to ${this.emails}: ${message}`);
  }
}

class SMSDecorator implements Notifier {
  constructor(private notifier: Notifier) {}

  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
    this.notifier.send(message);
  }
}

class FacebookDecorator implements Notifier {
  constructor(private notifier: Notifier) {}

  send(message: string): void {
    console.log(`Sending Facebook message: ${message}`);
    this.notifier.send(message);
  }
}

class SlackDecorator implements Notifier {
  constructor(private notifier: Notifier) {}

  send(message: string): void {
    console.log(`Sending Slack message: ${message}`);
    this.notifier.send(message);
  }
}

const emailNotifier = new EmailNotifier([
  "user1@example.com",
  "user2@example.com",
]);

const combinedNotifier = new SlackDecorator(
  new FacebookDecorator(new SMSDecorator(emailNotifier))
);

combinedNotifier.send("Important message: House is on fire!");

// Sending Slack message: Important message: House is on fire!
// Sending Facebook message: Important message: House is on fire!
// Sending SMS: Important message: House is on fire!
// Sending email to user1@example.com,user2@example.com: Important message: House is on fire!