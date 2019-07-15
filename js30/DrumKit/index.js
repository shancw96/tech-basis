document.addEventListener('keydown',e=>{
  let audio = document.querySelector(`audio[keyword="${e.code}"]`)
  document.querySelector(`div.drum[Keyword="${e.code}"]`).classList.add('active')
  // console.log(document.querySelector(`div.drum[Keyword="${e.code}"]`))
  audio.currentTime=0;
  audio? audio.play():''
  setInterval(()=>{
    document.querySelector(`div.drum[Keyword="${e.code}"]`).classList.remove('active')
  },100)
})