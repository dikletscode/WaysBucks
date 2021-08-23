const getTopping = (isSelected: boolean[], topping: any[]) => {
  let arr: any[] = [];
  isSelected.map((item, index) => {
    if (item == true) {
      arr.push(topping[index]);
    }
  });
  return arr;
};

export default getTopping;
