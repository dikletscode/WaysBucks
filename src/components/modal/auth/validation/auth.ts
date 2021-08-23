import { idText } from "typescript";
import buyyer from "../../../mock/buyyer.json";
import failResponse from "../../../mock/failResponse.json";
import { UserSignIn } from "../../../types/interface";

const fetchData = (input: UserSignIn): Promise<any> => {
  return new Promise((resolve, reject) => {
    buyyer.map((user) => {
      if (user.email === input.email && user.password === input.password) {
        resolve(user);
      }
    });
    reject(failResponse);
  });
};

export default fetchData;
