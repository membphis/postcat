import * as child_process from 'child_process';
import { BrowserView } from 'electron';
export class UnitWorker {
  instance: child_process.ChildProcess;
  view: BrowserView;
  constructor(view: BrowserView) {
    this.view = view;
  }
  start(message: any) {
    this.instance = child_process.fork(`${__dirname}/forkUnit.js`);
    this.watch();
    this.instance.send(message);
  }
  finish(message: any) {
    this.view.webContents.send('unitTest', message);
    this.kill();
  }
  kill() {
    this.instance.kill();
  }
  private watch() {
    this.instance.on('message', (message: any) => {
      switch (message.action) {
        case 'finish':{
          this.finish(message.data);
          break;
        }
      }
    });
  }
}
