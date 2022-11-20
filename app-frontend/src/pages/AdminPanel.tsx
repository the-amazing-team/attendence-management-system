import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AdminContainer from '../components/AdminContainer';
import { Geolocation} from '@capacitor/geolocation';
import { useState, useEffect } from 'react';

const AdminPanel: React.FC = () => {
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
          <IonTitle>Admin Panel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Admin Panel</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AdminContainer />
      </IonContent>
    </IonPage>
  );
};

export default AdminPanel;