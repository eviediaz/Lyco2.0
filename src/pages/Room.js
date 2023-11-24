import { useEffect, useState } from "react";

import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { generateColor } from "../utils";
import "./Room.css";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { sql } from "@codemirror/lang-sql";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { xml } from "@codemirror/lang-xml";
import { php } from "@codemirror/lang-php";

import { githubDark } from "@uiw/codemirror-theme-github";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";


export const getLangs = (name) => {
  const langs = {
    javascript,
    jsx: () => javascript({ jsx: true }),
    typescript: () => javascript({ typescript: true }),
    tsx: () => javascript({ jsx: true, typescript: true }),
    html,
    css,
    json,
    sql,
    python,
    java,
    cpp,
    xml,
    php
  };
  return langs[name];
};
const languagesAvailable = [
  "javascript",
  "jsx",
  "typescript",
  "tsx",
  "html",
  "css",
  "json",
  "sql",
  "python",
  "java",
  "cpp",
  "xml",
  "php"
];

export const getTemas = (name) => {
  const temas = {
    githubDark,
    abcdef,
    dracula,
    darcula,
    eclipse,
    tokyoNight,
    vscodeDark
  };
  return temas[name];
};
const temasAvailable = [
  "githubDark",
  "abcdef",
  "dracula",
  "darcula",
  "eclipse",
  "tokyoNight",
  "vscodeDark",
];

export default function Room({ socket }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [fetchedUsers, setFetchedUsers] = useState(() => []);
  const [fetchedCode, setFetchedCode] = useState(() => "");
  const [language, setLanguage] = useState(getLangs("javascript"));
  const [tema, setTema] = useState(getTemas("githubDark"));

  const [ventanas, setVentanas] = useState({
    primero: "",
  });

  // Función para agregar o editar un elemento en el diccionario de ventanas
  const agregarEditarVentana = (clave, valor) => {
    setVentanas((prevDiccionario) => ({
      ...prevDiccionario,
      [clave]: valor,
    }));
  };

  function onChange(newValue) {
    setFetchedCode(newValue);
    socket.emit("update code", { roomId, code: newValue });
    socket.emit("syncing the code", { roomId: roomId });
  }

  function handleLanguageChange(e) {
    setLanguage(getLangs(e.target.value));
    socket.emit("update language", { roomId, languageUsed: e.target.value });
    socket.emit("syncing the language", { roomId: roomId });
  }

  function handleTemaChange(e) {
    setTema(getTemas(e.target.value));
  }

  function handleLeave() {
    socket.disconnect();
    !socket.connected && navigate("/", { replace: true, state: {} });
  }

  function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text);
      toast.success("Room ID copied");
    } catch (exp) {
      console.error(exp);
    }
  }

  useEffect(() => {
    socket.on("updating client list", ({ userslist }) => {
      setFetchedUsers(userslist);
    });

    socket.on("on language change", ({ languageUsed }) => {
      setLanguage(languageUsed);
    });

    socket.on("on code change", ({ code }) => {
      setFetchedCode(code);
    });

    socket.on("new member joined", ({ username }) => {
      toast(`${username} joined`);
    });

    socket.on("member left", ({ username }) => {
      toast(`${username} left`);
    });

    const backButtonEventListner = window.addEventListener(
      "popstate",
      function (e) {
        const eventStateObj = e.state;
        if (!("usr" in eventStateObj) || !("username" in eventStateObj.usr)) {
          socket.disconnect();
        }
      }
    );

    return () => {
      window.removeEventListener("popstate", backButtonEventListner);
    };
  }, [socket]);

  return (
    <div className="room">
      <div className="roomSidebar">
        <div className="roomSidebarUsersWrapper">
          <div className="languageFieldWrapper">
            <select
              className="languageField"
              name="language"
              id="language"
              value={language.name}
              onChange={handleLanguageChange}
            >
              {languagesAvailable.map((eachLanguage) => (
                <option key={eachLanguage} value={eachLanguage}>
                  {eachLanguage}
                </option>
              ))}
            </select>
          </div>

          <div className="languageFieldWrapper">
            <select
              className="languageField"
              name="codeKeybinding"
              id="codeKeybinding"
              value={tema.name}
              onChange={handleTemaChange}
            >
              {temasAvailable.map((eachTema) => (
                <option key={eachTema} value={eachTema}>
                  {eachTema}
                </option>
              ))}
            </select>
          </div>

          <p>Usuarios conectados:</p>
          <div className="roomSidebarUsers">
            {fetchedUsers.map((each) => (
              <div key={each} className="roomSidebarUsersEach">
                <div
                  className="roomSidebarUsersEachAvatar"
                  style={{ backgroundColor: `${generateColor(each)}` }}
                >
                  {each.slice(0, 2).toUpperCase()}
                </div>
                <div className="roomSidebarUsersEachName">{each}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="roomSidebarCopyBtn"
          onClick={() => {
            copyToClipboard(roomId);
          }}
        >
          Copiar Id de Sesion
        </button>
        <button
          className="roomSidebarBtn"
          onClick={() => {
            handleLeave();
          }}
        >
          Salir
        </button>
      </div>

      <div className="codeMirrorWrapper">
        <CodeMirror
          value={fetchedCode}
          // @ts-ignore

          theme={tema}
          extensions={language}
          editable={true}
          autoFocus={true}
          placeholder="Aca escribe tu codigo"
          onChange={onChange}
          style={{
            maxWidth: "995px",
            position: "relative",
            zIndex: 999,
          }}
        />
      </div>

      <Toaster />
    </div>
  );
}
