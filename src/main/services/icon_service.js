const { ipcMain } = require('electron');

class IconService {
    constructor(database) {
        this.db = database.getDatabase();
        this.registerHandlers();
    }

    registerHandlers() {
        ipcMain.handle('icon:getAll', () => this.getAllIcons()); //result is promise thats why its handle
    }

    getAllIcons() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM icons', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
            });
        });
    }

}

module.exports = IconService;