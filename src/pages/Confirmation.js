import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Page from "../components/Page";
import { SERVER_ADDRESS } from "../utils";

const Confirmation = () => {
  const { urlToken } = useParams();
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchConfirmation = async () => {
      try {
        const url = `${SERVER_ADDRESS}/users/confirmation/${urlToken}`;
        const promiseResponse = await fetch(url, {
          method: "PUT",
        });
        const responseData = await promiseResponse.json();

        if (responseData.ok) {
          return true;
        }
      } catch (err) {
        throw new Error(err);
      }
    };

    fetchConfirmation()
      .then(() => {
        setConfirmed(true);
      })
      .catch((err) => {
        setErrors(err);
      });
  }, []);

  return (
    <Page name="Confirmation">
      {!confirmed && !errors ? (
        <div>Espera...</div>
      ) : errors ? (
        <div> Se encontraron los siguientes errores {errors} </div>
      ) : confirmed ? (
        <div>
          Has confirmado tu cuenta de correo electronico, puedes volver a la
          pagina principal haciendo click <Link to="/">Aqui</Link>
        </div>
      ) : (
        <div> Seras redirgido a la pagina principal </div>
      )}
    </Page>
  );
};

export default Confirmation;
