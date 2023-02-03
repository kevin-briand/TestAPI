<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Doctrine\ORM\Mapping as ORM;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

#[
    ApiResource( // Expose l'entité en tant que ressource dans l'API
        // Placé ici les paramètres sont valables pour toutes les requêtes
        normalizationContext: ['groups' => ['read:User']], // Créer un groupe pour le context de normalisation (JSON > Objet)
        denormalizationContext: ['groups' => ['write:User']], // Créer un groupe pour le context de dénormalisation (Objet > JSON)
        openapiContext: [
            'security' => [['bearerAuth' => []]]
        ],
        security: 'is_granted("ROLE_USER")' // Necessite d'être authentifié pour acceder aux ressources
    ),
    // Si un type de requete http est spécifié ici toutes les requetes non définie ne seront plus exposé dans l'API (GET,GETCOLLECTION,POST,PUT,PATCH,DELETE)
    Get(), // Expose les GET dans l'API > selection id par défaut
    GetCollection( // Expose les Collections dans l'API
        paginationEnabled: false // Retire la pagination
    ),
    Patch(), // Doit être utilisé pour le remplacement partiel de la ressource
    Put(), // Doit être utilisé pour le remplacement total de la ressource
    Post(security: 'is_granted("ROLE_ADMIN")', processor: UserPasswordHasher::class), // Permet la création d'un nouvel utilisateur
    Delete // Permet la suppression d'une ressource
]
#[
    ORM\Entity(repositoryClass: UserRepository::class),
    ORM\Table(name: '`user`')
]
class User implements UserInterface, PasswordAuthenticatedUserInterface, JWTUserInterface // Ajout JWTUserInterface pour la méthode createFromPayload
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:User'])] // Expose la variable à la lecture
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[
        Groups(['read:User', 'write:User']),
        NotBlank
    ]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['read:User'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[
        Groups(['write:User']), // Expose la variable à l'écriture
        SerializedName('password'), // Renomme la variable
        Length(min: 4)
    ]
    private ?string $plainPassword = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    /**
     * @param string|null $plainPassword
     */
    public function setPlainPassword(?string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    // Méthode pour récupérer les info utilisateur dans le token plutôt que la BDD
    public static function createFromPayload($username, array $payload)
    {
        $user = new User();
        $user->setEmail($username ?? '');
        return $user;
    }
}
