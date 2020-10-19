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
      id: 'none',
      type: 'none',
      patient: {},
      averageNote: 0,
      commentaires: [{}],
      conclusion: 'none',
      createdAt: '2000-01)à1T00/00/00+02:00',
      evolution: 'none',
      // id:0,
      isEnabled: 'false',
      keyword: [{}],
      notations: [{}],
      observation: 'none',
      pathologie: [{}],
      presentation: 'none',
      speciality: [{}],
      symptome: [{}],
      treatment: [],
      treatmentPlan: 'none'

    },
    keywords: []

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

  ages: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
    58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100
  ],
  sexes: [
    { id: 'M', name: 'Masculin' },
    { id: 'F', name: 'Féminin' }
  ],

  messages: {
    timeOut: '2000',
    cases: {
      error: "Une erreur s'est produite",
      success: 'Le cas a été ajouté avec succès',
      patientError: 'Une erreur est survenu à la création du patient',

      favorite: {
        add: {
          error: 'Cas clinique non ajouté aux favoris, veuillez reessayer plus tard',
          success: 'Ce cas clicnique est maintenant dans vos favoris'
        },
        delete: {
          error: 'Le cas clinique n\'a pas pu être retiré de vos favoris, veuillez reessayer plus tard',
          success: 'Ce cas clicnique ne fais plus partie de vos favoris'
        }
      }
    },
    Profile: {
      error: "Une erreur s'est produite",
      success: 'Inscription réussie'
    },
    auth: {
      register: {
        error: "L'adresse email existe déja veuillez en saisir une autre",
        success: 'Inscription réussie, Bonjour ! '
      },
      signin: {
        error: 'Connexion échoué, vérifier votre saisie',
        success: 'Connexion approuvé,  Bonjour ! ',
        autoLogError: 'Une erreur est survenu lors d\'une authentification'
      },
      card: {
        error: 'Une erreur est survenue lors du chargement de votre carte',
        success: 'Carte envoyé, vous serez notifié par mail une fois votre status validé ! ',
        pending: 'Telechargement de votre carte en progression ...'
      }
    },
    avatar: {
      error: 'Une erreur est survenue',
      success: 'Avatar modifié !',
      pending: 'Votre avatar est en cours de chargement ...'
    },
    editUser: {
      error: 'Une erreur est survenue',
      success: 'Informations modifiées !',
      pending: 'Votre avatar est en cours de chargement ...'
    }
  }
}

export default config
