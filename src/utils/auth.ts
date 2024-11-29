/**
 * @description Create form to request access token from Google's OAuth 2.0 server.
 */
export function signInWithGoogle(responseType: 'code' | 'token') {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  const responseTypeParams = {
    code: {
      response_type: 'code',
      // https://github.com/googleapis/google-api-nodejs-client/issues/750
      access_type: 'offline', // 이 값을 반드시 지정해야 authorization_code를 token으로 교환할 때 access_token과 함께 refresh_token 도 얻을 수 있다
      prompt: 'consent', // 이 값을 반드시 지정해야 authorization_code를 token으로 교환할 때 access_token과 함께 refresh_token 도 얻을 수 있다
    },
    token: {
      response_type: 'token',
    },
  };

  // Parameters to pass to OAuth 2.0 endpoint.
  // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=ko#redirecting
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_AUTH_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH_GOOGLE_REDIRECT_URI,
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    //   'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly',
    include_granted_scopes: 'true',
    state: 'pass-through value',
    ...responseTypeParams[responseType],
  });

  window.location.href = `${oauth2Endpoint}?${params.toString()}`;
}
