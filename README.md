# Authentication-Security

Level 1 :Enter Email id and password 
 -Check if user has already signed up and if yes,then check for the password .
 -Problem :Password is not encrypted in database.Anybody can hack it very easily if they get hold of the database

Level 2 :Encryption 
 -"mongoose-encryption" package is used and plugins are attached to schema to encrypt the password in database .
 -save()=>Encrypt : find() => decrypt
 -Problem:secret key is written in app.js and anyone who got the secret key from our code could able to decrypt the password.

Level 3 :Encrypt sensitive information like API keys ,secret keys using Environment variables  
  -create .env file in the root directory and hide it in the .gitignore
  -problem:if someone able to hack into the secret key,it get decrypted .Not so secure ,method. 

Level 4:Hashing Password 
 -use md5 package of npm 
 -Hashed password both at register and login time will be compared 
 
Level 5: Hashing and Salting
 -Password +Salt(random number) +Hash Function ⇒ Hash 
 -use of industrial standard bcrypt algorithm to keep the password safe. bcrypt hashes can be predicted very very slowly .
 -salt rounds ⇒ number of times hashed passwords get hashed with same salt number as in round one.We can change number of salt rounds everyyear to make it hacked proof
