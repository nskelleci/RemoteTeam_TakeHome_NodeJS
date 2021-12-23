# RemoteTeam_TakeHome

SAMPLE DATA for Credentials: 
```JSON
  {
    "platformCredentials" : [
        {
            "platformId":0,
            "platformName": "gitlab",
            "platformPrefix" :"gtl",
            "login" : "<yourlogin>",
            "token" : "<personal-access-token>"      
         },
         {
            "platformId":1,
            "platformName": "github",
            "platformPrefix" :"gth",
            "login" : "<yourlogin>",
            "token" : "<personal-access-token>"       
         }
    ]   
}
```

## ENDPOINTS

```JS
//GET ALL groups/organizations for the given platform credentials 
/apps
```

```js
//GETS group/organization details for the given platform credentials
/:app/details
```
Sample
```js
//GETS all users in group/organization for the given platform credentials
/:app/users
```
```js
//GETS details of user in given group/organization for the given platform credentials
/:app/:users/:id
```


```js
//ADDS user in the request body fro the given platform credentials
//POST
/:app/users
```
Sample Request Body for Gitlab
```JSON
{
    "username":"<gitlabUserName>",
    "access_level" : 30
}
//Access_level must be integer and accepts only;  10(guest), 20(reporter), 30(developer), 40(maintainer), 50(owner)
```
Sample Request Body for Github
```JSON
{
  "email" : "nskelleci@gmail.com",
  "role" : "admin"
}
// role value can be "admin" or "member"
```

```js
//UPDATE the user in given group/organization with the data in request body for given platform credentials
//PUT
/:app/users/:id
```
Sample Request Body for Gitlab
```JSON
{
    "access_level" : 30
}
// only access_level can be edited for user
//Access_level must be integer and accepts only;  10(guest), 20(reporter), 30(developer), 40(maintainer), 50(owner)
```
Sample Request Body for Github
```JSON
{
  "role" : "admin"
}
//only role can be edited for user
// role value can be "admin" or "member"
```
```js
//Deletes the user from given group/organization for given platform credentials
//DELETE
/:app/users/:id



