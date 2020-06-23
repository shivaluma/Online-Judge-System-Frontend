import React, { Suspense, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentUserQuery } from './recoil/selectors';
import { userState } from './recoil/atoms';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/style.css';
import Landing from './pages/Landing';
import Index from './pages/Index';
import Fallback from './components/UI/Fallback';
const Login = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('./pages/Login')), 600);
    })
);
function App() {
  const userQuery = useRecoilValue(currentUserQuery);
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    if (userQuery) setUser({ isLogin: true, data: userQuery });
  }, [user, userQuery, setUser]);
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={!user ? Landing : Index} />
        <Route
          path='/accounts/login'
          render={() => (
            <Suspense fallback={<Fallback />}>
              <Login isLoginMode={true} />
            </Suspense>
          )}
        />
        <Route
          path='/accounts/signup'
          render={() => (
            <Suspense fallback={<Fallback />}>
              <Login isLoginMode={false} />
            </Suspense>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
