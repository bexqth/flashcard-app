const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseHelper {
    constructor() {
        this.db = null;
        this.initDatabase();
    }

    initDatabase() {
        const dbPath = path.join(__dirname, 'flashcards.db');
        
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err);
            } else {
                console.log('Database initialized:', dbPath);
                this.createTables();
            }
        });
    }

    createTables() {
        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS decks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            this.db.run(`
                CREATE TABLE IF NOT EXISTS cards (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    deck_id INTEGER NOT NULL,
                    front TEXT NOT NULL,
                    back TEXT NOT NULL,
                    FOREIGN KEY (deck_id) REFERENCES decks (id)
                )
            `);
        });
    }

    getDatabase() {
        return this.db;
    }

    close() {
        if (this.db) {
            this.db.close();
        }
    }
}

module.exports = new DatabaseHelper();