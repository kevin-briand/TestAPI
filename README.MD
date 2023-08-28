# TestAPI
Ceci est une démo d'une API Symfony avec API Platform et Angular

## Symfony 6
Minimal pour une API sécurisée par token
``` shell
cd back
composer install
# setup BDD
php bin/console doctrine:database:create
php bin/console doctrine:mig:mig
php bin/console doctrine:fixtures:load
```

Activer les extensions pdo_mysql et sodium dans votre php.ini

création des clés RSA(private/public)

Note (Avant de chercher un bug qui n'existe peux être pas) :
```
php bin/console cache:clear
```

## Angular
``` shell
cd front
npm install
```

## Lancement
```batch
//Symfony (Avec symfony CLI)
cd back
symfony server:start --no-tls -d
//Angular
cd ../front
ng serve
```
un utilisateur existe par défaut :<br>
email : admin@admin.fr<br>
mdp : 0000

Accès API platform
http://localhost:8000/api

Accès App
http://localhost:4200/
