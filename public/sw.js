const version = "0.0.1";
const staticCache = `static-${version}`;
const dynamicCache = `dynamic-${version}`;

self.addEventListener("install", (e) => {
  console.log("SW 'install' event");
  e.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache.addAll(["/build/_assets/"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("SW 'activate' event");
  event.waitUntil(self.clients.claim());
});

// self.addEventListener("fetch", (event) => {
//   if (event.request.method.toLowerCase() !== "get") {
//     return;
//   }

//   event.respondWith(
//     caches
//       .open(staticCache)
//       .then((cache) => cache.match(event.request, { ignoreSearch: false }))
//       .then((response) => {
//         return response || fetch(event.request);
//       })
//   );
// });

self.addEventListener("fetch", (event) => {
  let url = event.request.url;
  let method = event.request.method;

  // Ignore requests other than 'get'
  if (method.toLowerCase() !== "get" || !url.startsWith("http")) {
    return;
  }

  caches.open(dynamicCache).then((cache) => {
    cache.add(event.request);
  });

  event.respondWith(networkFallbackToCache(event));
});

// Advanced caching version
// self.addEventListener('fetch', (event) => {
//   if (event.request.method.toLowerCase() !== "get") {
//     return;
//   }

//   event.respondWith(
//     caches.open(dynamicCache).then((cache) => {
//       return cache.match()
//     })
//   );
// });

//------- Strategies

async function networkFallbackToCache(event) {
  const request = event.request;
  const url = request.url;
  return fetch(request).catch((error) => {
    console.log(`Network fail for ${url}: ${error}`);
    return caches.match(event.request);
  });
}
