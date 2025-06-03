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
            this.db.run(`CREATE TABLE IF NOT EXISTS decks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        icon_id INTEGER DEFAULT 1,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (icon_id) REFERENCES icons (id)
                    )`);

            this.db.run(`
                CREATE TABLE IF NOT EXISTS cards (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    deck_id INTEGER NOT NULL,
                    front TEXT NOT NULL,
                    back TEXT NOT NULL,
                    FOREIGN KEY (deck_id) REFERENCES decks (id)
                )
            `);

            this.db.run(`CREATE TABLE IF NOT EXISTS icons (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                bootstrap_class TEXT NOT NULL
            )`);

        });
        this.insertIcons();
    }

    insertIcons() {
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Chemistry', 'flask')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Math', 'calculator')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Book', 'book')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Pencil', 'pencil')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Graduation', 'mortarboard')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Biology', 'tree')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Physics', 'lightning')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Geography', 'globe')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('History', 'clock-history')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Language', 'translate')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Psychology', 'brain')");
        this.db.run("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES ('Engineering', 'gear')");
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