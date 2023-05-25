const proxyData = reactive({
  count: 1
})

effect(() => {
  proxyData.count += 1;
  console.log(proxyData.count)
})

proxyData.count += 1