class LoginForm {
  constructor(){
    this.state = 'hide'
  }
  show(){
    if(this.state == 'show'){
      console.log('相同操作')
    }else{
      this.state = 'show'
      console.log('set success')
    }
  }
  hide(){
    if(this.state == 'hide'){
      console.log('相同操作')
    }else{
      this.state = 'hide'
      console.log('set success')
    }
  }
}

LoginForm.getInstance = (function(){
  let instance ;
  return function(){
    if(instance == null){
      instance = new LoginForm()
    }
    return instance
  }
})()

let login1 = LoginForm.getInstance();
login1.show()//set success
let login2 = LoginForm.getInstance();
login2.show()//相同操作
/**
 * set success
example.js:10
相同操作
 */