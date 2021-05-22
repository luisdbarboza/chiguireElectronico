import React, { useRef, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { SERVER_ADDRESS } from "../utils";

const Form = React.memo(({ setShowModal }) => {
  const storedUserData = JSON.parse(localStorage.getItem("usuario"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [showPasswordChangeNotification, setShowPasswordChangeNotification] =
    useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] =
    useState(false);
  const { dispatchUser } = useContext(AuthContext);

  const [formFields, setFormFields] = useForm({
    email: storedUserData.email,
    username: storedUserData.username,
    profilePicture: useRef(null),
  });

  const submitForm = async (e, formFields) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", formFields.email);
    formData.append("username", formFields.username);

    if (formFields.profilePicture.current.files[0]) {
      formData.append(
        "profilePicture",
        formFields.profilePicture.current.files[0]
      );
    }

    const promiseResponse = await fetch(
      `${SERVER_ADDRESS}/users/${storedUserData._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          token: token,
        },
        body: formData,
      }
    );

    const responseData = await promiseResponse.json();

    if (responseData.ok) {
      dispatchUser({ type: "LOG_IN", user: responseData.user, token });
      alert("Datos actualizados!!!");
    }
  };

  const requestPasswordChange = async () => {
    try {
      const promiseResponse = await fetch(
        `${SERVER_ADDRESS}/users/changePassword`,
        {
          method: "GET",
          headers: {
            token: token,
          },
        }
      );

      const responseData = await promiseResponse.json();

      if (responseData.ok) {
        return setPasswordChangeMessage(responseData.message);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (showPasswordChangeNotification) {
      requestPasswordChange()
        .then(() => {
          console.log("Revisa tu mail");
        })
        .catch((err) => {
          console.log("F ERROR", err);
        });
    } else {
      setPasswordChangeMessage("");
    }
  }, [showPasswordChangeNotification]);

  return (
    <form
      className="user-config"
      encType="multipart/form-data"
      onSubmit={(e) => submitForm(e, formFields)}
    >
      <div className="title-section">
        <span>Configuracion</span>
        <div className="close-button" onClick={() => setShowModal("")}>
          X
        </div>
      </div>
      <hr />
      <div className="password-section">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowPasswordChangeNotification(!showPasswordChangeNotification);
          }}
        >
          Cambiar Contrasena
        </button>
        <span>Te enviaremos un enlace por email para cambiarla</span>
      </div>
      {(showPasswordChangeNotification && passwordChangeMessage.length > 0) && (
        <div className="password-change-notification">
          {passwordChangeMessage}
        </div>
      )}
      <div className="email-section">
        <label>
          Tu correo electronico
          <input
            type="text"
            name="email"
            value={formFields.email}
            onChange={(e) => setFormFields(e)}
            alt="email box"
          />
        </label>
      </div>
      <div className="nickname-section">
        <label>
          Tu nombre
          <input
            type="text"
            name="username"
            value={formFields.username}
            onChange={(e) => setFormFields(e)}
            alt="nickname box"
          />
        </label>
      </div>
      <div className="profile-pic-section">
        <figure className="pic-wrapper">
          <img
            loading="lazy"
            src={`${storedUserData.profilePicture}`}
            className="user-pic"
            alt="profile"
          />
        </figure>
        <div>
          <label htmlFor="profilePictureInput">
            <span>Cambiar avatar</span>
            <input
              type="file"
              id="profilePictureInput"
              ref={formFields.profilePicture}
              hidden
            />
          </label>
          <span>Puedes usar JPG, GIF o PNG</span>
        </div>
      </div>
      <input type="submit" value="Guardar cambios" />
    </form>
  );
});

const UserConfigPanel = ({ showModal, setShowModal }) => {
  return ReactDOM.createPortal(
    <>
      <div
        className={
          showModal === "user-config-panel"
            ? "user-config-page-wrapper active"
            : "user-config-page-wrapper"
        }
      >
        <Form setShowModal={setShowModal} />
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default UserConfigPanel;
