import { Injectable } from '@nestjs/common';
import * as SQLiteCloud from 'sqlitecloud-sdk';
import { credenciais } from 'src/config.service';

@Injectable()
export class UsuarioService {
  private db: SQLiteCloud.Database;

  constructor() {
    const sqliteCloud = new SQLiteCloud.default(credenciais.DATABASE_URL);
    this.db = sqliteCloud.Database();
    this.criaTabela();
  }

  private criaTabela() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      )
    `;

    this.db.run(query, (error) => {
      if (error) {
        console.error('Error creating users table:', error);
      } else {
        console.log('Users table created');
      }
    });
  }

  async criaUsuario(name: string, email: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const query = `
        INSERT INTO users (name, email) VALUES (?, ?)
      `;

      this.db.run(query, [name, email], function (error) {
        if (error) {
          console.error('Error creating user:', error);
          reject(error);
        } else {
          console.log('User created with ID:', this.lastID);
          resolve(this.lastID);
        }
      });
    });
  }

  async getUsuarios(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const query = `SELECT * FROM users`;

      this.db.all(query, (error, rows) => {
        if (error) {
          console.error('Error getting users:', error);
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getUsuarioById(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const query = `SELECT * FROM users WHERE id = ?`;

      this.db.get(query, [id], (error, row) => {
        if (error) {
          console.error('Error getting user:', error);
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  async updateUsuario(id: number, name: string, email: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;

      this.db.run(query, [name, email, id], (error) => {
        if (error) {
          console.error('Error updating user:', error);
          reject(error);
        } else {
          console.log('User updated');
          resolve();
        }
      });
    });
  }

  async deleteUsuario(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const query = `DELETE FROM users WHERE id = ?`;

      this.db.run(query, [id], (error) => {
        if (error) {
          console.error('Error deleting user:', error);
          reject(error);
        } else {
          console.log('User deleted');
          resolve();
        }
      });
    });
  }
}
