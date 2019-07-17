let aList = document.querySelectorAll('a')
let span  = document.querySelector('span.highlight')
aList.forEach(a=>{
  a.addEventListener('mouseover',moveSpan)
})
function moveSpan(e){

  span.style.width = `${this.getBoundingClientRect().width}px`
  span.style.height= `${this.getBoundingClientRect().height}px`
  span.style.left = `${this.getBoundingClientRect().x}px`
  span.style.top = `${this.getBoundingClientRect().y}px`

}