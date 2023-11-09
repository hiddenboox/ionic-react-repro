import {
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonDatetime,
  IonButton,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { setupIonicReact } from "@ionic/react";
import { Route, useParams } from "react-router-dom";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact();

const queryClient = new QueryClient();

const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "Content 1",
  },
  {
    id: 2,
    title: "Post 2",
    content: "Content 2",
  },
  {
    id: 3,
    title: "Post 3",
    content: "Content 3",
  },
  {
    id: 4,
    title: "Post 4",
    content: "Content 4",
  },
];

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/post/1">
            <IonLabel>Post 1</IonLabel>
          </IonItem>
          <IonItem routerLink="/post/2">
            <IonLabel>Post 2</IonLabel>
          </IonItem>
        </IonList>
        <IonDatetime></IonDatetime>
        <IonButton fill="clear">Start</IonButton>
      </IonContent>
    </IonPage>
  );
};

const Post = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(posts.find((post) => post.id === Number(postId)));
        }, 200);
      }),
  });

  console.log(data);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UserProfile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink={`/post/${Number(postId) + 1}`}>
            <IonLabel>Post {Number(postId) + 1}</IonLabel>
          </IonItem>
        </IonList>
        {data ? (
          <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
          </div>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" exact component={Home} />
            <Route path="/post/:postId" exact component={Post} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
}

export default App;
