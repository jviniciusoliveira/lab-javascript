var ConnectionFactory = (function() {
    
    const stores = ['negociacoes'];
    const dbName = 'baseteste';
    const dbVersion = 1;
    
    var connection = null;
    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível instanciar ConnectionFactory.');
        }
    
        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, dbVersion); 
    
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createOrRenewStores(e.target.result);
                };
    
                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () => {
                            throw new Error('Não é possível fechar diretamente a conexão.');
                        }
                    }
                    resolve(connection);
                }
    
                openRequest.onerror = e => {
                    reject(e.target.error);
                }
            });
        }
    
        static _createOrRenewStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }

})();


