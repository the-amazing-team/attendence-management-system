import './LoginContainer.css';
import { IonButton, IonCard, IonCardContent, IonLabel, IonItem, IonInput } from '@ionic/react';

const ExploreContainer: React.FC = () => {
  return (
    <div className="container">
      <div className="form">
        <IonLabel className="header">Login Portal</IonLabel>

        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonInput placeholder="Username"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput type="password" placeholder="Password"></IonInput>
            </IonItem>

            <IonButton expand='block'>Login</IonButton>
          </IonCardContent>
        </IonCard>

        <div className="links">
          <a className="link">Contact Us</a>
          <a className="link">Forgot My Password?</a>
        </div>
      </div>
    </div>
  );
};

export default ExploreContainer;
