export const menuItems = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Envio',
      url: '/envios',
      submenu: [
        {
          title: 'Facturas',
          url: 'facturas',
        },
        {
          title: 'Notas de Credito',
          url: 'notascredito',
        },
        {
          title: 'Remisiones',
          url: 'remisiones',
        },
        {
          title: 'Autofacturas',
          url: 'autofacturas',
        }
      ],
    },
];