function MemoryDB() {
  const DB = {
    db: [],
    insert(key, status) {
      if (!key) {
        throw new Error(
          'must be pass a key',
        );
      }

      if (!status) {
        throw new Error(
          'must be pass a value, cannot be null',
        );
      }

      const obj = {
        key,
        status,
      };

      const isInDB = this.db.findIndex((item) => item.key === key);
      if (isInDB < 0) {
        this.db.push(obj);
      }
    },
    get(key) {
      if (!key) {
        throw new Error(
          'must be pass a key',
        );
      }
      const value = this.db.findIndex((item) => item.key === key);

      if (value >= 0) {
        return this.db[value].status;
      }
      return false;
    },
  };

  return DB;
}

module.exports = MemoryDB;
