{
  {
    console.log(a)//undefined
    var a = 1
  }
  //============
  {
    console.log(a)//ReferenceError: a is not defined
    let a = 1
  }

  {
    console.log(a)//ReferenceError: a is not defined
    const a = 1
  }
}
