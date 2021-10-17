const calculate = (arr: number[], arr2: number[]) => {
  let a = 0;
  arr.map((item, index) => {
    a += item * arr2[index];
  });
  return a;
};
export default calculate;
