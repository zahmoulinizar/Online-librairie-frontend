import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmCode,
  forgetPassword,
  updatePassword,
} from "../redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

function Forgetpass() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(null);
  const [err, seterr] = useState(false);
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.userUpdated) navigate("/login");
  }, [auth.userUpdated]);
  const sendCode = () => {
    dispatch(forgetPassword({ email }));
    seterr(true);
  };
  const confirmCodeEmail = () => {
    dispatch(confirmCode({ id: auth.userID, code }));
  };
  const resetPassword = () => {
    dispatch(updatePassword({ id: auth.userID, password }));
    console.log(password);
  };
  return (
    <div className="w-100 h-100 d-flex flex-column flex-wrap gap-4  p-4 rounded-8 "
    >
      <p
        className="forget-parg fs-5 w-100  text-center fs-5  "
        style={{ color: "#85144b" }}
      >
        Forget your password
      </p>
      <input
        className="input-forget rounded-5"
        style={{ border: "3px solid #001f3f", color: "#85144b" }}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {err ? (
        <p className="alert alert-secondary forget-err w-100  text-center fs-5  p-1   rounded-3 "
        style={{color: "#85144b" }}
        >{auth.message}</p>
      ) : null}
      {!auth.isSent && (
        <div>
          <button
            onClick={sendCode}
            className="forget-butt w-100  text-center fs-5  p-1 text-uppercase  rounded-3 text-white "
              style={{ backgroundColor: "#001f3f" }}
            type="submit"
          >
            send email
          </button>
        </div>
      )}

      {auth.isSent && !auth.resetPassword && (
        <div>
          <input
            className="input-forget rounded-5"
            style={{ border: "3px solid #001f3f", color: "#85144b" }}
            type="text"
            placeholder="write the code"
            onChange={(e) => setCode(+e.target.value)}
          />
          <button
            className="forget-butt w-100  text-center fs-5  p-1 text-uppercase  rounded-3 text-white "
            style={{ backgroundColor: "#001f3f" }}
            onClick={confirmCodeEmail}
          >
            send code
          </button>
        </div>
      )}
      {auth.resetPassword && (
        <div>
          {" "}
          <input
           className="input-forget rounded-5"
           style={{ border: "3px solid #001f3f", color: "#85144b" }}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="forget-butt w-100 border border-2 text-center fs-5  p-1 text-uppercase text-white"
            style={{ backgroundColor: "#001f3f" }}
            onClick={resetPassword}
          >
            reset your password
          </button>
        </div>
      )}
    </div>
  );
}

export default Forgetpass;
