import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
// import "./index.css";
import { isLoggedInVar } from "../../App";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

export default function SignUp() {
  const [values, setValues] = useState({});
  let navigate = useNavigate();

  const [signUp, { data, loading, error, client }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      // console.log(data.signUp)
      client.resetStore();
      localStorage.setItem("notedlyToken", data.signUp);
      isLoggedInVar(true);
      navigate("/");
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
          signUp({
            variables: { ...values },
          });
        }}
      >
        <label htmlFor="username">Username:</label>
        <input required type="text" name="username" onChange={onChange} />

        <label htmlFor="email">Email:</label>
        <input required type="email" name="email" onChange={onChange} />

        <label htmlFor="password">Password:</label>
        <input required type="password" name="password" onChange={onChange} />
        <button type="submit"> Submit</button>
      </form>
    </>
  );
}
