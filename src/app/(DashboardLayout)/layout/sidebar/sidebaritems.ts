import { uniqueId } from 'lodash'

export interface MenuItem {
  heading?: string
  name?: string
  icon?: string
  id?: number | string
  url?: string
  children?: MenuItem[]
  adminOnly?: boolean
  userOnly?: boolean
}

const SidebarContent: MenuItem[] = [
  /* ================= MAIN ================= */
  {
    heading: 'MAIN',
    children: [
      {
        id: uniqueId(),
        name: 'Dashboard',
        icon: 'solar:widget-2-linear',
        url: '/',
      },
    ],
  },

  /* ================= MANAGEMENT ================= */
  {
    heading: 'MANAGEMENT',
    children: [
      /* 👑 ADMIN → PRODUCTS (WITH SUB MENU) */
      {
        id: uniqueId(),
        name: 'Products',
        icon: 'solar:box-bold',
        adminOnly: true,
        children: [
          {
            id: uniqueId(),
            name: 'Add Product',
            icon: 'solar:add-square-linear',
            url: '/apps/products',
            adminOnly: true,
          },
          {
            id: uniqueId(),
            name: 'View Products',
            icon: 'solar:list-check-linear',
            url: '/apps/products/view',
          },
        ],
      },

      /* 👤 USER → VIEW PRODUCTS ONLY */
      {
        id: uniqueId(),
        name: 'View Products',
        icon: 'solar:box-linear',
        url: '/apps/products/view',
        userOnly: true,
      },

      /* 👑 ADMIN ONLY */
      {
        id: uniqueId(),
        name: 'Orders',
        icon: 'solar:cart-large-2-linear',
        url: '/apps/orders',
        adminOnly: true,
      },
      {
        id: uniqueId(),
        name: 'Admins',
        icon: 'solar:user-id-linear',
        url: '/apps/admins',
        adminOnly: true,
      },
    ],
  },

  /* ================= AUTH ================= */
  {
    heading: 'AUTH',
    children: [
      {
        id: uniqueId(),
        name: 'Logout',
        icon: 'solar:logout-2-linear',
        url: '/auth/logout',
      },
    ],
  },
]

export default SidebarContent
