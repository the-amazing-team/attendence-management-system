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

const Login: React.FC = () => {
  const [USNNumber, setUSNNumber] = useState("");
  const [password, setPassword] = useState("");

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
                    onChange={(e: any) => setUSNNumber(e.target.value)}
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
                <IonButton expand="block">Login</IonButton>
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
