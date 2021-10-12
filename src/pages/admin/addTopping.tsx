import { ChangeEvent, FormEvent, useState } from "react";

import Input, { Submit } from "../../components/custom/components/input";

import { image } from "../../assets/assetsRegister";

import { AddProductType } from "../../services/product";

import SuccessCreate from "../../modal/another/addProduct";
import { API } from "../../config/axios";

const AddTopping = () => {
  const [input, setInput] = useState<AddProductType>({
    title: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameFile, setNameFile] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const copy = e.target.files[0];
      setNameFile(copy.name);

      setPreview(URL.createObjectURL(copy || ""));
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
        await API.post("topping", FormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
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
        isLoading={isLoading}
        open={popUp}
        close={() => setPopUp(false)}
      />
      <div className="flex justify-between items-center pt-44 px-44 ">
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

            <div className="    rounded-md h-14    border-2 my-3  bg-cream  border-base">
              <Input type="file" display="opacity-0" change={handleChange} />
              <div className="flex items-center w-full justify-between  -my-24 pt-5">
                <div>
                  <p className="pl-2 text-gray-400 ">
                    {nameFile || "Upload File"}
                  </p>
                </div>

                <img
                  src={image.attach}
                  className="h-11 w-7 object-cover p-1  "
                  alt=""
                />
              </div>
            </div>

            <Submit value="submit" />
          </form>
        </div>
        <div className="mx-auto text-center">
          <h1 className="text-base font-bold text-2xl mx-auto">
            Image Preview
          </h1>
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
