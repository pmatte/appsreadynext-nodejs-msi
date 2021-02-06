# NodeJS - Connecting MySQL with MSI and Azure KeyVault

>**The purpose of this repository is intended just for training material and it is not recommended to take this as a reference for production scenarios.**

## Requirements

1. Create an Azure Database for MySQL resource.
2. Create an Azure KeyVault resource.
3. Create a secret for your KeyVault.
4. Create a NodeJS Linux web app.
5. Enable MSI with **System Assigned** and copy the Object ID value.
6. Go to your KeyVault under Access policies and add an Access Policy.
7. Select from template **Secret Management** and select just Key Permissions **Get** and Secret Permissions **Get** and then Select principal and copy the object id and add it. (Do not add Authorized Application, leave it as none selected) 
8. Create the following App Settings for your web app.

 -  **KEY_VAULT_URL**=your_keyvault_url
 -  **SECRET_NAME** = your_secret_name
 -  **HOST** = database_server
 -  **USER** = database_user
 -  **DATABASE** = database_name