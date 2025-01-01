const hour=document.querySelector('.hour');
const minute=document.querySelector('.minutes');
const value=document.querySelector('.value');

const ac=document.querySelector('.ac');
const pm=document.querySelector('.pm');
const percent=document.querySelector('.percent');
const add=document.querySelector('.add');
const subtract=document.querySelector('.subtract');
const multiplication=document.querySelector('.multiply');
const divide=document.querySelector('.divide');
const equalto=document.querySelector('.equal');

const decimal=document.querySelector('.decimal');
const number0=document.querySelector('.number-0');
const number1=document.querySelector('.number-1');
const number2=document.querySelector('.number-2');
const number3=document.querySelector('.number-3');
const number4=document.querySelector('.number-4');
const number5=document.querySelector('.number-5');
const number6=document.querySelector('.number-6');
const number7=document.querySelector('.number-7');
const number8=document.querySelector('.number-8');
const number9=document.querySelector('.number-9');
const numberArray=[
    number0,number1,number2,number3,number4,number5,number6,number7,number8,number9
];
let valueinmemory=null;
let operatorinmemory=null;



// update time
const updateTime=()=>{
    const currentTime=new Date();

    let currentHour=currentTime.getHours();
    const currentminute=currentTime.getMinutes();

    if(currentHour>12){
        currentHour-=12;
    }
    hour.textContent=currentHour.toString();
    minute.textContent=currentminute.toString().padStart(2,'0');

}
setInterval(updateTime,1000);
updateTime();




// add event listner to numbers and decimal
for(let i=0;i<numberArray.length;i++){
    const number=numberArray[i];// Select the current button for the number `i`.
    // Attach a click event listener to the current number button
    number.addEventListener('click',()=>{
        handleNumberClick(i.toString()); // Pass the clicked number (converted to a string) to `handleNumberClick`.
    })
}
decimal.addEventListener('click',()=>{
    const valuestr=getValueStr();// Get the current value displayed as a string.
    if(!valuestr.includes('.')){ //if the value doesnt habe decimal point then
        setStrVal(valuestr+'.'); //add decimal point to value
    }
});

// add event listners to operators
add.addEventListener('click',()=>{
    handleoperatorclick('add');
});
subtract.addEventListener('click',()=>{
    handleoperatorclick('subtract')
});
multiplication.addEventListener('click',()=>{
    handleoperatorclick('multiply')
});

divide.addEventListener('click',()=>{
    handleoperatorclick('divide')
});

equalto.addEventListener('click',()=>{
    if(valueinmemory){
        setStrVal(getresultofoper());
        valueinmemory=null;;
        operatorinmemory=null;
    }
});

// Add Event Listeners to functions
ac.addEventListener('click', () => {
    setStrVal('0');
    valueinmemory = null;
    operatorinmemory = null;
  });

  pm.addEventListener('click', () => {
    const currentValueNum = getValueStrNum();
    const currentValueStr = getValueStr();
  
    if (currentValueStr === '-0') {
      setStrVal('0');
      return;
    }
    if (currentValueNum >= 0) {
      setStrVal('-' + currentValueStr);
    } else {
      setStrVal(currentValueStr.substring(1));
    }
  });
  percent.addEventListener('click', () => {
    const currentValueNum = getValueStrNum();
    const newValueNum = currentValueNum / 100;
    setStrVal(newValueNum.toString());
    valueinmemory = null;
    operatorinmemory = null;
  });
  




// when a number is clicked
const handleNumberClick=(numStr)=>{
const currValStr=getValueStr(); // Get the current value displayed as a string.
// If the current value is '0', replace it with the clicked number
if (currValStr==='0'){
    setStrVal(numStr);
}
else{
 // Otherwise, append the clicked number to the current value
    setStrVal(currValStr+numStr)
}
};

// when an operator is clicked
const handleoperatorclick=(operation)=>{
    //  Retrieve the current value displayed on the calculator as a string
    const currValStr=getValueStr();
    // Check if there is no value stored in memory yet (i.e., this is the first operator click)
    if(!valueinmemory){
        // Store the current value as the first operand in memory
        valueinmemory=currValStr;
        // Store the selected operation (e.g., addition, subtraction, etc.) in memory
        operatorinmemory=operation;
        // Reset the display to '0' to prepare for the next input
        setStrVal('0');
        // Exit the function as there is no need to proceed further for the first operator click
        return;
    }
        // If there is already a value stored in memory, calculate the result of the previous operation
        valueinmemory=getresultofoper();
         // Update the stored operation to the new one selected by the user
         operatorinmemory=operation;
         // Reset the display to '0' to prepare for the next input
         setStrVal('0');
    
}
const getresultofoper=()=>{
     // Convert the current value displayed on the calculator into a number
     const currValNum=getValueStrNum();
     // Convert the value stored in memory (as a string) into a number
     const Valueinmemory=parseFloat(valueinmemory);
     // Declare a variable to hold the result of the operation
     let newValNum;
    // Check which operator is stored in memory and perform the corresponding operation
  if (operatorinmemory === 'add') {
    // Perform addition if the stored operator is 'addition'
    newValNum = Valueinmemory + currValNum;
  } else if (operatorinmemory === 'subtract') {
    // Perform subtraction if the stored operator is 'subtraction'
    newValNum = Valueinmemory - currValNum;
  } else if (operatorinmemory === 'multiply') {
    // Perform multiplication if the stored operator is 'multiplication'
    newValNum = Valueinmemory * currValNum;
  } else if (operatorinmemory === 'divide') {
    // Perform division if the stored operator is 'division'
    newValNum = Valueinmemory / currValNum;
  }
 // Convert the result of the operation into a string and return it
 return newValNum.toString();

};



// valueEl.textContent:

// Fetches the text currently displayed on the calculator.
// Example: If the display shows 1,234, valueEl.textContent will be "1,234".
// .split(','):

// Splits the string into an array by removing commas.
// Example: "1,234" becomes ["1", "234"].
// .join(''):

// Joins the array back into a single string without commas.
// Example: ["1", "234"] becomes "1234".



// function for value as string
const getValueStr=()=>value.textContent.split(',').join('')
// function for value as number
const getValueStrNum=()=>{
    return parseFloat(getValueStr()); // parseFloat():Converts the string into a number.
}

const setStrVal=(valueStr)=>{
// If the last character is a decimal, keep it in the display
if(valueStr[valueStr.length-1] ==='.'){
    value.textContent +='.';
    return;
}
const [wholenumstr,decimalnumstr]=valueStr.split('.');// split the stringnumber(eg 1243.23) into 2 parts
if( decimalnumstr){
    // if there is any decimal between numbers then first convert wholenumberstr into integer and then make it comma seperated and then and '.'  lastly the decimal number
    value.textContent=parseFloat(wholenumstr).toLocaleString()+'.'+decimalnumstr;
}
else{
    // If no decimal part exists, format the whole number with commas
    value.textContent=parseFloat(wholenumstr).toLocaleString();
}
};

