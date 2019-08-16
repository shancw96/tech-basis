let cooking = name=>{
  console.log(`add ${name}`)
  return name2=>{//closure : name
    console.log(`add ${name2}`)
    return name3=>{//closure1: name2  name  
      console.log(`add ${name3}`)
      console.log('now cooking please wait')
      setTimeout(()=>{//closure2 : name3 name2 name
        console.log('-------------------------')
        console.log(`enjoy your ${name} ${name2} ${name3} soup`)
      },1*1000)
    }
  }
}

let tempCook = cooking('noodle')
let tempCook2 = tempCook('salt')
let finalCook = tempCook2('meat')
/***************** same as *************** */
// cooking('noodle')('salt')('meat')


//functional JS is composeble