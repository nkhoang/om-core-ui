class UserResource {
  constructor($resource) {
    'use strict';
    const baseUrl = '/api/user';

    return $resource(baseUrl, null, {
      save: {
        url: baseUrl,
        method: 'POST'
      },
      update: {
        url: baseUrl + '/:username',
        params: {
          username: '@username'
        },
        method: 'PUT'
      },
      delete: {
        url: baseUrl + '/:username',
        params: {
          username: '@username'
        },
        method: 'DELETE'
      },
      getAll: {
        url: baseUrl + '/all',
        method: 'GET',
        timeout: 30000,
        isArray: true,
        transformResponse: (data) => {
          try {
            JSON.parse(data);
          } catch (exception) {
            return [];
          }
          return angular.fromJson(data);
        }
      },
      current: {
        url: baseUrl + '/current',
        method: 'GET'
      }
    });
  }

  static UserResourceFactory($resource) {
    'ngInject';
    return new UserResource($resource);
  }
}

export default UserResource;
