# TestAPI
Ceci est une démo d'une API Symfony avec API Platform et Angular

## Symfony 6
Minimal pour une API sécurisée par token
```
composer require symfony/maker-bundle --dev
composer require api
composer require lexik/jwt-authentication-bundle
```
création des clés RSA(private/public)

Note (Avant de chercher un bug qui n'existe peux être pas) :
```
php bin/console cache:clear
```

## Angular

## Lancement
```batch
//Symfony (Avec symfony CLI)
cd back
symfony server:start --no-tls -d
//Angular
cd ../front
ng serve
```
Accès API platform
http://localhost:8000/api

Accès App
http://localhost:4200/
