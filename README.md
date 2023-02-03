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
