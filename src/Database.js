import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;


initDB() {
  let db;
  return new Promise((resolve) => {
    console.log("Plugin integrity check ...");
    SQLite.echoTest()
      .then(() => {
        console.log("Integrity check passed ...");
        console.log("Opening database ...");
        SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size
        )
          .then(DB => {
            db = DB;
            console.log("Database OPEN");
            db.executeSql('SELECT 1 FROM Contact LIMIT 1').then(() => {
                console.log("Database is ready ... executing query ...");
            }).catch((error) =>{
                console.log("Received error: ", error);
                console.log("Database not yet ready ... populating data");
                db.transaction((tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Contact (contactId, name , mobile, landline, contactImage)');
                }).then(() => {
                    console.log("Table created successfully");
                }).catch(error => {
                    console.log(error);
                });
            });
            resolve(db);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log("echoTest failed - plugin not functional");
      });
    });
};

closeDatabase(db) {
  if (db) {
    console.log("Closing DB");
    db.close()
      .then(status => {
        console.log("Database CLOSED");
      })
      .catch(error => {
        this.errorCB(error);
      });
  } else {
    console.log("Database was not OPENED");
  }
};

listContact() {
  return new Promise((resolve) => {
    const contacts = [];
    this.initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('SELECT c.contactId, c.name, c.contactImage FROM Contact c', []).then(([tx,results]) => {
          console.log("Query completed");
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(`Prod ID: ${row.contactId}, Prod Name: ${row.name}`)
            const { contactId, name, contactImage } = row;
            contacts.push({
              contactId,
              name,
              contactImage
            });
          }
          console.log(contacts);
          resolve(contacts);
        });
      }).then((result) => {
        this.closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

contactById(id) {
  console.log(id);
  return new Promise((resolve) => {
    this.initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM Contact WHERE contactId = ?', [id]).then(([tx,results]) => {
          console.log(results);
          if(results.rows.length > 0) {
            let row = results.rows.item(0);
            resolve(row);
          }
        });
      }).then((result) => {
        this.closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

addProduct(contact) {
  return new Promise((resolve) => {
    this.initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO Product VALUES (?, ?, ?, ?, ?)', [contact.contactId, contact.name, contact.mobile, contact.landline, contact.contactImage]).then(([tx, results]) => {
          resolve(results);
        });
      }).then((result) => {
        this.closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

updateContact(id, contact) {
  return new Promise((resolve) => {
    this.initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('UPDATE Contact SET name = ?, mobile = ?, landline = ?, contactImage = ? WHERE contactId = ?', [contact.name, contact.mobile, contact.landline, contact.contactImage, id]).then(([tx, results]) => {
          resolve(results);
        });
      }).then((result) => {
        this.closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

deleteContact(id) {
  return new Promise((resolve) => {
    this.initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM Contact WHERE contactId = ?', [id]).then(([tx, results]) => {
          console.log(results);
          resolve(results);
        });
      }).then((result) => {
        this.closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

const Database = () => {
    initDB();
};

export default Database;