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
          permiso: 'MENU_FACTURA'
        },
        {
          title: 'Notas de Credito',
          url: 'notascredito',
          permiso: 'MENU_NOTA_CREDITO'
        },
        {
          title: 'Remisiones',
          url: 'remisiones',
          permiso: 'MENU_REMISION'
        },
        {
          title: 'Autofacturas',
          url: 'autofacturas',
          permiso: 'MENU_AUTOFACTURA'
        }
      ],
    },
    {
      title: 'Inutilizar Numeración',
      url: 'inutilizacion',
      permiso: 'MENU_INUTILIZACION'
    }
];