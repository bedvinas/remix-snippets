self.addEventListener("install", (e) => {
  console.log("log from sw: install event");
});

self.addEventListener("activate", (event) => {
  console.log("log from sw: 'activate' event");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  let request = event.request;
  let url = request.url;
  let method = request.method;
  let headers = request.headers;

  // Ignore requests other than 'get'
  if (method.toLowerCase() !== "get" || !url.startsWith("http")) {
    return;
  }
  //
  if (url.includes('.png') || url.includes('.css')) {
     return event.respondWith(cacheFallbackToNetworkPutInCache(request));
  }

  event.respondWith(networkFallbackToCache(event));
});


//------- Helpers

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

//------- Strategies

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
  putInCache(request, responseFromNetwork.clone())
  return responseFromNetwork;
};