import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import Home from './pages/Home';

import JoinRoom from './pages/JoinRoom'
import Room from './pages/Room';
import SocketWrapper from './components/SocketWrapper';

import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88'
                            }
                        }
                    }} >
                </Toaster>
            </div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<JoinRoom />}></Route>
                    <Route path="/room/:roomId" element={ <SocketWrapper> <Room/> </SocketWrapper> }></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;