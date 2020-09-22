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
    jobs: [],
    currentCase: {
      id: "none",
      type: "none",
      patient: {},
      averageNote: 0,
      commentaires:[{}],
      conclusion: "none",
      createdAt: "2000-01)à1T00/00/00+02:00",
      evolution: "none",
      //id:0,
      isEnabled:'false',
      keyword: [{}],
      notations: [{}],
      observation: 'none',
      pathologie: [{}],
      presentation:'none',
      speciality: [{}],
      symptome: [{}],
      treatment: [],
      treatmentPlan: "none",
    }
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
      },
      card:{
        error: "Une erreur est survenue lors du chargement de votre carte",
        success: 'Carte envoyé, vous serez notifié par mail une fois votre status validé ! '
      }
    }
  }
}

export default config
