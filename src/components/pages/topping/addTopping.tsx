import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useEffect,
  useState,
} from "react";

import Input, { Submit } from "../../custom/components/input";
import useLocalStorage from "../../custom/hooks/setLocalStorage";
import { icon, image } from "../../assets/assetsRegister";
import { v4 as uuidv4 } from "uuid";
import { AddProductType } from "../../../services/product";
import { addTopping } from "../../../services/topping";
import { toping } from "../../assets/toppingRegister";
import SuccessCreate from "../../modal/another/addProduct";

const AddTopping = () => {
  const [input, setInput] = useState<AddProductType>({
    title: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const copy = e.target.files[0];

      setPreview(URL.createObjectURL(copy));
      setInput((prev) => ({
        ...prev,
        ["image"]: copy,
      }));
    }
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  let forms = new FormData();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.image != null) {
      forms.set("title", input.title);
      forms.set("price", input.price);
      forms.set("image", input.image);
    }
    const AddProduct = async () => {
      try {
        setPopUp(true);
        setIsLoading(true);
        await addTopping(forms);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    AddProduct();
  };

  return (
    <>
      <SuccessCreate
        open={popUp}
        close={() => setPopUp(false)}
        isLoading={isLoading}
      />
      <div className="flex justify-between items-center pt-52 px-44 ">
        <div className="mx-auto">
          <h1 style={{ color: "#BD0707" }}>Add Topping</h1>
          <form action="" onSubmit={submit}>
            <Input
              name="title"
              type="text"
              value={input.title}
              nameField="Title"
              change={handleChange}
            />

            <Input
              name="price"
              type="number"
              value={input.price}
              nameField="price"
              change={handleChange}
            />

            <div className="text-center  px-2 mb-2  rounded-md     border-2 mt-2  bg-cream h-12 border-base">
              <label htmlFor="" className="  ">
                <input
                  onChange={handleChange}
                  type="file"
                  className={`opacity-0 w-full  `}
                  required
                />
                <div className="flex justify-end -mt-7 ">
                  <img
                    src={image.attach}
                    className="h-11 w-7 object-cover p-1  "
                    alt=""
                  />
                </div>
              </label>
            </div>

            <Submit value="submit" />
          </form>
        </div>
        <div className="mx-auto text-center">
          <h3 className="text-base font-sans font-medium text-2xl">
            Image Preview
          </h3>
          <img
            src={preview || image.topping}
            className="h-96 w-96 object-cover"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default AddTopping;
