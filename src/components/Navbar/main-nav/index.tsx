'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const MainNav = () => {
  const pathname = usePathname()
  const params = useParams()
  const routes = [
    {
      href: `/${params?.storeId}`,
      label: 'Overview',
      active: pathname === `/${params?.storeId}`,
    },

    {
      href: `/${params?.storeId}/billboards`,
      label: 'Billboards',
      active: pathname.startsWith(`/${params?.storeId}/billboards`),
    },
    {
      href: `/${params?.storeId}/categories`,
      label: 'Categories',
      active: pathname.startsWith(`/${params?.storeId}/categories`),
    },
    {
      href: `/${params?.storeId}/sizes`,
      label: 'Sizes',
      active: pathname.startsWith(`/${params?.storeId}/sizes`),
    },
    {
      href: `/${params?.storeId}/colors`,
      label: 'Colors',
      active: pathname.startsWith(`/${params?.storeId}/colors`),
    },
    {
      href: `/${params?.storeId}/products`,
      label: 'Products',
      active: pathname.startsWith(`/${params?.storeId}/products`),
    },
    {
      href: `/${params?.storeId}/orders`,
      label: 'Orders',
      active: pathname.startsWith(`/${params?.storeId}/orders`),
    },
    {
      href: `/${params?.storeId}/settings`,
      label: 'Settings',
      //   icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname.startsWith(`/${params?.storeId}/settings`),
    },
  ]
  return (
    <ul className='flex items-center space-x-4 lg:space-x-6'>
      {routes.map(route => (
        <li key={route.href}>
          <Link
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              route.active ? 'text-black dark:text-white' : 'text-gray-600',
              { 'text-lg': route.active }
            )}
          >
            {route.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MainNav
