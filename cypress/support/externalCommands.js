export { checkValue }

function checkValue(price1, price2, price3){
  if(price1+price2 !== price3) {
    throw new Error("the sum of the item's price doesn't met with the expected result price")
  };
}
