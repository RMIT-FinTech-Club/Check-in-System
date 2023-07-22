import webbrowser
from flask import Flask, request, render_template, session
import requests
# from accessToken import ACCESS_TOKEN
import msal

app = Flask('Excel Application', template_folder='pages')
app.secret_key = '12QW34ER56TY78UI90OP'

app_id = '838cd31a-8036-42eb-8be7-60be1075351a'
client_secret = '6c28Q~kkOmQAMbrqtsyh~~Bf3dMb4PNO_hzu.a3C'
authority_url = 'https://login.microsoftonline.com/common/'
SCOPES = ['User.Read', 'Files.ReadWrite.All', 'Sites.ReadWrite.All']

base_url = 'https://graph.microsoft.com/v1.0/'
# end_point = base_url + 'me/drive/root/children'

client_instance = msal.ConfidentialClientApplication(
    client_id=app_id,
    client_credential=client_secret,
    authority=authority_url
)
# client_instance = PublicClientApplication(client_id=app_id)
# flow = client_instance.initiate_auth_code_flow(scopes=SCOPES)
# print(flow)
# webbrowser.open(flow.get('auth_uri'))

# token_response = client_instance.acquire_token_by_auth_code_flow(flow)
# print(token_response)

authority_request_url = client_instance.get_authorization_request_url(SCOPES)
webbrowser.open(authority_request_url)


@app.route('/')
def get_authentication_code():
    authorization_code = request.args.get('code')
    access_token = client_instance.acquire_token_by_authorization_code(code=authorization_code, scopes=SCOPES)
    session['access_token'] = access_token['access_token']
    return render_template('accessToken.html')


@app.route('/getexcel')
def get_excel_file():
    item_id = 'D5CCC784BD296F2!264'
    # excel_test_link = 'https://1drv.ms/x/s!AvKW0kt4zFwNggjT-jl4RHcoEA_-?e=ql7WGB'
    endpoint = base_url + f'/me/drive/items/{item_id}/workbook/worksheets'

    headers = {
        "Authorization": f'Bearer {session["access_token"]}'
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


app.run(port=8000)
