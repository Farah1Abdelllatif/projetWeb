import './loginForm.css'; // Assurez-vous d'importer le bon fichier CSS avec les styles nécessaires
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  // États locaux pour suivre les valeurs des champs de saisie
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);



  const redirect = () => {
    // Votre logique de connexion ici

    // Redirige vers la page de tableau de bord après la connexion réussie
    navigate('/dashboard');
  };
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Validation des champs de saisie
    if (fullName.trim() === '') {
      alert('Veuillez saisir votre nom complet.');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      alert('Le nom complet ne doit pas contenir de symboles.');
      return;
    }
    if (phoneNumber.trim() === '') {
      alert('Veuillez saisir votre numéro de téléphone.');
      return;
    }

    if (!/^[1-9]\d{7}$/.test(phoneNumber)) {
      alert(
        'Le numéro de téléphone doit contenir exactement 8 chiffres et ne pas commencer par 0.'
      );
      return;
    }

    // Validation des champs de saisie
    if (email.trim() === '') {
      alert('Veuillez saisir votre adresse e-mail.');
      return;
    }

    if (!email.includes('@')) {
      alert('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    if (password.trim() === '') {
      alert('Veuillez saisir votre mot de passe.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8083/register', {
        fullName,
        phoneNumber,
        email,
        password,
      });

      console.log('Réponse du serveur:', response.data);
      // Traitez la réponse du serveur en fonction de votre application
      alert("Félicitations , votre compte est créé avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      // Gérez l'erreur de manière appropriée, par exemple en affichant un message à l'utilisateur
    }

    // Si les champs sont valides, vous pouvez effectuer l'action de connexion ici
    // Par exemple, envoyer une requête au serveur pour vérifier les informations d'identification
    console.log('Connexion en cours avec :', { email, password });
  };

  const handleSubmitt = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Validation des champs de saisie
    if (email.trim() === '') {
      alert('Veuillez saisir votre adresse e-mail.');
      return;
    }

    if (!email.includes('@')) {
      alert('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    if (password.trim() === '') {
      alert('Veuillez saisir votre mot de passe.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8083/login', {
        email,
        password,
      });
      // eslint-disable-next-line no-restricted-globals

      console.log('Réponse du serveur:', response.data);
      setLoggedIn(true);

      // Traitez la réponse du serveur en fonction de votre application
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Gérez l'erreur de manière appropriée, par exemple en affichant un message à l'utilisateur
    }

    // Si les champs sont valides, vous pouvez effectuer l'action de connexion ici
    // Par exemple, envoyer une requête au serveur pour vérifier les informations d'identification
    console.log('Connexion en cours avec :', { email, password });
  };

  return (
    <div>
      {/* Affichez le composant de redirection si l'utilisateur est connecté */}
      {loggedIn && redirect()}
      { !loggedIn && (
        // Sinon, affichez le formulaire de connexion
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-6">
              <div className="section text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <form onSubmit={handleSubmitt}>
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-style"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Login
                            </button>
                          </form>
                          <p className="mb-0 mt-4 text-center">
                            <a
                              href="https://www.web-leb.com/code"
                              className="link"
                            >
                              Forgot your password?
                            </a>
                          </p>
                          <div class="form-group mt-4">
                            <a
                              href="https://www.linkedin.com/votrepage"
                              class="social"
                            >
                              <i class="uil uil-linkedin"></i>
                            </a>
                            <a
                              href="mailto:votreadresse@mail.com"
                              class="social"
                            >
                              <i class="uil uil-envelope"></i>
                            </a>
                            <a
                              href="https://github.com/votrepage"
                              class="social"
                            >
                              <i class="uil uil-github-alt"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <form onSubmit={handleSubmit}>
                            <h4 className="mb-3 pb-3">Sign Up</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-style"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="tel"
                                className="form-style"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                              <i className="input-icon uil uil-phone"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                className="form-style"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">
                              Register
                            </button>
                            <div className="form-group mt-2">
                              {/* Réseaux sociaux */}

                              <div>
                                <a
                                  href="https://www.linkedin.com/votrepage"
                                  className="social-link"
                                  class="social"
                                >
                                  <i className="uil uil-linkedin"></i>
                                </a>
                                <a
                                  href="mailto:votreadresse@mail.com"
                                  className="social-link"
                                  class="social"
                                >
                                  <i className="uil uil-envelope"></i>
                                </a>
                                <a
                                  href="https://github.com/votrepage"
                                  className="social-link"
                                  class="social"
                                >
                                  <i className="uil uil-github-alt"></i>
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
