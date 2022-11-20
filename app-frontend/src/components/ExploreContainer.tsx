import './ExploreContainer.css';
import { IonList, IonThumbnail, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonSegment, IonSegmentButton, IonItem } from '@ionic/react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <div className="student-page">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>John Deo</IonCardTitle>
            <IonCardSubtitle>CITX12342UXXX</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonSegment value="default">
              <IonSegmentButton value="default">
              <IonLabel>Mark Present</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="segment">
              <IonLabel>Register for Outing</IonLabel>
            </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        <IonLabel className="subheader">Present Matrix</IonLabel>

        <IonCard className="present-matrix">
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
            <IonCardSubtitle></IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>

          </IonCardContent>
        </IonCard>

        <IonLabel className="subheader">Outing List</IonLabel>

        <IonCard className="present-matrix">

          <IonCardContent>
            <IonList id="people-list">
              <IonItem>
                <IonLabel>John Doe</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Micheal Doe</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Sam Doe</IonLabel>
              </IonItem>

            </IonList>
          </IonCardContent>
        </IonCard>        
      </div>
    </div>
  );
};

export default ExploreContainer;
