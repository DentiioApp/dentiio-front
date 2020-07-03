const config = {
  app: {

  },

  season: {

  },

  // apis
  url: {
    // apiGateway: process.env.REACT_APP_ || 'http://localhost'
  },

  cache: {
    jobs: []
  },

  i18n: {

  },

  zendesk: {

  },

  analytics: {
    id: 'UA-?-?'
  },

  googleTagManager: {
    id: 'GTM-?????'
  },

  payment: {
    // adyen/stripe/????: {
    //   environment: process.env.REACT_APP_ || 'test',
    //   originKey: process.env.REACT_APP_,
    // }
  },

  messages: {
    timeOut: 200,
    cases: {
      error: "Une erreur s'est produite",
      success: 'Inscription réussie',

      favorite: {
        add: {
          error: 'Cas clinique non ajouté aux favoris, veuillez reessayer plus tard',
          success: 'Ce cas clicnique est maintenant dans vos favoris'
        }
      }
    },
    Profile: {
      error: "Une erreur s'est produite",
      success: 'Inscription réussie'
    },
    auth: {
      register: {
        error: "Une erreur s'est produite , validez les données du formulaire",
        success: 'Inscription réussie, Bonjour ! '
      },
      signin: {
        error: 'Connexion échoué, vérifier votre saisie',
        success: 'Connexion approuvé,  Bonjour ! '
      }
    }
  }
}

export default config
