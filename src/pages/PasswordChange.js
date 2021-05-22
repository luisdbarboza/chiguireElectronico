import React, { useState, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import Page from "../components/Page";
import { SERVER_ADDRESS } from "../utils";
import { AuthContext } from "../context/AuthContext";
import useForm from "../hooks/useForm";

const PasswordChange = () => {
  const { urlToken } = useParams();
  const [{ password, passwordRepeat }, setFormFields] = useForm({
    password: "",
    passwordRepeat: "",
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [hover, setHover] = useState(false);
  const { dispatchUser } = useContext(AuthContext);

  const submitForm = async (e) => {
    e.preventDefault();
    const requestBody = JSON.stringify({ password });
    console.log(requestBody);

    if (password !== passwordRepeat) {
      throw new Error();
    } else {
      try {
        const url = `${SERVER_ADDRESS}/users/changePassword/${urlToken}`;
        const promiseResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });
        const responseData = await promiseResponse.json();

        if (responseData.ok) {
          alert("contrasena cambiada");
          return true;
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  const formFieldsStyles = {
    fontFamily: "Open Sans",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "0.5rem",
  };

  const submitButtonStyles = !hover
    ? {
        border: "none",
        borderRadius: "5px",
        backgroundColor: "olive",
        padding: "0.5rem 1rem",
        width: "max-content",
        margin: "auto",
        color: "white",
        fontFamily: "Oswald",
      }
    : {
        border: "none",
        borderRadius: "5px",
        backgroundColor: "green",
        padding: "0.5rem 1rem",
        width: "max-content",
        margin: "auto",
        color: "white",
        fontFamily: "Oswald",
        cursor: "pointer",
      };

  return success ? (
    <Redirect to="/" />
  ) : (
    <Page name="PasswordChange">
      <form
        onSubmit={(e) =>
          submitForm(e)
            .then(() => {
              setSuccess(true);
              setErrors(false);
              dispatchUser({type: "LOG_OUT"});
            })
            .catch((err) => {
              setErrors(true);
            })
        }
        style={{
          margin: "auto",
          padding: "1rem",
          border: "0px",
          boxShadow: "0px 0px 5px 0px gray",
          borderRadius: "5px",
        }}
      >
        <h2 style={{ fontFamily: "Oswald", textAlign: "center" }}>
          Recupera tu contrasena
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={formFieldsStyles}>
            Password:
            <input
              type="password"
              name="password"
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setFormFields(e)}
            />
          </label>
          <label style={formFieldsStyles}>
            Repite:
            <input
              type="password"
              name="passwordRepeat"
              style={{ width: "100%" }}
              value={passwordRepeat}
              onChange={(e) => setFormFields(e)}
            />
          </label>

          {errors && (
            <div
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "orangered",
                padding: "0.5rem 1rem",
                margin: "auto",
                marginBottom: "0.5rem",
                color: "white",
                fontFamily: "Oswald",
              }}
            >
              Las contrasenas no coinciden
            </div>
          )}

          <button
            style={submitButtonStyles}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Enviar
          </button>
        </div>
      </form>
    </Page>
  );
};

export default PasswordChange;
