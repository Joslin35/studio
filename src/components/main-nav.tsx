'use client';

import {
  BarChart2,
  LayoutDashboard,
  Lightbulb,
  Recycle,
  User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/suggestions', label: 'Suggestions', icon: Lightbulb },
  { href: '/alternatives', label: 'Alternatives', icon: Recycle },
  { href: '/tracking', label: 'Tracking', icon: BarChart2 },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: item.label }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
