class LoginResource {
  constructor($resource) {
    const baseUrl = 'login';

    return $resource(baseUrl, null, {
      login: {
        url: baseUrl + '?username=:username&password=:password',
        method: 'POST',
        params: {
          username: '@username',
          password: '@password'
        }
      }
    });
  }

  static LoginResourceFactory($resource) {
    'ngInject';
    return new LoginResource($resource);
  }
}

export default LoginResource;
