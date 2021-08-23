import React, {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { gif, icon, image } from "../../assets/assetsRegister";
import { ProfileTypes } from "../../types/interface";

const UserProfile = () => {
  let user = localStorage.getItem("_basicInfo");
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
  }, [user]);

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
                    style={{ display: "none" }}
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
        <div style={style.box}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", padding: "20px" }}>
              <img src={icon.profile} alt="" style={style.imgProduct} />
              <div style={{ paddingLeft: "20px" }}>
                <h5>"heeek</h5>
                <p style={{ fontSize: "0.8em" }}>
                  Topping: <p> tidak ada</p>
                </p>
              </div>
            </div>
            <div style={{ display: "flex", padding: "20px" }}>
              <img src={icon.profile} alt="" style={style.imgProduct} />
              <div style={{ paddingLeft: "20px" }}>
                <h5>"heeek</h5>
                <p style={{ fontSize: "0.8em" }}>
                  Topping: <p> tidak ada</p>
                </p>
              </div>
            </div>
            <div style={{ display: "flex", padding: "20px" }}>
              <img src={icon.profile} alt="" style={style.imgProduct} />
              <div style={{ paddingLeft: "20px" }}>
                <h5>"heeek</h5>
                <p style={{ fontSize: "0.8em" }}>
                  Topping: <p> tidak ada</p>
                </p>
              </div>
            </div>
          </div>

          <div style={style.rightSide}>
            <div style={style.imgBox}>
              <img src={image.logo} alt="" />
            </div>
            <div style={style.imgBox}>
              <img src={image.barcode} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;

const style = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 60px",
  } as CSSProperties,
  myProfile: {
    width: "50%",
  } as CSSProperties,
  transaction: {
    width: "50%",
  } as CSSProperties,
  avatar: {
    width: "270px",
    height: "320px",
    objectFit: "cover",
  } as CSSProperties,
  box: {
    backgroundColor: "#F7DADA",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  rightSide: {
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
  imgBox: {
    padding: "50px",
  } as CSSProperties,
  upload: {
    border: "1px solid #ccc",
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer",
    backgroundColor: "tomato",
  } as React.CSSProperties,
  avatarFile: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  } as React.CSSProperties,
};
