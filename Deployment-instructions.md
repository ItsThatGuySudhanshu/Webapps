# Instructions to deploy the app (in Windows)

<br>

## Prerequisites

1. Have an Auth0 account that is up and running for the database

2. Have the application ready and connected to the application

3. Log into Auth0

<br>

## Deploy the backend
<br>

1. Install the heroku cli
```
npm install -g heroku
```

2. Clone the git repository for the backend
```
git clone https://github.ncsu.edu/sjmoghe/342-Backend.git
```
3. CD into the git backend directory

```
cd 342-Backend
```
4. Create a new heroku application through the cli
```
heroku create
```

5. Push the code from the repository to the heroku app
```
git push heroku main
```

6. Copy the URL given from the CLI for the deployed heorku app to a notepad

<br>

## Deploy the frontend

1. Create an account on netlify

2. On github, create a new empty repository under your account and clone it into your system
```
git clone <your repo>
```

3. Clone the front-end repository from github
```
git clone https://github.com/ItsThatGuySudhanshu/342-frontend-2.git
```

4. Copy all the files except the .git file from the front-end repository to the empty repository that you created

5. Locate the package.json file in the repository you created

6. Under "proxy" in the package.json file, copy in the URL that you got from the backend deployment
```
"proxy" : `<URL here>`,
```

7. In the "_redirects" file under the "public" folder, locate the line with the /api command. Change the URL that says "warm-bayou" with the URL that you got from the backend.
```
/api/* <URL here>/api/:splat
```
8. Under src/components/MovieCard.js, replace the URL "https://warm-bayou-22517.herokuapp.com" with the obtained URL from Netlify (ran into some bugs with proxying POST requests directly)
```js
movie = await axios.post(`"your url"/api/users/${user.sub.substring(6)}/watchlist/add`

await axios.delete(`"your url"/api/users/${user.sub.substring(6)}/watchlist/remove`,
```

9. Push the changes from the initially empty repository to the remote repository
```
cd <your repo>
git add .
git commit -m "initial commit"
git push
```

10. Log into your netlify account, and select the option "New site from git"

11. In the "Import an existing project from a Git repository" pane, choose the button Github

12. Authenticate github and choose the repository that you created from the given options

13. Under the Site settings, input these options
```
"Build command"
react-scripts build
"Publish directory"
build
```

14. Once the site is deployed, in the page for Netlify, go to Site Settings -> Build and deploy -> Environment. Put these values in:
```
(Value --> key)


REACT_APP_AUTH0_CLIENT_ID --> 0CNcgOTYJnvpCVDVsEVjvcg1bHuUbJQp

REACT_APP_AUTH0_DOMAIN --> dev-80e0z89c.us.auth0.com

ATLAS_URI --> mongodb+srv://adnason:mongodb@cluster0.gmiks.mongodb.net/db-name?retryWrites=true&w=majority

API_KEY --> 76f390b4a5721ca402460139318a549d
```

15. Copy the URL of your frontend from netlify and go to the Application in your Auth0 account.

16. Paste the URL into the Allowed Callback URLs, Allowed Logout URLs, and Allowed Web Origins
