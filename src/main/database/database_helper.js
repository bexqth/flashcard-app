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
            this.db.run(`CREATE TABLE IF NOT EXISTS icons (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                bootstrap_class TEXT NOT NULL,
                UNIQUE(name, bootstrap_class)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS decks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                icon_id INTEGER DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (icon_id) REFERENCES icons (id)
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS cards (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                deck_id INTEGER NOT NULL,
                front TEXT NOT NULL,
                back TEXT NOT NULL,
                FOREIGN KEY (deck_id) REFERENCES decks (id)
            )`, () => {
                this.checkAndInsertIcons(); // Only call after all tables exist
            });
        });
    }

    checkAndInsertIcons() {
        this.db.get("SELECT COUNT(*) as count FROM icons", (err, row) => {
            if (err) {
                console.error('Failed to check icons table:', err);
                return;
            }

            if (row.count === 0) {
                this.insertIcons();
            } else {
                console.log('Icons already inserted — skipping insert.');
            }
        });
    }

    insertIcons() {
        const icons = [
            ['Chemistry', 'flask'],
            ['Math', 'calculator'],
            ['Book', 'book'],
            ['Pencil', 'pencil'],
            ['Graduation', 'mortarboard'],
            ['Biology', 'tree'],
            ['Physics', 'lightning'],
            ['Geography', 'globe'],
            ['History', 'clock-history'],
            ['Language', 'translate'],
            ['Psychology', 'brain'],
            ['Engineering', 'gear']
        ];

        const stmt = this.db.prepare("INSERT OR IGNORE INTO icons (name, bootstrap_class) VALUES (?, ?)");
        icons.forEach(([name, cls]) => {
            stmt.run(name, cls);
        });
        stmt.finalize(() => {
            console.log('Initial icons inserted.');
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
