// module.exports = [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];


module.exports = [
  'strapi::logger',
  'strapi::errors',
<<<<<<< HEAD
=======
  
>>>>>>> 21cccf27e63b77da5641b09523a06cadc914ed0a
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
<<<<<<< HEAD
          'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            
            
          ],
=======
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
>>>>>>> 21cccf27e63b77da5641b09523a06cadc914ed0a
          upgradeInsecureRequests: null,
        },
      },
    },
  },
<<<<<<< HEAD
  
=======
>>>>>>> 21cccf27e63b77da5641b09523a06cadc914ed0a
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  
];

