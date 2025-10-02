import { Desktop, Plus, Bell, User, Gear, ChartBar } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onAddEquipment: () => void
  onNewPurchase: () => void
}

export function Header({ onAddEquipment, onNewPurchase }: HeaderProps) {
  const notificationCount = 3

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <Desktop size={28} className="text-white" weight="bold" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">IPPEL Equipamentos</h1>
                <p className="text-sm text-muted-foreground">Sistema de Controle de TI</p>
              </div>
            </div>
            
            <Separator orientation="vertical" className="h-8" />
            
            <div className="hidden lg:flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ChartBar size={16} />
                <span>Dashboard Operacional</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <Button
                onClick={onNewPurchase}
                variant="outline"
                size="sm"
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                <Plus size={16} />
                Nova Solicitação
              </Button>
            </div>
            
            <Button
              onClick={onAddEquipment}
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Equipamento</span>
              <span className="sm:hidden">Adicionar</span>
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-muted/50"
            >
              <Bell size={18} />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <User size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User size={16} className="mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Gear size={16} className="mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}