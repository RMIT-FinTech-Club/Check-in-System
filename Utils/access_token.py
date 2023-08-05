import msal


def get_access_token():
    APP_ID = '838cd31a-8036-42eb-8be7-60be1075351a'
    CLIENT_SECRET = '6c28Q~kkOmQAMbrqtsyh~~Bf3dMb4PNO_hzu.a3C'
    TENANT_ID = '75e78411-a083-4bee-8e3a-4557bc59213d'
    # authority_url = 'https://login.microsoftonline.com/common/'
    authority_url = f'https://login.microsoftonline.com/{TENANT_ID}'
    # SCOPES = ['User.Read', 'Files.ReadWrite.All', 'Sites.ReadWrite.All']
    # token_url = f'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token'

    client_instance = msal.ConfidentialClientApplication(
        client_id=APP_ID,
        client_credential=CLIENT_SECRET,
        authority=authority_url
    )

    try:
        result = client_instance.acquire_token_for_client(scopes=['https://graph.microsoft.com/.default'])
        access_token = result.get('access_token')
        return access_token
    except msal.exceptions.MsalServiceError as e:
        return f"Error getting access token: {e}"
