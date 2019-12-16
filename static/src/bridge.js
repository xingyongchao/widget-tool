const keys = [
  'JDIWORK',
];

function postMessageToWin(win, data) {
  if (win && data) {
    win.postMessage(JSON.stringify(data), '*');
  }
}

function logger({type, detail}) {
  const headerCSS = [
    'color: gray; font-weight: lighter;',
    'color: inherit',
    'color: gray; font-weight: lighter;',
  ];
  const detailCss = 'color: #03A9F4; font-weight: bold';
  console.group(`%c type %c${type} %c${(new Date).toJSON()}`, ...headerCSS);
  console.log(`%c detail `, detailCss, detail);
  console.groupEnd();
}

const handlerList = {
  openService(type, event) {
    logger(event)
    postMessageToWin(this.source, {
      type,
    });
  },
  openDialog(type, event) {
    logger(event)
    postMessageToWin(this.source, {
      type,
    });
  },
  addBrm(type, event) {
    logger(event)
    postMessageToWin(this.source, {
      type,
    });
  },
  checkServiceOpen(type, event) {
    logger(event)
    postMessageToWin(this.source, {
      type,
      data: true,
    });
  },
  postDataToService(type, event) {
    logger(event)
    postMessageToWin(this.source, {
      type,
    });
    if (event.detail && event.detail.data) {
      postMessageToWin(this.source, {
        type: 'data',
        data: event.detail.data
      });
    }
  },
  getContext(type, event) {
    logger(event)
    postMessageToWin(this.source, {
      type,
      data: window.widgetContext
    });
  },
}

function messageHandler({ detail, callbackId }, event) {
  if (callbackId && typeof callbackId === 'string') {
    const type = callbackId.split(':')[0];
    handlerList[type].call(event, callbackId, { type, detail });
  }
}

window.addEventListener('message', (event) => {
  if (event.data) {
    let data = event.data;
    try {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
    } catch(e) {
      console.log(e);
      return;
    }
    const { messType } = data;
    if (messType && keys.indexOf(messType) > -1) {
      messageHandler(data, event);
    }
  }
});