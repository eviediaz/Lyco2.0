import React, { useEffect, useState } from "react";
import { Drawer, JoinedClasses, Login, Main } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from "./context/context";
import db from "./lib/firebase";
import 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

<<<<<<< HEAD
import JoinRoom from './pages/JoinRoom'
import Room from './pages/Room';
import SocketWrapper from './components/SocketWrapper';
import Contact from './pages/Contact';

import { Drawer } from './components/index';
import { StyledEngineProvider } from '@mui/material/styles';
=======
>>>>>>> fb1f45e0084f3889cce4420b5060e9160b848a68

function App() {
  const { loggedInMail } = useLocalContext();

<<<<<<< HEAD
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<JoinRoom />}></Route>
=======
  const [createdClasses, setCreatedClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("CreatedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [loggedInMail]);

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("JoinedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
        });

      return () => unsubscribe();
    }
  }, [loggedInMail]);
  return (
    <Router>
      <Switch>
        {createdClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        {joinedClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        <IsUserRedirect
          user={loggedInMail}
          loggedInPath="/"
          path="/signin"
          exact
        >
          <Login />
        </IsUserRedirect>

        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer />
          <ol className="joined">
            {createdClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}

            {joinedClasses.map((item) => (
              <JoinedClasses classData={item} />
            ))}
          </ol>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
/*
        

<BrowserRouter>
                <Switch>
                    <Route path="/" element={<Index />}></Route>
>>>>>>> fb1f45e0084f3889cce4420b5060e9160b848a68
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/room" element={<JoinRoom />}></Route>
                    <Route path="/room/:roomId" element={ <SocketWrapper> <Room/> </SocketWrapper> }></Route>
                </Switch>
            </BrowserRouter>
*/