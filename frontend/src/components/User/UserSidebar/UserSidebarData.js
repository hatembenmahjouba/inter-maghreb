const USERSIDEBARDATA = [
  {
    title: 'My Orders',
    path: '/myorders',
  },
  {
    title: 'My Reviews',
    path: '/myreviews',
    user: true,
  },
  {
    title: 'Wishlist',
    path: '/wishlist',
  },
  {
    title: 'Settings',
    subNav: [
      {
        title: 'Update My Profile',
        path: '/updateprofile',
      },
      {
        title: 'Edit Password',
        path: '/updatepassword',
      },
    ],
  },
];

export default USERSIDEBARDATA;
