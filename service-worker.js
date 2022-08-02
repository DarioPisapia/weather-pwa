'use strict';

//version
var config = {
version: 'versionesw1::',

staticCacheItems: [
  
],
};


const cacheName = (key, opts) => {
    return `${opts.version}${key}`;
}
// install event
self.addEventListener('install', event => {
    event.waitUntil(
    caches.open( cacheName('static', config) ).then(cache => cache.addAll(config.staticCacheItems))
    .then( () => self.skipWaiting() ) 
 );
 console.log("Service Worker Installato");
});

// activate event
self.addEventListener('activate', event => {
    function clearCacheIfDifferent(event, opts) {
      return caches.keys().then(cacheKeys => {
        var oldCacheKeys = cacheKeys.filter(key => key.indexOf(opts.version) !== 0);
        var deletePromises = oldCacheKeys.map(oldKey => caches.delete(oldKey));
        return Promise.all(deletePromises);
      });
    }
   event.waitUntil(
    clearCacheIfDifferent(event, config)
    .then( () => self.clients.claim() )
    );
    console.log("Service Worker Avviato");
   });

// fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
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
   

