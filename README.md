# Authentication-Security

Level 1 :Enter Email id and password 
 -Check if user has already signed up and if yes,then check for the password .
 -Problem :Password is not encrypted in database.Anybody can hack it very easily if they get hold of the database

Level 2 :Encryption 
 -"mongoose-encryption" package is used and plugins are attached to schema to encrypt the password in database .
 -save()=>Encrypt : find() => decrypt
 -Problem:secret key is written in app.js and anyone who got the secret key from our code could able to decrypt the password.
