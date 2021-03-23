import https from 'https';
import INotificationProvider from '../../models/INotificationProvider';
import IMessage from './models/IMessage';
import IHeaders from './models/IHeaders';
import IOptions from './models/IOptions';
import config from './config/settings';

class OneSignalProvider implements INotificationProvider {
  private message: IMessage;

  private headers: IHeaders;

  private options: IOptions;

  public async sendNotification(
    to: Array<string>,
    body: string,
  ): Promise<void> {
    const { settings } = config;

    this.headers = settings.sendNotificationConfig.headers;

    this.message = {
      app_id: settings.oneSignalAppID,
      contents: { pt: body },
      include_player_ids: to,
    };

    this.options = {
      host: settings.host,
      port: 443,
      path: settings.sendNotificationConfig.path,
      method: settings.sendNotificationConfig.method,
      headers: this.headers,
    };

    const req = https.request(this.options, res => {
      res.on('data', data => {
        console.log('Response:');
        console.log(JSON.parse(data));
      });
    });

    req.on('error', e => {
      console.log('ERROR:');
      console.log(e);
    });

    req.write(JSON.stringify(this.message));
    req.end();
  }
}

export default OneSignalProvider;
