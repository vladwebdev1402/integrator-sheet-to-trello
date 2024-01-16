export const environment = {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    profileUrl: "",
    authQuery: {
        client_id: "1015368277863-5neb6t7eq8nm3cs1rfih5dshf8ug0ai0.apps.googleusercontent.com",
        redirect_uri: "http://localhost:3000/profile",
        state:"state_parameter_passthrough_value",
        response_type:"code",
        include_granted_scopes:"true",
        scope: ["https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"]
    },
    clientSecret: "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",
  };




