const getSelected = (isSelected: boolean[], topping: any[]) => {
  let arr: any[] = [];
  isSelected.map((item, index) => {
    if (item === true) {
      arr.push(topping[index].id);
    }
  });
  return arr;
};

export default getSelected;
