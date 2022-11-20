import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Geolocation} from '@capacitor/geolocation';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
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
            <a className="link">Log Out</a>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{longitude}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
