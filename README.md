# jif-chat 
<p>
  <img src="client/public/android-icon-192x192.png" width="100" title="Logo">
</p> 


its a social networking website that allows you to send and receive post ( gif + text ) called jifs.

## features
- User can post gif (gif duration is 2 seconds) with text (max length 120 characters)
- User can make jif with or without getting logged in. If they make jif after getting login, then they can delete their own jifs.
- User will recieve jifs from other user in real-time and this feature is implemented using `server sent events`

## 3rd party services

- [Cloudinary](https://cloudinary.com/)
- [Google OAuth](https://console.developers.google.com/)

**Note: if you want to learn how to create project in Google OAuth, then follow this [tutorial](https://github.com/Shahzayb/mern-google-login)**

## Installing

1. 

```
git clone https://github.com/Shahzayb/jif-chat.git
cd jif-chat
npm install
cd server && npm install
cd client && npm install
touch client/.env.local
touch server/config/dev.env
```


2. Here is the list of all env variables you have to provide.

**inside dev.env:** 

`CLOUDINARY_CLOUD_NAME=value` 

`CLOUDINARY_API_KEY=value` 

`CLOUDINARY_API_SECRET=value` 


`GOOGLE_CLIENT_ID=value` | a google oauth client id.
`GOOGLE_CLIENT_SECRET=value` | a google oauth lib client secret

`DB_URL=value` | your database uri

`JWT_SECRET=value` | a json web token secret

`ANONYMOUS_USER_ID= id of anonymous user inside database` | you have to create this user manually inside database

**inside .env.local:**
 
`REACT_APP_GOOGLE_CLIENT_ID=value` 

`REACT_APP_PAGE_SIZE=value for pagination` 

`REACT_APP_CLOUDINARY_CLOUD_NAME=value`

## Author

* **Shahzaib Sarwar**  - [shahzayb](https://github.com/shahzayb)


## License

[MIT](https://github.com/Shahzayb/freemage/blob/master/LICENSE)
