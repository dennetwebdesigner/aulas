class DataBase {
  constructor() {
    this.database = ["1", "2", "3"];
  }

  async insert(data) {
    this.database.push(data);
    const id = this.database.length;
    return { id, data };
  }

  async select() {
    return this.database;
  }

  async update() {}

  async destroy(id) {
    if (!this.database[id]) {
      return false;
    }

    this.database[id] = null;
    return true;
  }
}
