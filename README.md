# NodeJS - Connecting MySQL with MSI and Azure KeyVault

>**The purpose of this repository is intended just for training material and it is not recommended to take this as a reference for production scenarios.**

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fazureossd%2Fappsreadynext-nodejs-msi-1%2Fmaster%2Ftemplate.json)

- This template will create the following resources:
    - Azure Database for MySQL with Enforce SSL option disabled.
    - Azure NodeJS Linux.

## Requirements
1. Create an Azure KeyVault resource.
2. Create a secret for your KeyVault with your MySQL password.
3. Go to Azure Web App under Identity and enable **System Assigned** and copy the Object ID value.
4. Create/Update the following App Settings for your web app.

 -  **KEY_VAULT_URL**=your_keyvault_url
 -  **SECRET_NAME** = your_secret_name
 -  **HOST** = database_server
 -  **USER** = database_user
 -  **DATABASE** = database_name
5. Request the site to reproduce a Forbidden 403 error.

## Forbidden 403 error
1. To fix this issue, go to your KeyVault under **Access policies** and add an **Access Policy**.
2. Select from template **Secret Management** and select just Secret Permissions **Get** and then Select principal and copy the object id and add it. (Do not add Authorized Application, leave it as none selected) 