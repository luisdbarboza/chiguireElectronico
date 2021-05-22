import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/es-mx";
import { AuthContext } from "../context/AuthContext";
import { SidebarContext } from "../context/SidebarContext";
import UserConfigPanel from "../components/UserConfigPanel";
import useForm from "../hooks/useForm";
import { SERVER_ADDRESS } from "../utils";

/************* COMPONENTES DE FORMULARIO REGISTRO DE USUARIO ****************************/
const isEmpty = (field) => field.length === 0;

const isNicknameValid = (nickname) => {
  let regex = /^[a-z]+[a-z0-9]{2,}/;

  return regex.test(nickname);
};

const handleSubmitSignUp = async (
  e,
  email,
  password,
  passwordRepeat,
  username,
  setErrors,
  setSignedUp
) => {
  e.preventDefault();
  let errors = [];

  if (
    isEmpty(email) ||
    isEmpty(password) ||
    isEmpty(passwordRepeat) ||
    isEmpty(username)
  ) {
    errors.push("Campos vacios");
  }

  if (password !== passwordRepeat) {
    errors.push("Las contrasenas no coinciden");
  }

  if (!isNicknameValid(username)) {
    errors.push("Nombre de usuario no valido");
  }

  if (errors) {
    setErrors(errors);
  }

  try {
    let promiseResults = await fetch(`${SERVER_ADDRESS}/users`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let data = await promiseResults.json();

    if (data.ok) {
      setSignedUp(true);
    } else {
      throw Error(data.err.message);
    }
  } catch (err) {
    setErrors([err.message]);
  }
};

const SignUpForm = () => {
  const { dispatchSidebar } = useContext(SidebarContext);
  const [errors, setErrors] = useState([]);
  const [signedUp, setSignedUp] = useState(false);
  const [{ email, password, passwordRepeat, username }, setValues] = useForm({
    email: "",
    password: "",
    passwordRepeat: "",
    username: "",
  });

  if (!signedUp) {
    return (
      <form
        className="sign-up-form"
        onSubmit={(e) =>
          handleSubmitSignUp(
            e,
            email,
            password,
            passwordRepeat,
            username,
            setErrors,
            setSignedUp
          )
        }
      >
        <p>Registrate para poder guardar y comentar articulos</p>

        {errors.length > 0 && (
          <div className="form-errors">
            Se encontraron los siguientes errores:
            <ul>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="input-field">
          <label htmlFor="email">Correo Electronico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={setValues}
            autoComplete="false"
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={setValues}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password-repeat">Repetir Password:</label>
          <input
            type="password"
            id="password-repeat"
            name="passwordRepeat"
            value={passwordRepeat}
            onChange={setValues}
          />
        </div>

        <div className="input-field">
          <label htmlFor="nickname">Nombre de usuario:</label>
          <input
            type="text"
            id="nickname"
            name="username"
            value={username}
            onChange={setValues}
          />
          <p>
            Se usa para la dirección de tu página de usuario, piénsalo bien
            porque no podrás cambiarlo. Mínimo 3 caracteres, se pueden usar
            números (pero no como carácter inicial), pero no mayúsculas,
            espacios, tildes o caracteres especiales.
          </p>
        </div>

        <button className="submit-form-btn">REGÍSTRATE</button>
      </form>
    );
  } else {
    return (
      <>
        <div className="registered-div">
          <div className="message">
            Te hemos enviado un mensaje a tu correo electronico con un link para
            que confirmes tu direccion de correo electronico
          </div>

          <button
            onClick={() =>
              dispatchSidebar({ type: "CHANGE_MODE", mode: "normal" })
            }
          >
            Aceptar
          </button>
        </div>
      </>
    );
  }
};

/************* COMPONENTES Y FUNCIONES DE FORMULARIO INICIO DE SESION ****************************/
const handleSubmitSignIn = async (
  e,
  email,
  password,
  dispatchUser,
  dispatchSidebar,
  setErrors,
  setMode
) => {
  e.preventDefault();

  try {
    let promiseResponse = await fetch(`${SERVER_ADDRESS}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let { ok, user, token, message } = await promiseResponse.json();

    if (isEmpty(email) || isEmpty(password)) throw Error("Campos vacios");

    if (!ok) {
      throw Error(message);
    }

    dispatchUser({ type: "LOG_IN", user, token });
    dispatchSidebar({ type: "CHANGE_MODE", mode: "normal" });
  } catch (err) {
    setErrors(err.message);
  }
};

//old props setMode={setMode}
const SignInForm = () => {
  const { dispatchUser } = useContext(AuthContext);
  const { dispatchSidebar } = useContext(SidebarContext);
  const [errors, setErrors] = useState(null);
  const [{ email, password }, setValues] = useForm({
    email: "",
    password: "",
  });

  return (
    <form
      className="sign-in-form"
      onSubmit={(e) =>
        handleSubmitSignIn(
          e,
          email,
          password,
          dispatchUser,
          dispatchSidebar,
          setErrors
        )
      }
    >
      <p>Entra o registrate para poder guardar y comentar articulos</p>

      {errors && (
        <div className="form-errors">
          Se encontraron los siguientes errores: {errors}
        </div>
      )}

      <div className="input-field">
        <label htmlFor="email">Correo Electronico:</label>
        <input type="email" name="email" value={email} onChange={setValues} />
      </div>

      <div className="input-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={setValues}
        />
      </div>

      <button className="submit-form-btn">ENTRAR</button>
    </form>
  );
};

/************* COMPONENTES Y FUNCIONES DE MODO NORMAL ****************************/
//old props setMode, setShowSidebar
const SearchResult = React.memo(({ result }) => {
  const history = useHistory();
  const { dispatchSidebar } = useContext(SidebarContext);
  const token = JSON.parse(localStorage.getItem("token"));

  moment.locale("es-mx");

  return (
    <div
      className="search-result"
      onClick={() => {
        history.push(`/posts/${result._id}`);
        dispatchSidebar({ type: "SHOW_HIDE", close: true });
      }}
    >
      <div className="post-title">{result.title}</div>
      <div className="post-pic">
        <img
          loading="lazy"
          src={`${result.referentialImage}`}
          alt="post thumbnail"
        />
      </div>
      <div className="publication-date">
        {moment(result.createdAt).fromNow()}
      </div>
      <div className="content">{result.description}</div>
    </div>
  );
});

//old props setMode, setShowSidebar
const SearchView = ({ searchBox, setSearchBox }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const url = `${SERVER_ADDRESS}/posts/search/${searchBox}`;
      const promiseResponse = await fetch(url);
      const responseData = await promiseResponse.json();

      if (responseData.ok) {
        console.log(responseData.posts);
        setSearchResults(responseData.posts);
      }
    };

    fetchSearchResults();
  }, [searchBox]);

  return (
    <div className="search-results">
      <button className="close-search-button" onClick={() => setSearchBox("")}>
        X
      </button>
      <h3>{searchResults.length} RESULTADOS</h3>
      {searchResults.map((result, index) => (
        <SearchResult key={index} result={result} />
      ))}
    </div>
  );
};

const NormalView = () => {
  return (
    <>
      <UserSection />
      <DrawerLinks />
    </>
  );
};

const UserSection = () => {
  const [showModal, setShowModal] = useState("");
  const { user, dispatchUser } = useContext(AuthContext);
  const { dispatchSidebar } = useContext(SidebarContext);
  const { loggedIn, username, profilePicture } = user;
  const token = JSON.parse(localStorage.getItem("token"));

  const defaultView = (
    <div className="user-drawer-section">
      <div className="user-pic-div">
        <div className="pic-wrapper">
          <img
            loading="lazy"
            src="/images/icons/man.png"
            className="user-pic"
            alt="profile"
          />
        </div>
      </div>
      <div className="user-access-options">
        <p>
          <span
            onClick={() =>
              dispatchSidebar({ type: "CHANGE_MODE", mode: "signin" })
            }
          >
            Accede
          </span>{" "}
          o{" "}
          <span
            onClick={() =>
              dispatchSidebar({ type: "CHANGE_MODE", mode: "signup" })
            }
          >
            Registrate
          </span>
        </p>
      </div>
    </div>
  );

  const loggedInView = (
    <div className="user-drawer-section logged-in">
      <div className="user-pic-div">
        <div className="pic-wrapper">
          <img
            loading="lazy"
            src={
              profilePicture
                ? `${profilePicture}`
                : "/images/icons/man.png"
            }
            className="user-pic"
            alt="profile"
          />
        </div>
      </div>
      <span className="nickname">{username}</span>
      <div className="logged-user-options">
        {/* <button onClick={() => setShowModal("comments-history")}>
          Ver tus comentarios
        </button> */}
        <button onClick={() => setShowModal("user-config-panel")}>
          Configuracion
        </button>
        <button onClick={() => dispatchUser({ type: "LOG_OUT" })}>Salir</button>
      </div>

      {showModal === "user-config-panel" && (
        <UserConfigPanel setShowModal={setShowModal} showModal={showModal} />
      )}
    </div>
  );

  return <>{loggedIn ? loggedInView : defaultView}</>;
};

const SearchBar = ({ searchBox, setSearchBox }) => {
  return (
    <form className="search-bar-div">
      <input
        type="text"
        placeholder="Busca algo..."
        name="searchBox"
        value={searchBox}
        onChange={(e) => setSearchBox(e.target.value)}
      />
      <button>
        <img
          loading="lazy"
          src="/images/icons/search-white-18dp.svg"
          alt="buscar"
        />
      </button>
    </form>
  );
};

const DrawerLinks = React.memo(() => {
  const { dispatchSidebar } = useContext(SidebarContext);
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${SERVER_ADDRESS}/categories?limit=8&onlyField=name`;
      const promiseResponse = await fetch(url);
      const responseData = await promiseResponse.json();

      if (responseData.ok) {
        setCategories(responseData.categories);
      }
    };

    fetchCategories();
  }, []);

  const goTo = useCallback(
    (category, index) => (
      <li
        key={index}
        onClick={() => {
          dispatchSidebar({ type: "SHOW_HIDE", close: true });
          history.push(`/category/${category._id}`);
        }}
      >
        {category.name}
      </li>
    ),
    [history]
  );

  const col1Links = useMemo(() => {
    return categories
      .slice(0, 4)
      .map((category, index) => goTo(category, index));
  }, [categories]);
  const col2Links = useMemo(() => {
    return categories.slice(4).map((category, index) => goTo(category, index));
  }, [categories]);

  return (
    <ul className="sidebar-sections">
      <div className="col">
        {col1Links}
        <button>Ver mas temas</button>
      </div>
      <div className="col">{col2Links}</div>
    </ul>
  );
});

const NormalMode = () => {
  const [searchBox, setSearchBox] = useState("");

  return (
    <>
      <SearchBar searchBox={searchBox} setSearchBox={setSearchBox} />
      {searchBox === "" ? (
        <NormalView />
      ) : (
        <SearchView searchBox={searchBox} setSearchBox={setSearchBox} />
      )}
    </>
  );
};

const CloseDrawer = React.memo(({ dispatchSidebar }) => {
  return (
    <div className="close-drawer">
      <button
        className="close-drawer-button"
        onClick={() => {
          dispatchSidebar({ type: "SHOW_HIDE" });
          dispatchSidebar({ type: "CHANGE_MODE", mode: "normal" });
        }}
      >
        X
      </button>
    </div>
  );
});

const Drawer = () => {
  const { sidebar, dispatchSidebar } = useContext(SidebarContext);
  const { show, mode } = sidebar;

  return ReactDOM.createPortal(
    <>
      <div className={show ? "drawer active" : "drawer"}>
        <CloseDrawer dispatchSidebar={dispatchSidebar} />

        {mode === "normal" ? (
          <NormalMode />
        ) : mode === "signup" ? (
          <SignUpForm />
        ) : (
          <SignInForm />
        )}
      </div>

      {/* CONTENEDOR GRIS DEL FONDO*/}
      <div
        className={show ? "page-wrapper active" : "page-wrapper"}
        onClick={() => dispatchSidebar({ type: "SHOW_HIDE" })}
      ></div>
    </>,
    document.getElementById("drawer")
  );
};

export default Drawer;
