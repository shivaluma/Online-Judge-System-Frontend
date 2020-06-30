import React, { Suspense, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../../assets/style.css';

import SocialLogin from '../SocialAuth';
import Fallback from '../../components/UI/Fallback';
import API from '../../api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Index from '../Index';
import Landing from '../Landing';
import { loadUser, userLoadingError } from './actions';

const Login = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('../Auth')), 600);
    })
);

const CodePlayground = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('../CodePlayground')), 500);
    })
);

const UserProfile = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('../User')), 300);
    })
);

function App({ loadUser, currentUser, loading, userLoadingError }) {
  useEffect(() => {
    (async () => {
      try {
        if (!localStorage.getItem('brosjudge-token')) {
          userLoadingError();
          return;
        }
        const response = await API.get('user/me');
        loadUser(response.data);
      } catch (err) {
        userLoadingError();
        return;
      }
    })();
  }, [loadUser]);

  return (
    <Router>
      <Switch>
        <Route
          path='/'
          exact
          render={() =>
            loading ? <Fallback /> : currentUser ? <Index /> : <Landing />
          }
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

        <Route
          path='/playground'
          exact
          render={() => (
            <Suspense fallback={<Fallback />}>
              <CodePlayground />
            </Suspense>
          )}
        />

        <Route
          path='/profile'
          exact
          render={() => (
            <Suspense fallback={<Fallback />}>
              <CodePlayground />
            </Suspense>
          )}
        />

        <Route
          path='/profile'
          render={() => (
            <Suspense fallback={<Fallback />}>
              <UserProfile />
            </Suspense>
          )}
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.global.currentUser,
  userData: state.global.userData,
  loading: state.global.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadUser, userLoadingError }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
