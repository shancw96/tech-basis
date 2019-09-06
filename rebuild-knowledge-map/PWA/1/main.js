if(navigator.serviceWorker){
  console.log('Service Worker supported')
  //监听load事件，注册sw
  window.addEventListener('load',()=>{//Log ServiceWorkder when the page is fully loaded:
    navigator.serviceWorker
      .register('./Service-Worker.js')//register serviceWorker
      .then(res=>console.log('ServiceWorkder :Registered!'))
      .catch(e=>console.log(`ServiceWorker:Error:${e}`))
  })
}
