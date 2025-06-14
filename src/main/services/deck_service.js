const { ipcMain } = require('electron');

class DeckService {
    constructor(database) {
        this.db = database.getDatabase();
        this.registerHandlers();
    }

    registerHandlers() {
        ipcMain.handle('deck:getAll', () => this.getAllDecks());
        ipcMain.handle('deck:getById', (event, id) => this.getDeckById(id));
        ipcMain.handle('deck:update', (event, id, deckName, deckIcon) => this.updateDeck(id, deckName, deckIcon));
        ipcMain.handle('deck:delete', (event, id) => this.deleteDeck(id));
        ipcMain.handle('deck:create', async (event, deckName, iconId, colorId) => {
            try {
                const result = await this.createDeck(deckName, iconId, colorId); //result for the frontend
                return { success: true, id: result.id };
            } catch (error) {
                return { success: false, error: error.message };
            }
        });
    }

    getAllDecks() {

    }

    getDeckById(id) {

    }

    createDeck(deckName, iconId, colorId) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO decks (name, icon_id, color_id) VALUES (?, ?, ?)`;
            this.db.run(query, [deckName, iconId, colorId], function (err) {
                if(err) reject(err);
                else resolve ({id: this.lastID}) // lastID only contains valid information when the query was a successfully completed
            });
        });
    }

    updateDeck(id, deckName, deckIcon) {

    }

    deleteDeck(id) {

    }

}

module.exports = DeckService;