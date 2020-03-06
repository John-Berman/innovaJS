 const innovaDialog = (()=>{
  //#region Initialise references to elements.
  let commonDialog = document.getElementById('commonDialog');
  const commonDialogTitle = document.getElementById('commonDialogTitle');
  const commonDialogMessage = document.getElementById('commonDialogMessage');
  let commonDialogOK = document.getElementById('commonDialogOK');
  let commonDialogCancel = document.getElementById('commonDialogCancel');
  //#endregion
  //#region Set default configuration.
  let config = {
      title: 'innova',
      message: ['Common Dialog'],
      width: 250,
      height: 100,
      left: 0,
      top: 0,
      okCallBack: function(){ console.log('callback for Ok Buton'); },
      cancelCallBack: function(){ console.log('callback for Cancel Buton'); }
  };
  //#endregion
  //#region Properties.
  let message = config.message;
  let title = config.title;
  let oKFunc = config.okCallBack;
  let cancelFunc = config.cancelCallBack;
  let left = 0;
  let top = 0;
  let height = config.height;
  let width = config.width;
  // Used for creating message markup.
  let messageMarkup = '';
  // #endregion
  // Function reads config and assigns to properties.
  let readConfig = function(config){
      message = config.message ?? message;
      title = config.title ?? title;
      oKFunc = config.okCallBack ?? oKFunc;
      cancelFunc = config.cancelCallBack ?? cancelFunc;
      width = config.width ?? width;
      height = config.height ?? height;
      top = config.top ?? top;
      left = config.left ?? left;
  };

  return {
      config: (config) =>{
          readConfig(config);
          return this;
      },
      help: () =>{
          return config;
      },
      left: function(lft){
          left += left + lft;
          return this;
      },
      top: function(tp){
          top = parseFloat(top) + tp;
          return this;
      },
      width: function(w){
          width = w;
          return this;
      },
      height: function(h){
          height = h;
          return this;
      },
      onCancel: function(cb) {
          cancelFunc = cb;
          return this;
      },
      onOk: function(cb){
          oKFunc = cb;
          return this;
      },
      message: function(msg){
          message = msg;
          return this;
      },
      addMessage: function(msg){
          message.push(msg);
          return this;
      },
      title: function(ttl){
          title = ttl;
          return this;
      },
      show: (config) =>{
          if(config){
              readConfig(config);
          }
          // Add OK event handlers.
          commonDialogOK.addEventListener('click',oKFunc);
          commonDialogOK.addEventListener('click',e=>{
              commonDialog.style.display = 'none';
          });

          // Add Cancel event handlers.
          if(cancelFunc){
              commonDialogCancel.addEventListener('click',cancelFunc);
              commonDialogCancel.addEventListener('click',e=>{
                  commonDialog.style.display = 'none';
              });
              commonDialogCancel.style.display = 'block';
          } else {
              commonDialogCancel.style.display = 'none';
          }

          // Set title.
          commonDialogTitle.innerHTML = title;
          // Set message.
          message.forEach(line => {
              console.log(line);
              messageMarkup += `<div>${line}</div>`;
          });
          commonDialogMessage.innerHTML = messageMarkup;
          // Set dialog to display.
          commonDialog.style.display = 'grid';

          commonDialog.style['min-width'] = width + 'px'
          commonDialog.style['min-height'] = height + 'px'


          const cdBbox = commonDialog.getBoundingClientRect();
          console.log(cdBbox);
          commonDialog.style.left = -(cdBbox.width/2) + left + 'px';
          commonDialog.style.top = -(cdBbox.height/2) + top + 'px';

          //commonDialog.style['min-height']= height;


      }
  };

  })();

