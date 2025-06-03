const { ipcMain } = require('electron');

class DeckService {
    constructor(database) {
        this.db = database.getDatabase();
        this.registerHandlers();
    }

    registerHandlers() {
        ipcMain.handle('deck:getAll', () => this.getAllDecks());
        ipcMain.handle('deck:getById', (event, id) => this.getDeckById(id));
        ipcMain.handle('deck:create', (event, deckName, deckIcon) => this.createDeck(deckName, deckIcon));
        ipcMain.handle('deck:update', (event, id, deckName, deckIcon) => this.updateDeck(id, deckName, deckIcon));
        ipcMain.handle('deck:delete', (event, id) => this.deleteDeck(id));
    }

    getAllDecks() {

    }

    getDeckById(id) {

    }

    createDeck(deckName, deckIcon) {

    }

    updateDeck(id, deckName, deckIcon) {

    }

    deleteDeck(id) {

    }

}

module.exports = DeckService;