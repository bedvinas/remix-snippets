const cacheName = "SnippetCloud";

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        'icons/icon-192x192.png',
        'build/_assets/tailwind-TR2CZYAU.css',
        'favicon.ico',
        'icons/icon-256x256.png',
        'icons/icon-384x384.png',
        'icons/icon-512x512.png',
      ]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("log from sw: 'activate' event");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  let request = event.request;
  let url = request.url;
  let method = request.method;

  // Ignore requests other than 'get'
  if (method.toLowerCase() !== "get" || !url.startsWith("http")) {
    return;
  }
  // Theses items are already in cache after sw install
  if (url.includes('.png') || url.includes('.ico') || url.includes('.css')) {
    // Respond from cache, if no match, fetch from network and put in cache and return
     return event.respondWith(cacheFallbackToNetworkPutInCache(event.request));
  }
  // Cache every other request
  caches.open(cacheName).then((cache) => {
    cache.add(event.request);
  });
  // Serve from network, if network fails, serve from cache
  return event.respondWith(networkFallbackToCache(event));
});


//------- Helpers

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

//------- Strategies

// async function networkPutInCacheFallbackToCache(event) {
//   const request = event.request;
//   const url = request.url;
//   return fetch(request)
//   .then((response)=>{
//     const clonedResponse = response.clone();
//     const responseFromCache = await caches.match(request);
//     if (!responseFromCache) { 
//         putInCache(request, clonedResponse);
//   }
//     return clonedResponse;
//   })
//   .catch((error) => {
//     console.log(`Network fail for ${url}: ${error}`);
//     return caches.match(request);
//   });
// }

async function networkPutInCacheFallbackToCache(event) {
    const request = event.request;
    const Resp = await fetch(request)
      .catch((e)=>{
        console.log(`Network fail for ${request.url}: ${e}`);
        return caches.match(request);
      });
    const clonedResp = Resp.clone();
    const responseFromCache = await caches.match(request);
    if (!responseFromCache) {
      putInCache(request, clonedResp);
    }
    return clonedResp;
}

async function networkFallbackToCache(event) {
  const request = event.request;
  const url = request.url;
  return fetch(request).catch((error) => {
    console.log(`Network fail for ${url}: ${error}`);
    return caches.match(event.request);
  });
}

async function cacheFallbackToNetworkPutInCache(request) {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) { 
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  const clonedResponse =  responseFromNetwork.clone();
  putInCache(request, clonedResponse)
  return clonedResponse;
};