import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../actions/Actions';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditorPage() {

    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [ clients, setClients ] = useState([]);


    const languagesAvailable = ["javascript", "java", "c_cpp", "python", "typescript", "golang", "yaml", "html"]
    const [language, setLanguage] = useState(() => "javascript");
    function handleLanguageChange(e) {
        setLanguage(e.target.value)
        socketRef.emit("update language", { roomId, languageUsed: e.target.value })
        socketRef.emit("syncing the language", { roomId: roomId })
    }

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('problema con los sockets', e);
                toast.error('Error de conexión por sockets, por favor intenta de nuevo luego.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} ingresó a la sesión.`);
                        console.log(`${username} se unió`);
                    }

                    // Update the clients list with a unique list of clients using socketId
                    const uniqueClients = clients.filter(
                        (client, index, self) =>
                            index === self.findIndex(c => c.username === client.username)
                    );

                    setClients(uniqueClients);
                    // for syncing the code from the start
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                });

            // listening for disconnected
            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                if (username) {
                    toast.success(`${username} salió de la sesión`);
                    setClients((prevClients) => {
                        return prevClients.filter(client => client.socketId !== socketId);
                    });
                }
            });

            socketRef.current.on("on language change", ({ languageUsed }) => {
                setLanguage(languageUsed)
            })
        };

        init();

        // listener cleaning function
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
                socketRef.current.off("on language change");
            }
        }
    }, [ location.state?.username, reactNavigator, roomId ]);

    // copy the room id to clipboard
    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('ID de Aula copiado al portapapeles');
        } catch (error) {
            toast.error('Error al copiar al portapapeles');
        }
    }

    // leave the room
    function leaveRoom() {
        socketRef.current.emit(ACTIONS.LEAVE_ROOM, {
            roomId,
            username: location.state.username,
        });
        reactNavigator('/');
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    if (!location.state) {
        return <Navigate to="/" />
    }

    return (
        <>
        <div className="languageFieldWrapper">
            <select className="languageField" name="language" id="language" value={language} onChange={handleLanguageChange}>
              {languagesAvailable.map(eachLanguage => (
                <option key={eachLanguage} value={eachLanguage}>{eachLanguage}</option>
              ))}
            </select>
          </div>
        <div className="mainWrap">
            <div className="editorWrap">
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => { codeRef.current = code }}
                />
            </div>
            <div className="aside">
                
                <div className="asideInner">
                    <div className="logo">
                        <img className="logoImage" src="/logo.png" alt="logo" />
                    </div>

                    <h3>Conectados</h3>

                    <div className="clientsList">
                        {
                            clients.map((client) => (
                                <Client key={client.socketId} username={client.username} />
                            ))
                        }
                    </div>
                </div>


                <button className="btn copyBtn" onClick={copyRoomId} >Copiar ID de Sesion</button>
                <button className="btn leaveBtn" onClick={leaveRoom} >Salir</button>
            </div>


            
        </div>
        </>
    )
}

export default EditorPage;