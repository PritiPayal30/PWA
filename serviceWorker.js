let CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
'/',
'index.html',
'/src/App.tsx',
'/manifest.json'
];


self.addEventListener("install", (event) => {
   let cacheUrls = async () => {
      const cache = await caches.open(CACHE_NAME);
      return cache.addAll(urlsToCache);
   };
   event.waitUntil(cacheUrls());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request)
    .then(function(response) {
        console.log("event.request",event.request);
    if (response) {
    return response;
    }
    return fetch(event.request);
    })
    );
    });


    self.addEventListener('activate',(event) => {
        const cacheWhiteList = []
        cacheWhiteList.push(CACHE_NAME)
        event.waitUntil(caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        )))
    })