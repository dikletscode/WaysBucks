import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useEffect,
  useState,
} from "react";

import Input, { Submit } from "../../../custom/components/input";
import useLocalStorage from "../../../custom/hooks/setLocalStorage";
import product from "../../../mock/product.json";
import { icon } from "../../../assets/assetsRegister";
import { v4 as uuidv4 } from "uuid";

interface ProductInput {
  id: string;
  title: string;
  price: number;
  image: string;
}

const AddProduct = () => {
  const [input, setInput] = useState<ProductInput>({
    id: uuidv4(),
    title: "",
    price: 0,
    image: "",
  });
  const [value, setValue] = useLocalStorage("_product", product);

  let reader = new FileReader();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copy = { ...input };

    if (e.target.name != "price") {
      setInput((prevInput: ProductInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value,
      }));
    } else {
      setInput((prevInput: ProductInput) => ({
        ...prevInput,
        ["price"]: e.target.valueAsNumber,
      }));
    }
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
    localStorage.setItem("_product", JSON.stringify(value));
  }, [value]);

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
export default AddProduct;
