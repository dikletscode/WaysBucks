const convert = (numberInput: string) => {
  let arr: string[] = [];
  let digit = numberInput.length - 1;

  [...numberInput].forEach((number, index) => {
    arr.push(number);
    if (index === digit - 3) {
      arr.push(".");
    }
    if (index === digit - 6) {
      arr.push(".");
    }
  });

  return arr.join("");
};

export default convert;
