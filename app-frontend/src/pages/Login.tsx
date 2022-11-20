import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginContainer from '../components/LoginContainer';
import './Home.css';
import { Geolocation} from '@capacitor/geolocation';
import { useState, useEffect } from 'react';

const Login: React.FC = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    const getLocation = async () => {
      const position = await Geolocation.getCurrentPosition();
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      setLongitude(long);
      setLatitude(lat);
    }
    getLocation();
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{latitude}</IonTitle>
          <div className="links" slot="end">
            <a className="link">Admin?</a>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{longitude}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LoginContainer />
      </IonContent>
    </IonPage>
  );
};

export default Login;