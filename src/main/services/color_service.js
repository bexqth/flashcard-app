const { ipcMain } = require('electron');

class ColorService {
    constructor(database) {
        this.db = database.getDatabase();
        this.registerHandlers();
    }

    registerHandlers() {
        ipcMain.handle('color:getAll', () => this.getAllColors()); //result is promise thats why its handle
    }

    getAllColors() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM deck_colors', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
            });
        });
    }

}

module.exports = ColorService;