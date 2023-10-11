import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home";
import NotePage from "./pages/notePage";
import Layout from "./pages/layout";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  makeVar,
  useReactiveVar,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
// import { setContext } from "apollo-link-context";
import MyNotes from "./pages/myNotes";
import Favorites from "./pages/favorites";
import NewNote from "./pages/newNote";
import EditNote from "./pages/editNote";

export const isLoggedInVar = makeVar(!!localStorage.getItem("notedlyToken"));

let uri_vite;
if (import.meta.env.DEV) uri_vite = import.meta.env.VITE_API_URI_DEV;
else uri_vite = import.meta.env.VITE_API_URI_PROD;

// let uri_vite;
// if (import.meta.env.DEV) uri_vite = "http://localhost:4000";
// else uri_vite = "https://notedlyserver-sergeyb89.b4a.run";

const uri = uri_vite;

// const httpLink = createHttpLink({ uri });

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem("notedlyToken") || "",
//     },
//   };
// });

const httpLink = new HttpLink({ uri });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("notedlyToken") || null,
    },
  }));

  return forward(operation);
});

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      merge: true,
    },
  },
});

// link: authLink.concat(httpLink),

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
  resolvers: {},
  // connectToDevTools: true
});

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "signup",
//         element: <SignUp />,
//       },
//       {
//         path: "signin",
//         element: <SignIn />,
//       },
//       {
//         path: "mynotes",
//         element: <MyNotes />,
//       },
//       { path: "favorites", element: <Favorites /> },
//       // {
//       //   path: "note/:id",
//       //   element: <NotePage />,
//       // },
//       // {
//     ],
//   },
// ]);

function ProtectedRoute() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const location = useLocation();

  if (isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to="signin" replace state={{ from: location }} />;
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      {/*<BrowserRouter basename={import.meta.env.DEV ? "/" : "/notedly-client/"}>*/}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="note/:id" element={<NotePage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="new" element={<NewNote />} />
              <Route path="edit/:id" element={<EditNote />} />
              <Route path="mynotes" element={<MyNotes />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
      {/*</BrowserRouter>*/}
    </ApolloProvider>
  );
}

// 1
// предупреждения в консоли при удалении заметок
// по поводу refetchQueries: [GET_NOTES, GET_MY_NOTES],
// refetchQueries работает только для активных запросов
// (везде, во всех функциях client или mutation, проверено)

// 2
// Ответ на мутацию обновляет данные в кеше
// наприм. TOGGLE_FAVORITE обновляет favoriteCount

// Если кэшированный объект с этим ключом уже существует,
// Apollo Client перезаписывает любые существующие поля ,
// которые также включены в ответ на мутацию
// (другие существующие поля сохраняются).

// 3
// При удалении кеша, активные запросы загружаются заново сразу

// Любые изменения, которые вы вносите в кэшированные данные внутри update функции,
// автоматически передаются запросам, которые прослушивают изменения этих данных.
// Следовательно, пользовательский интерфейс вашего приложения обновится,
// чтобы отразить эти обновленные кэшированные значения.

// Эти изменения кэша передаются всем затронутым активным запросам,
// что автоматически обновляет ваш пользовательский интерфейс.

// 4
// Правильно  написан код, интерфейс пользователя более интерактивный
// в FavoriteNote используется локальное состояние [count, setCount]
// а не ждем ответа от мутации, чтобы отобразить результат
// (в интерфейсе задержка меньше)

// {"author": ObjectId("64aadccd4b93f7ad44ca6029")}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// дополнительно можно изучить
// тестирование и подписки аполло
