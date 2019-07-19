let triggles = document.querySelectorAll('.nav-item')
let highlightSpan = document.querySelector('span.highlight')
triggles.forEach(triggle => triggle.addEventListener('mouseenter', handleEnter))
triggles.forEach(triggle => triggle.addEventListener('mouseleave', handleLeave))


function handleEnter() {
  this.classList.add('mouse-in')
  setTimeout(() => {
    this.classList.add('mouse-in-active')

    let dropDown = document.querySelector('.mouse-in .nav-content').getBoundingClientRect();
    let dropDownPro = {
      width:dropDown.width+'px',
      height:dropDown.height+'px',
      top:(dropDown.y+15)+'px',
      left:dropDown.x+'px'
    }
    console.log(dropDownPro)
    highlightSpan.classList.add('open')
    highlightSpan.style.width = dropDownPro.width
    highlightSpan.style.height = dropDownPro.height
    highlightSpan.style.top = dropDownPro.top
    highlightSpan.style.left = dropDownPro.left
  }, 50)
}

function handleLeave() {
  this.classList.remove('mouse-in')
  this.classList.remove('mouse-in-active')
  highlightSpan.classList.remove('open')
  // highlightSpan.style.width = "50px"
}