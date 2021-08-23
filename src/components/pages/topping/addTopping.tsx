import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useEffect,
  useState,
} from "react";

import Input, { Submit } from "../../custom/components/input";
import useLocalStorage from "../../custom/hooks/setLocalStorage";
import { icon } from "../../assets/assetsRegister";
import { v4 as uuidv4 } from "uuid";
import topping from "../../mock/topping.json";

const AddTopping = () => {
  const [input, setInput] = useState({
    id: uuidv4(),
    title: "",
    price: "",
    image: "",
  });
  const [value, setValue] = useLocalStorage("_topping", topping);

  let reader = new FileReader();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput: typeof input) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      let imgs = e.target.files[0];
      reader.readAsDataURL(imgs);
      reader.onload = function () {
        if (reader.result) {
          setInput((prevInput: typeof input) => ({
            ...prevInput,
            ["image"]: reader.result as string,
          }));
        }
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValue((prev: any) => [...prev, input]);
  };
  useEffect(() => {
    localStorage.setItem("_topping", JSON.stringify(value));
  }, [value, topping]);

  return (
    <div style={style.container}>
      <div style={style.form}>
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
            nameField="pricer"
            change={handleChange}
          />
          <Input
            name="image"
            type="file"
            nameField="Image"
            change={handleImage}
          />

          <Submit value="Add Product" />
        </form>
      </div>
      <div style={style.preview}>
        <h4>Image Preview</h4>
        <img
          src={input.image || icon.starbak}
          style={{
            height: "540px",
            width: "500px",
            objectFit: "cover",
          }}
          alt=""
        />
      </div>
    </div>
  );
};

const style = {
  container: {
    display: "flex",
    padding: "5px 30px",
    justifyContent: "center",
  } as CSSProperties,

  preview: {
    padding: "0 70px",
    display: "flex",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  } as CSSProperties,

  form: {
    width: "30%",
    padding: "100px 40px 0 0",
  } as CSSProperties,
};
export default AddTopping;
