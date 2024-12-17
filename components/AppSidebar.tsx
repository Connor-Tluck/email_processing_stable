'use client'

import { useState } from 'react'
import { Home, Upload, FileText, Database, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (path: string) => pathname === path

  const NavItem = ({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) => {
    const active = isActive(href)
    return (
      <Link 
        href={href}
        className={cn(
          "flex items-center transition-all relative",
          isCollapsed 
            ? "h-10 w-10 mx-auto justify-center" 
            : "h-10 w-full gap-3 px-3",
          active 
            ? "text-primary" 
            : "text-muted-foreground hover:text-primary"
        )}
      >
        <div className={cn(
          "absolute inset-0 rounded-md",
          active ? "bg-primary/10" : "hover:bg-primary/5",
        )} />
        <Icon className="h-4 w-4 z-10" />
        {!isCollapsed && <span className="z-10">{children}</span>}
      </Link>
    )
  }

  return (
    <div className={cn(
      "flex flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-[56px]" : "w-[240px]"
    )}>
      <div className="h-14 flex items-center border-b px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <span className={cn(
          "ml-2 text-lg font-semibold transition-opacity overflow-hidden",
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}>
          Email Auto
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        <nav className="space-y-2 p-2">
          <div className={cn("py-2", isCollapsed ? "px-2" : "px-3")}>
            <h2 className={cn(
              "mb-2 text-xs font-semibold text-muted-foreground transition-opacity",
              isCollapsed ? "opacity-0" : "opacity-100"
            )}>
              MAIN
            </h2>
            <div className="space-y-1">
              <NavItem href="/" icon={Home}>
                Home
              </NavItem>
              <NavItem href="/upload-contacts" icon={Upload}>
                Upload Contacts
              </NavItem>
              <NavItem href="/templates" icon={FileText}>
                Templates
              </NavItem>
              <NavItem href="/supplemental-data" icon={Database}>
                Supplemental Data
              </NavItem>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

