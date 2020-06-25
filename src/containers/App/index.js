import React, { Suspense, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../../assets/style.css';
import CodePlayground from '../CodePlayground';
import SocialLogin from '../SocialAuth';
import Fallback from '../../components/UI/Fallback';
import API from '../../api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadUser, userLoadingError } from './actions';

const Login = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('../Auth')), 600);
    })
);

const Index = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('../Index')), 0);
    })
);

const Landing = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('../Landing')), 0);
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
            loading ? (
              <Fallback />
            ) : (
              <Suspense fallback={<Fallback />}>
                {currentUser ? <Index /> : <Landing />}
              </Suspense>
            )
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

        <Route path='/playground' component={CodePlayground} />
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
