import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HistoryTransaction } from "../../../services/transaction";
import Profile from "./Profile";
import AuthContext from "../../../context/context";
import FailedRequest from "../../../modal/another/failed";
import DetailTransaction from "./detailTransaction";
import Confirmation from "../../../modal/another/confirmation";
import Transaction from "./Transaction";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";
import { API } from "../../../config/axios";

export interface ProfileType {
  id: string;
  email: string;
  profile: {
    fullname: string;
    image: string;
  };
  createdAt: Date;
}

const UserProfile = () => {
  const [transaction, setTransaction] = useState<HistoryTransaction[]>([]);
  const loginUser = localStorage.getItem("_user");
  const { dispatch } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState<ProfileType | null>(null);
  const [isError, setError] = useState(false);
  const [input, setInput] = useState(user?.profile.fullname || "");
  const [openDetail, setOpenDetail] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [id, setId] = useState(0);
  const [idTransac, setIdTranasac] = useState(0);
  const fetchTransaction = async () => {
    try {
      let res = await API.get("orders", { params: { limit: 2 } });
      console.log(res.data, "opopp");
      if (res.data) {
        setTransaction(res.data);
      }
    } catch (error) {
      setError(true);
    }
  };
  const getProfile = async () => {
    try {
      let res = await API.get("profile");
      res.data && setUser(res.data.users);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [update]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const formData = new FormData();
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    input === "" && user?.profile
      ? formData.set("fullname", user?.profile?.fullname)
      : formData.set("fullname", input);

    if (e.target.files) {
      const img = e.target.files[0];
      formData.set("image", img);
    }
    const upload = async () => {
      try {
        setUpdate(true);
        let res = await API.patch("user", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        const json = loginUser && JSON.parse(loginUser);
        json["user"]["profile"]["image"] = res.data?.users?.profile?.image;
        localStorage.setItem("_user", JSON.stringify(json));
        dispatch({ type: "BUYYER_LOGIN_SUCCESS", payload: json.user });
        setUpdate(false);
      } catch (error: any) {
        setError(true);
      }
    };

    upload();
  };

  const ref = useRef<any>();
  const openModalDetail = (id: number) => {
    setOpenDetail(true);
    setId(id);
  };
  const openConfirmModal = (id: number) => {
    setOpenConfirm(true);
    setIdTranasac(id);
  };
  let date = (db: Date) => {
    let dt = new Date(db);
    return dt.toDateString();
  };
  console.log(user?.createdAt);

  return (
    <>
      <Confirmation
        id={idTransac}
        open={openConfirm}
        close={() => setOpenConfirm(false)}
      />
      <DetailTransaction
        open={openDetail}
        id={id}
        close={() => setOpenDetail(false)}
      />
      <div className="container flex pt-32  mx-auto  justify-between px-11 ">
        <FailedRequest
          error="an error occured"
          open={isError}
          close={() => setError(false)}
        />

        <Profile
          user={user}
          handleImage={handleImage}
          memberSince={user && date(user?.createdAt)}
        />
        <div className=" w-1/2   ">
          <h2 className="text-base text-3xl pb-5">My Transaction</h2>

          <div
            ref={ref}
            className=" flex min-h-0 max-h-97  w-full overflow-y-auto flex-col   "
          >
            <Transaction
              transaction={transaction}
              confirmModal={openConfirmModal}
              openDetail={openModalDetail}
            />
          </div>
        </div>
      </div>
    </>
  );
};
function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: any;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const ProfileWithErrorBoundary = withErrorBoundary(UserProfile, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
  },
});
export default ProfileWithErrorBoundary;
