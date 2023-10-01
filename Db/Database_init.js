function DbInit(db) {
    Create_aktywnosci_tygodniowe(db);
    Create_aktywnosci_wykonane(db);
    Create_lista_aktywnosci_tygodniowych(db);
}

function Create_aktywnosci_tygodniowe(db) {
    db.transaction(tx => {
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS aktywnosci_tygodniowe (
            lp int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            id_aktywnosci int(10) UNSIGNED NOT NULL,
            godzina_od time NOT NULL,
            godzina_do time NOT NULL,
            tydzien_rok_od int(11) NOT NULL,
            tydzien_rok_do int(11) NOT NULL,
            dzien int(11) NOT NULL,
            rok int(11) NOT NULL
        ) DEFAULT CHARSET=utf8;`,
        [],
        (_, result) => { console.log("Tabela utworzona!"); },
        (_, error) => { console.error("Błąd podczas tworzenia tabeli:", error); return true; }
        );
    });
}

function Create_aktywnosci_wykonane(db) {
    db.transaction(tx => {
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS aktywnosci_tygodniowe (
            lp int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            id_aktywnosci int(10) UNSIGNED NOT NULL,
            rodzaj enum('tygodniowa') NOT NULL,
            data date NOT NULL
        ) DEFAULT CHARSET=utf8;`,
        [],
        (_, result) => { console.log("Tabela utworzona!"); },
        (_, error) => { console.error("Błąd podczas tworzenia tabeli:", error); return true; } 
        );
    });
}

function Create_lista_aktywnosci_tygodniowych(db) {
    db.transaction(tx => {
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS lista_aktywnosci_tygodniowych (
            id_aktywnosci int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            nazwa varchar(35) NOT NULL,
            kalendarz tinyint(1) NOT NULL,
            godzinowa tinyint(1) NOT NULL,
            liczba_godzin tinyint(3) UNSIGNED NOT NULL,
            aktywna tinyint(1) NOT NULL
        ) DEFAULT CHARSET=utf8;` ,
        [],
        (_, result) => { console.log("Tabela utworzona!"); },
        (_, error) => { console.error("Błąd podczas tworzenia tabeli:", error); return true; }
        );
    });
}

export default DbInit;

db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ...`,
      [],
      (_, result) => { console.log("Tabela utworzona!"); },
      (_, error) => { console.error("Błąd podczas tworzenia tabeli:", error); return true; }
    );
  });