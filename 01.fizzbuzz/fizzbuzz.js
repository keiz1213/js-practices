'use strict'

for(let cnt = 1; cnt < 21; cnt++) {
  if(cnt % (3 * 5) === 0) {
    console.log('FizzBuzz');
  }else if(cnt % 3 === 0){
    console.log('Fizz');
  }else if(cnt % 5 === 0){
    console.log('Buzz');
  }else{
    console.log(cnt)
  }
}
