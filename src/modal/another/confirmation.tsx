import { FC, useState } from "react";
import { gif } from "../../assets/assetsRegister";
import Wrapper from "../../components/wrapper";
import { Button } from "../../pages/admin/admin";
import { enumTransaction } from "../../types/roleEnum";
import { API } from "../../config/axios";

const Confirmation: FC<{
  open: boolean;
  close: () => void;
  id: number;
}> = ({ id, open, close }) => {
  const [success, setSuccess] = useState(false);
  const actionTransac = () => {
    const action = async () => {
      try {
        await API.patch("transactions", {
          id: id,
          status: enumTransaction.SUCCESS,
        });
        setSuccess(true);
        close();
      } catch (error) {
        setSuccess(false);
        console.log(error);
      }
    };
    action();
  };

  return (
    <>
      {open ? (
        <Wrapper>
          {success ? (
            <>
              <img src={gif.success} alt="" />
              <h1>Product added successfully</h1>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-base text-2xl">
                  Please confirm, has the product arrived?
                </p>
                <div className="mx-auto py-6 flex justify-between w-44">
                  <Button inner="no" custom="bg-red-500 " klik={close} />
                  <Button
                    inner="yes"
                    custom="bg-green-500"
                    klik={() => actionTransac()}
                  />
                </div>
              </div>
            </>
          )}
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};
export default Confirmation;
