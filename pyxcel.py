from flask import Flask, request, render_template, session, redirect, url_for
import requests
from Utils.secret_key import generate_key
import msal

# Establish application
app = Flask('Excel Application', template_folder='pages')

# app_id = '838cd31a-8036-42eb-8be7-60be1075351a'
# client_secret = '7yH8Q~1yYo~lUjnYgB~TNqSUAFmlwvJSz-TYEdnD'
app_id = 'a68b3650-f37a-432e-8a4d-7ebfd99df02e'
client_secret = 'Qh98Q~5cVGrRohEPj2QBrUIG_meDhbq00VE0baS-'
authority_url = 'https://login.microsoftonline.com/common/'
# authority_url = 'https://login.microsoftonline.com/organizations'
SCOPES = ['User.Read', 'Files.ReadWrite.All', 'Sites.ReadWrite.All']
# TENANT_ID = '75e78411-a083-4bee-8e3a-4557bc59213d'
TENANT_ID = 'a49a182d-cfa2-492c-9c5b-40c42c5571b3'
base_url = 'https://graph.microsoft.com/v1.0/'
# end_point = base_url + 'me/drive/root/children'
redirect_uri = 'https://localhost:8000'

client_instance = msal.ConfidentialClientApplication(
    client_id=app_id,
    client_credential=client_secret,
    authority=authority_url
)
# graph_app = msal.PublicClientApplication(client_id=app_id)

# authority_request_url = client_instance.get_authorization_request_url(SCOPES)
# webbrowser.open(authority_request_url)


@app.route('/')
def get_authentication_code():
    # Get Access token
    authorization_code = request.args.get('code')  # Auth code for Access token
    access_token = client_instance.acquire_token_by_authorization_code(code=authorization_code, scopes=SCOPES)
    # try:
    session['access_token'] = access_token.get('access_token')
    # except Exception:
    #     return access_token

    # Save the user data in the session
    session['user'] = {
        'name': access_token.get('id_token_claims', {}).get('name', 'User'),
        'access_token': access_token.get('access_token'),
    }

    # return render_template('accessToken.html')
    return access_token


@app.route('/approval')
def get_admin_consent():
    return redirect(f'https://login.microsoftonline.com/{TENANT_ID}/adminconsent?client_id={app_id}')


@app.route('/login')
def authorize():
    # Check if already logged in
    # if session.get('user') is not None:
    #     return f'Hello, {session["user"]["name"]}! You are already logged in.'

    # Generate Microsoft login url
    authority_request_url = client_instance.get_authorization_request_url(SCOPES)
    return redirect(authority_request_url)
    # result = graph_app.acquire_token_interactive(scopes=SCOPES)
    # if "access_token" in result:
    #     access_token = result['access_token']
    #     return access_token
    # else:
    #     return "User consent was not granted."


@app.route('/logout')
def logout():
    # Clear out the session
    session.pop('user', None)

    return redirect(url_for('/login'))


@app.route('/getexcel')
def get_excel_file():
    item_id = request.args.get('id')  # Auth code for Access token
    # item_id = 'D5CCC784BD296F2!264'
    # excel_test_link = 'https://1drv.ms/x/s!AvKW0kt4zFwNggjT-jl4RHcoEA_-?e=ql7WGB'
    endpoint = base_url + f'/me/drive/items/{item_id}/workbook/worksheets'

    headers = {
        "Authorization": f'Bearer {session["user"]["access_token"]}'
    }

    response = requests.get(endpoint, headers=headers)
    # print(response.json())
    return response.json()


@app.route('/adddata')
def add_data_to_cell():
    # data = request.args.get('data')
    data = ['s69420', 'Nguyen Thi Van A', 'Least handsome girl']
    item_id = 'D5CCC784BD296F2!264'
    # item_id = 'https://rmiteduau.sharepoint.com/:x:/r/sites/RMITFinTechClub2023/Shared%20Documents/FINTEST.xlsx?d=w05f5bdb6912f45feaf35011abef05a15&csf=1&web=1&e=IRI5X8'
    sheet_name = 'TestSheet'
    cell_address = 'A2:C2'
    endpoint = base_url + f"/me/drive/items/{item_id}/workbook/worksheets/{sheet_name}/range(address='{cell_address}')"

    headers = {
        "Authorization": f'Bearer {session["access_token"]}',
        'Content-Type': 'application/json'
    }

    request_body = {
        'values': [data]
    }

    response = requests.patch(endpoint, headers=headers, json=request_body)
    print(response)
    if response.status_code == 200:
        return 'Successfully added data'
    else:
        return f'There was an error: {response.json()}'


@app.route('/getsites')
def get_sites():
    endpoint = base_url + '/me/drives'

    headers = {
        "Authorization": f'Bearer {session["user"]["access_token"]}',
        'Content-Type': 'application/json'
    }

    response = requests.get(endpoint, headers=headers)
    # print(response.json())
    return f'<{response.status_code}>\n {response.json()}'


if __name__ == '__main__':
    app.secret_key = generate_key()  # Generate secret key
    app.run(port=8000, debug=True)
