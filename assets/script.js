var temp = "";
var tempCalc;
var clear = false;
var flag = false;

// displays totals in the display element
var display = function (e) {
  debugger;
  if (e === "." && flag === true) {
    return;
  }
  if (clear === true) {
    $("#display").val("");
    clear = false;
  }
  var r = $("#display").val() + e;
  if (e === ".") {
    flag = true;
  } else {
    r *= 1;
  }
  $("#display").val(r);
}

// used to do calculation when operators are used without equal sign
var calculate = function (e) {
  debugger;
  if(temp) {
    result();
  }
  flag = false;
  clear = true;
  temp = $("#display").val();
  tempCalc = e;
}

// listener to clear screen and temp variable
$("#clear").click(function () {
  temp = 0;
  $("#display").val("0");
});

// listener for change the sign button
$("#change-sign").click(function () {
  $("#display").val($("#display").val() * -1);
});

// listener for bacspace button, backs up one space and sets display to zero if 
// there are no numbers to backspace over
$("#backspace").click(function () {
  var digits = $("#display").val().length;
  $("#display").val($("#display").val().substring(0, digits -1));
  if($("#display").val().length === 0) {
    $("#display").val("0");
  }
});

// result function does the calculations and calls the display function
var result = function () {
  if (temp === 0) {
    return;
  }
clear = true;
var r;
var s = parseFloat($("#display").val());
temp = parseFloat(temp);
  switch (tempCalc) {
  case "+":
    r = temp + s;
    break;
  case "-":
    r = temp - $("#display").val();
    break;
  case "*":
    r = temp * $("#display").val();
    break;
  case "/":
    r = temp / $("#display").val();
    break;
}
  // converts number to string, checks the length and gets rid of extra decimals for display
  var numString = r.toString();
  if (numString.length > 12) {
    numString = numString.slice(0, 12 - numString.length);
  }
  // convert back to number
  r = parseFloat(numString);
  
  // if number is too large, displays error if not calls the display function
  if (r > 9999999999.9) {
    $("#display").val("ERROR");
  } else {
    display(r);
    clear = true;
    flag = false;
    temp = 0;
  }
};

// listener for digits to be clicked, calls display function
$(".digit").click(function(digit) {
  display(digit.target.value);
});


// listener for operators, calls calculate function
$("#divide, #multiply, #minus, #plus").click(function (digit) {
  calculate(digit.target.value);
});

// listener for equal sign, calls the result function
$("#equal").click(function () {
  result();
});

