/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 19:13:14
 * @LastEditTime: 2019-08-11 22:22:12
 * @LastEditors: Please set LastEditors
 */

function Transport(){
  this.walk = walk
}

function walk(){
  console.log('du~du~du')
}

Transport.prototype.message = 'i am common msg'

let bike  = new Transport()
let moto = Object.create(bike)
bike.walk()
console.log(bike.prototype)
console.log(bike.constructor.prototype)
console.log(bike instanceof Function)
