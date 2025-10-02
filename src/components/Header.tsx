import { Desktop, Plus } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddEquipment: () => void
  onNewPurchase: () => void
}

export function Header({ onAddEquipment, onNewPurchase }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <Desktop size={24} className="text-white" weight="bold" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">IPPEL Equipamentos</h1>
              <p className="text-sm text-muted-foreground">Controle de TI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={onNewPurchase}
              variant="outline"
              className="hidden sm:flex items-center gap-2"
            >
              <Plus size={16} />
              Nova Solicitação
            </Button>
            <Button
              onClick={onAddEquipment}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Adicionar Equipamento</span>
              <span className="sm:hidden">Adicionar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}