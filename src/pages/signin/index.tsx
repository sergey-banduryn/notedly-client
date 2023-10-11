import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
// import "./index.css";
import { isLoggedInVar } from "../../App";

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export default function SignIn() {
  const [values, setValues] = useState({});
  let navigate = useNavigate();
  const location = useLocation();

  const [signIn, { data, loading, error, client }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      // console.log(data.signUp)
      client.resetStore();
      localStorage.setItem("notedlyToken", data.signIn);
      isLoggedInVar(true);

      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath);
    },
  });

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(values)
          signIn({
            variables: { ...values },
          });
        }}
      >
        <label htmlFor="email">Email:</label>
        <input required type="email" name="email" onChange={onChange} />

        <label htmlFor="password">Password:</label>
        <input required type="password" name="password" onChange={onChange} />
        <button type="submit"> Submit</button>
      </form>
    </>
  );
}
