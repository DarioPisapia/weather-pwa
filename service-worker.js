'use strict';
// Array di configurazione del service worker
var config = {
version: 'versionesw1::',
// Risorse da inserire in cache immediatamente - Precaching
staticCacheItems: [
  
],
};
// Funzione che restituisce una stringa da utilizzare come chiave per la cache
const cacheName = (key, opts) => {
    return `${opts.version}${key}`;
}
// Evento install
self.addEventListener('install', event => {
    event.waitUntil(
   // Inserisco in cache le URL configurate in config.staticCacheItems
    caches.open( cacheName('static', config) ).then(cache => cache.addAll(config.staticCacheItems))
   // self.skipWaiting() evita l'attesa, il che significa che il service worker si attiverà immediatamente non appena conclusa l'installazione
    .then( () => self.skipWaiting() ) 
 );
 console.log("Service Worker Installato");
});

//evento activate
self.addEventListener('activate', event => {
    // Questa funzione elimina dalla cache tutte le risorse la cui chiave non contiene il nome della versione
    // impostata sul config di questo service worker
    function clearCacheIfDifferent(event, opts) {
      return caches.keys().then(cacheKeys => {
        var oldCacheKeys = cacheKeys.filter(key => key.indexOf(opts.version) !== 0);
        var deletePromises = oldCacheKeys.map(oldKey => caches.delete(oldKey));
        return Promise.all(deletePromises);
      });
    }
   event.waitUntil(
    // Se la versione del service worker cambia, svuoto la cache
    clearCacheIfDifferent(event, config)
    // Con self.clients.claim() consento al service worker di poter intercettare le richieste (fetch) fin da subito piuttosto che attendere il refresh della pagina
    .then( () => self.clients.claim() )
    );
    console.log("Service Worker Avviato");
   });

//evento fetch
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // The response is a stream and in order the browser 
            // to consume the response and in the same time the 
            // cache consuming the response it needs to be 
            // cloned in order to have two streams.
            const resClone = res.clone();
            // Open cache
            caches.open(cacheName)
                .then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
            return res;
        }).catch(
            err => caches.match(e.request)
            .then(res => res)
        )
    );
});
   

