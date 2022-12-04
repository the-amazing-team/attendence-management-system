import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
  IonInput,
} from "@ionic/react";
import { useState } from "react";
import "../style/global.css";
import axios from "../axios";
// import useStorage from "../../../app-frontend/hooks";
import useStorage from "../hooks/useStorage";

async function getSessionID(usnID: string, password: string) {
  const response = await axios.get("/login?usnID=" + usnID + "&password=" + password);
  return response.data.sessionID;
}

async function getUsnIDFromSessionID(sessionID: string) {
  const response = await axios.get("/get_usn_id_from_session_id?sessionID=" + sessionID);
  return response.data.usnID;
}

async function getStoredSessionID

const Login: React.FC = () => {
  const [USNNumber, setUSNNumber] = useState("");
  const [password, setPassword] = useState("");

  const store = useStorage();

  const loginHandler = async () => {
    // const sessionID = await getSessionID(USNNumber, password);
    // const usnID = await getUsnIDFromSessionID(sessionID);
    // console.log(usnID);
    // console.log(response.data);

    // await store?.set("sessionID", 1123);
    const sessionID = await store?.get("sessionID");
    console.log(sessionID);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CIT</IonTitle>
          <div className="links" slot="end">
            <a className="link">Admin?</a>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <div className="form">
            <IonLabel className="header">Login Portal</IonLabel>
            <IonCard>
              <IonCardContent>
                <IonItem>
                  <IonInput
                    placeholder="USN Number"
                    value={USNNumber}
                    onIonChange={(e: any) => setUSNNumber(e.target.value)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onIonChange={(e: any) => setPassword(e.target.value)}
                  ></IonInput>
                </IonItem>
                <IonButton expand="block" onClick={loginHandler}>Login</IonButton>
              </IonCardContent>
            </IonCard>
            <div className="links">
              <a className="link">Contact Us</a>
              <a className="link">Forgot My Password?</a>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
