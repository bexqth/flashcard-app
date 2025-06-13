const { contextBridge, ipcRenderer } = require('electron');

//creates the bringe between the front and back, so i can call this method safetly
contextBridge.exposeInMainWorld('api', {
  getAllIcons: () => ipcRenderer.invoke('icon:getAll'),
});
