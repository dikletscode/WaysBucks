import React, {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { gif, icon, image } from "../../assets/assetsRegister";
import { ProfileTypes, Transaction } from "../../types/interface";

const UserProfile = () => {
  let user = localStorage.getItem("_basicInfo");
  let transac = localStorage.getItem("_transaction");
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  let reader = new FileReader();
  const [isEditing, setEditing] = useState({
    fullname: false,
    avatar: false,
  });
  const [data, setData] = useState<ProfileTypes | null>(null);
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null && data != null) {
      const copy: ProfileTypes = { ...data };

      let imgs = e.target.files[0];
      reader.readAsDataURL(imgs);
      reader.onload = function () {
        if (reader.result) {
          copy["detail"].avatar = reader.result as string;
          setData(copy);
        }
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };
  useEffect(() => {
    if (user) {
      setData(JSON.parse(user));
    }
    if (transac) {
      setTransaction(JSON.parse(transac));
    }
  }, [user, transac]);

  if (user == null || data == null) {
    return <img src={gif.loading} alt="" />;
  }
  const toogle = (field: string) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
  };
  const changeFullname = (e: ChangeEvent<HTMLInputElement>) => {
    if (data != null) {
      const copy: ProfileTypes = { ...data };
      copy["detail"].fullname = e.target.value;
      setData(copy);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("_basicInfo", JSON.stringify(data || "{}"));
    setEditing((prev) => ({ ...prev, ["fullname" || "Avatar"]: false }));
  };
  if (transaction.length == 0) {
    return <img src={gif.loading} alt="" />;
  }
  console.log(transaction);
  return (
    <div style={style.container}>
      <div style={style.myProfile}>
        <h2>My Profile</h2>
        <div style={{ display: "flex" }}>
          {isEditing.avatar ? (
            <label style={style.upload}>
              <img src={data.detail.avatar} alt="" style={style.avatar} />
              <form action="" onSubmit={submit}>
                <input
                  type="file"
                  id="fullname"
                  onChange={handleImage}
                  style={{
                    height: "200px",
                    width: "200px",
                    position: "absolute",
                    display: "none",
                  }}
                />
                <input type="submit" />
              </form>
            </label>
          ) : (
            <>
              <img
                src={data.detail.avatar}
                alt=""
                style={style.avatar}
                onClick={() => toogle("avatar")}
              />
            </>
          )}
          <div style={{ padding: "0 40px" }}>
            <div style={{ padding: "20px 0" }}>
              <h4>Full Name</h4>
              {isEditing.fullname ? (
                <form action="" onSubmit={submit}>
                  <input
                    type="text"
                    id="fullname"
                    value={data.detail.fullname}
                    onChange={changeFullname}
                  />
                  <input type="submit" />
                </form>
              ) : (
                <>
                  <p>{data.detail.fullname}</p>
                  <button onClick={() => toogle("fullname")}>edit</button>
                </>
              )}
            </div>
            <div>
              <h4>Email</h4>
              <p>{data.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={style.transaction}>
        <h2>My Transaction</h2>
        {transaction.map((item) => {
          return (
            <div
              key={item.paymentCode}
              style={{
                backgroundColor: "#F7DADA",
                display: "flex",
                padding: "15px 10px",
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
                {item.cart.map((item2) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        padding: "20px",
                        width: "100%",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <img
                          src={item2.image}
                          alt=""
                          style={{
                            height: "120px",
                            width: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          padding: "0 10px",
                          color: "#BD0707",
                          fontFamily: "'Josefin Sans', sans-serif",
                        }}
                      >
                        <h3>Ice Cofee palm sugar</h3>
                        <p>{new Date(item.orderDate).toDateString()}</p>
                        <p>
                          Topping:
                          {item2.topping.map((item3) => {
                            return " " + item3.title + ",";
                          })}
                        </p>

                        <p>Price: 27.000</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    src={image.logo}
                    alt=""
                    style={{ padding: "50px", height: "70px", width: "70px" }}
                  />
                  <img
                    src={image.barcode}
                    alt=""
                    style={{
                      padding: "0 0 10px 0",
                      height: "120px",
                      width: "120px",
                    }}
                  />
                  <img src={image.otw} alt="" />
                  <p>SubTotal : {item.total}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserProfile;

const style = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 100px",
  } as CSSProperties,
  myProfile: {
    width: "50%",
  } as CSSProperties,
  transaction: {
    width: "60%",
    padding: "0 20px",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  avatar: {
    width: "270px",
    height: "320px",
    objectFit: "cover",
  } as CSSProperties,

  imgProduct: {
    height: "120px",
    width: "100px",
    objectFit: "cover",
  } as CSSProperties,
  iconR: {
    objectFit: "contain",
    height: "20px",
    paddingRight: 0,
  } as CSSProperties,

  imgBox: {
    padding: "50px",
  } as CSSProperties,
  upload: {
    border: "1px solid #ccc",
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer",
  } as React.CSSProperties,
  avatarFile: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  } as React.CSSProperties,
};
