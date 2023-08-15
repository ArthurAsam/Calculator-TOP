const operatorButtons = document.querySelectorAll('.data-operator'); 
const numberButtons = document.querySelectorAll('.data-number'); 
const clearButton = document.querySelector('.all-clr'); 
const plusMinus = document.querySelector('.plusminus'); 
const percent = document.querySelector('.percent'); 
const equals = document.querySelector('.equals'); 
const backspace = document.querySelector('.backspace'); 
const decimal = document.querySelector('.decimal'); 
let num1 = document.querySelector('.num1'); 
let num2 = document.querySelector('.num2'); 
const buttons = document.querySelectorAll('button'); 
const display = document.querySelector('display'); 
const container = document.querySelector('.container'); 
let operator = document.querySelector('.operator');


function clear(event){
   num1.textContent = ''; 
   num2.textContent = ''; 
   operator.textContent = ''; 
}; 

function goBack(event){
    if(operator.textContent == '' || operator.textContent == 0){
        let numArray = num1.textContent.split(''); 
        numArray.splice(-1, 1); 
        let arrayToStr = numArray.join(''); 
        num1.textContent = arrayToStr; 
    } else if(operator.textContent != '' && num2.textContent == '' || operator.textContent != 0 && num2.textContent == ''){
        let str = operator.textContent.split(''); 
        str.splice(-1, 1); 
        let arrayToStr = str.join(''); 
        operator.textContent = arrayToStr; 
    } else if (num2.textContent != ''){
        let numArray = num2.textContent.split(''); 
        numArray.splice(-1, 1); 
        let arrayToStr = numArray.join(''); 
        num2.textContent = arrayToStr; 
    } else {
        return error; 
    }
}; 

function handleDigit(event){
    if(operator.textContent == '' || operator.textContent == 0){
        num1.textContent += event.target.textContent;
    } else {
        num2.textContent += event.target.textContent;
    }
}; 

function toggleMinus(event){
    let newTarget = '-'; 

    if(operator.textContent == '' || operator.textContent == 0){
        if (num1.textContent.includes('-'))return; 
        let numArray = num1.textContent.split(''); 
        numArray.unshift(newTarget); 
        let arrayToStr = numArray.join(''); 
        num1.textContent = arrayToStr; 
    } else if (operator.textContent != 0 || operator.textContent != ''){
        if(num2.textContent.includes('-')) return; 
        let numArray = num2.textContent.split(''); 
        numArray.unshift(newTarget); 
        let arrayToStr = numArray.join(''); 
        num2.textContent = arrayToStr; 
    } 
}; 

function toPercent(event){
    if (operator.textContent == 0 || operator.textContent == ''){
        let strToNum = Number(num1.textContent); 
        console.log(strToNum)
        num1.textContent = strToNum / 100; 
    } else {
        let strToNum = Number(num2.textContent); 
        num2.textContent = strToNum / 100; 
    }
}; 
function addDecimal(event){
    if(operator.textContent == '' || operator.textContent == 0){
        if (num1.textContent.includes('.'))return; 
        num1.textContent += event.target.textContent;  
    } else if (operator.textContent != 0 || operator.textContent != ''){
        if(num2.textContent.includes('.')) return; 
        num2.textContent += event.target.textContent;  
    } 
    
}



function updateDisplay(event){

  if (event.target.textContent >= 0 && event.target.textContent <= 9){
    handleDigit(event); 
  }
 
  operatorButtons.forEach((button) => {
   if (button.textContent == event.target.textContent){
    operator.textContent = event.target.textContent; 
   }
  }); 

  if (event.target.textContent == equals.textContent){
    operate(num1.textContent, num2.textContent, operator.textContent); 
  }
  if (event.target.textContent == clearButton.textContent){
    clear(event); 
  }
  if (event.target.textContent == backspace.textContent){
    goBack(event); 
  }
  if (event.target.textContent == plusMinus.textContent){
    toggleMinus(event); 
  }

  if (event.target.textContent == percent.textContent){
    toPercent(event); 
  }
  if (event.target.textContent == decimal.textContent){
    addDecimal(event); 
  }


   
}; 


function operate(value1, value2, operatorVar){
    let result;
    let value1 = parseFloat(value1); 
    let value2 = parseFloat(value2); 
     if (isNaN(value1) || isNaN(value2)) return; 

    switch (operatorVar){
        case 'x': 
             result = +value1 * +value2; 
             break; 
        case '+': 
            result = +value1 + +value2; 
            break; 
        case '-':
            result = +value1 - +value2; 
            break; 
        case '/':
            if (value2 == 0) {
                num1.textContent = ''; 
                operator.textContent = undefined; 
                return num2.textContent = 'Not Today';
            } 
            else result = +value1 / +value2; 
            break; 
        default: 
            return null; 
    }
    
        console.log(result)
        num1.textContent = ''; 
        operator.textContent = undefined; 
        num2.textContent = result; 


}




container.addEventListener('click', updateDisplay); 