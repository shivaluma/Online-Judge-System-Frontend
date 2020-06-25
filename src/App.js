import React, { Suspense } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/style.css';
import CodePlayground from './pages/CodePlayground';
import SocialLogin from './pages/SocialLogin';
import Fallback from './components/UI/Fallback';
const Login = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('./pages/Login')), 600);
    })
);

const Index = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('./pages/Index')), 250);
    })
);

const Landing = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('./pages/Landing')), 250);
    })
);

function App() {
  const user = { isLogin: false };
  return (
    <Router>
      <Switch>
        <Route
          path='/'
          exact
          render={() => (
            <Suspense>{user.isLogin ? <Index /> : <Landing />}</Suspense>
          )}
        />
        <Route
          path='/accounts/login'
          exact
          render={() => (
            <Suspense fallback={<Fallback />}>
              <Login isLoginMode={true} />
            </Suspense>
          )}
        />

        <Route path='/accounts/social-login' component={SocialLogin} />

        <Route
          path='/accounts/signup'
          render={() => (
            <Suspense fallback={<Fallback />}>
              <Login isLoginMode={false} />
            </Suspense>
          )}
        />

        <Route path='/playground' component={CodePlayground} />
      </Switch>
    </Router>
  );
}

export default App;
