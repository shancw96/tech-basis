
let nav = document.querySelector('.nav')

let topNav = nav.offsetTop
let logo = document.querySelector('.nav .logo')
let content = document.querySelector('.content')
document.addEventListener('scroll',handleScroll)


function handleScroll(){
  console.log(window.scrollY + '  '+ nav.offsetTop)
  if(window.scrollY >= topNav){
    nav.classList.add('fixed-nav')
    content.style.paddingTop = nav.getBoundingClientRect().height+'px'
    logo.style.maxWidth = "150px"
  }else{
    logo.style.maxWidth = "0px"
    nav.classList.remove('fixed-nav')
    content.style.paddingTop =0
  }
}