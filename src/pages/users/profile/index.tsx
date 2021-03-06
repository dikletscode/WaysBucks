import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HistoryTransaction } from "../../../types/transaction";
import Profile from "./Profile";
import AuthContext from "../../../context/context";
import { FailedRequest, DetailTransaction, Confirmation } from "../../../modal";
import Transaction from "./Transaction";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";
import { API } from "../../../config/axios";
import { ErrorFallback } from "../../../components";

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
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<ProfileType | null>(null);
  const [isError, setError] = useState(false);
  const [input, setInput] = useState(user?.profile.fullname || "");
  const [openDetail, setOpenDetail] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [id, setId] = useState(0);
  const [idTransac, setIdTranasac] = useState(0);
  const fetchTransaction = async () => {
    try {
      let res = await API.get("orders");
      const data = res.data;
      data && setTransaction(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [openConfirm]);

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
        await API.patch("user", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        let copyState = state.data;
        if (copyState) {
          copyState["profile"]["image"] =
            e.target.files && URL.createObjectURL(e.target.files[0]);
          dispatch({ type: "BUYYER", payload: copyState });
        }
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
      <div className="container flex pt-32  mx-auto  justify-between flex-wrap px:3 lg:px-11 ">
        <FailedRequest
          error="File Rejected"
          open={isError}
          close={() => setError(false)}
        />

        <Profile user={state.data} handleImage={handleImage} />
        <div className="w-full lg:w-1/2   ">
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

const ProfileWithErrorBoundary = withErrorBoundary(UserProfile, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
  },
});
export default ProfileWithErrorBoundary;
