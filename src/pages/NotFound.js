import React from 'react';
import Page from "../components/Page";

const NotFound = () => {
    return (
        <Page>
            <h2>Lo sentimos!</h2>
            <h3>
                La pagina que buscas no existe
            </h3>
            <p>Quizas hayas escrito mal la direccion</p>
        </Page>
    );
}
 
export default NotFound;