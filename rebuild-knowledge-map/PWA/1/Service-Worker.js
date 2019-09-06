const cacheName = 'V1'
const cacheAssets = [
  'index.html',
  'about.html',
  'main.js',
  'index.css'
]
//self 属性返回指向当前 window 对象的引用，
//利用这个属性，可以保证在多个窗口被打开的情况下，正确调用当前窗口内的函数或属性而不会发生混乱。
self.addEventListener('install',e=>{
  console.log('Service Workder: Installed')
  e.waitUntil(//waitUntil告诉浏览器当前cache正在执行，通过内部的Promise状态来检测
    caches
      .open(cacheName)//打开缓存目录
      .then(cache=>{
        console.log(`Service Workder :Caching Files`)
        cache.addAll(cacheAssets)//将指定url的文件进行cache缓存
      })
      .then(()=>self.skipWaiting())
  )
  //self.skipWaiting()：self 是当前 context 的 global 变量，执行该方法表示强制当前处在 waiting 状态的 Service Worker 进入 activate 状态。
})
// 调用active事件
self.addEventListener('activate',e=>{
  console.log('Service Worker :Activate')
  //remove unwanted cache
  e.waitUntil(//返回一堆promise，returns a Promise that resolves to an array of Cache keys.
    caches.keys().then(cacheNames=>{
      return Promise.all(
        cacheNames.map(cache=>{
          if(cache !== cacheName){
            console.log('Service Worker :clearing Old Cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

//fech Event(离线展示)
self.addEventListener('fetch',e=>{
  console.log('Service Worker: Fetching');
  e.respondWith(//The respondWith() method of FetchEvent prevents the browser's default fetch handling, and allows you to provide a promise for a Response yourself.
    fetch(e.request).catch(()=>{
      caches.match(e.request)
    })
  )
})
