class LoginController {
  constructor(Login, $location) {
    'ngInject';

    this.LoginAPI = Login;
    this.locationAPI = $location;

    this.data = {
      username: null,
      password: null
    };

    // controller level error, not form level error
    this.error = {
      authentication: false
    };
  }

  clearErrors() {
    this.error.authentication = false;
  }

  login(form) {
    if (form.$invalid) {
      return;
    }

    this.LoginAPI.login(this.data).$promise.then((response) => {
      if (response.success) {
        this.locationAPI.path('/index');
      } else {
        this.error.authentication = true;
      }
    }, () => {
      this.error.authentication = true;
    });
  }
}

export default LoginController;
