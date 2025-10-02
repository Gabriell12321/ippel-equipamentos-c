import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getEquipmentIcon } from "@/lib/equipment-icons"
import { toast } from "sonner"
import { 
  Monitor, 
  Desktop, 
  HardDrive, 
  Circle, 
  GraphicsCard, 
  Lightning, 
  Keyboard, 
  Mouse, 
  Usb, 
  Gear, 
  Plug, 
  Wrench, 
  Laptop,
  Globe,
  WifiHigh,
  SpeakerHigh,
  Camera,
  Printer,
  FilePdf,
  Database,
  DeviceTablet,
  Phone,
  ProjectorScreen,
  Headphones,
  ShieldCheck,
  Cpu,
  Fan,
  Package
} from "@phosphor-icons/react"

export interface PurchaseRequest {
  id: string
  equipmentName: string
  type: string
  quantity: number
  estimatedPrice: string
  justification: string
  priority: "low" | "medium" | "high"
  status: "pending" | "approved" | "rejected"
  requestDate: string
  requester: string
}

interface PurchaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (request: Omit<PurchaseRequest, "id" | "status" | "requestDate">) => void
}

export function PurchaseDialog({ open, onOpenChange, onSave }: PurchaseDialogProps) {
  const [formData, setFormData] = useState<Omit<PurchaseRequest, "id" | "status" | "requestDate">>({
    equipmentName: "",
    type: "",
    quantity: 1,
    estimatedPrice: "",
    justification: "",
    priority: "medium",
    requester: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.equipmentName || !formData.type || !formData.justification || !formData.requester) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    onSave(formData)
    onOpenChange(false)
    toast.success("Solicitação de compra criada!")
    
    setFormData({
      equipmentName: "",
      type: "",
      quantity: 1,
      estimatedPrice: "",
      justification: "",
      priority: "medium",
      requester: ""
    })
  }

  const equipmentCategories = [
    {
      category: "Computadores e Componentes",
      icon: <Desktop className="w-4 h-4" />,
      items: [
        { value: "desktop", label: "Desktop", icon: <Desktop className="w-4 h-4" /> },
        { value: "notebook", label: "Notebook", icon: <Laptop className="w-4 h-4" /> },
        { value: "memoria-ram", label: "Memória RAM", icon: <Circle className="w-4 h-4" /> },
        { value: "ssd", label: "SSD", icon: <HardDrive className="w-4 h-4" /> },
        { value: "hd", label: "HD", icon: <HardDrive className="w-4 h-4" /> },
        { value: "placa-video", label: "Placa de Vídeo", icon: <GraphicsCard className="w-4 h-4" /> },
        { value: "fonte", label: "Fonte de Alimentação", icon: <Lightning className="w-4 h-4" /> },
        { value: "placa-rede", label: "Placa de Rede", icon: <Globe className="w-4 h-4" /> },
        { value: "processador", label: "Processador", icon: <Cpu className="w-4 h-4" /> }
      ]
    },
    {
      category: "Monitores e Acessórios",
      icon: <Monitor className="w-4 h-4" />,
      items: [
        { value: "monitor", label: "Monitor", icon: <Monitor className="w-4 h-4" /> },
        { value: "suporte-monitor", label: "Suporte para Monitor", icon: <Gear className="w-4 h-4" /> }
      ]
    },
    {
      category: "Cabos de Vídeo",
      icon: <Gear className="w-4 h-4" />,
      items: [
        { value: "cabo-hdmi", label: "Cabo HDMI", icon: <Gear className="w-4 h-4" /> },
        { value: "cabo-displayport", label: "Cabo DisplayPort", icon: <Gear className="w-4 h-4" /> },
        { value: "cabo-vga", label: "Cabo VGA", icon: <Gear className="w-4 h-4" /> },
        { value: "cabo-dvi", label: "Cabo DVI", icon: <Gear className="w-4 h-4" /> }
      ]
    },
    {
      category: "Adaptadores de Vídeo",
      icon: <Plug className="w-4 h-4" />,
      items: [
        { value: "hdmi-vga", label: "HDMI para VGA", icon: <Plug className="w-4 h-4" /> },
        { value: "vga-hdmi", label: "VGA para HDMI", icon: <Plug className="w-4 h-4" /> },
        { value: "displayport-hdmi", label: "DisplayPort para HDMI", icon: <Plug className="w-4 h-4" /> },
        { value: "displayport-vga", label: "DisplayPort para VGA", icon: <Plug className="w-4 h-4" /> },
        { value: "usbc-hdmi", label: "USB-C para HDMI", icon: <Plug className="w-4 h-4" /> },
        { value: "dvi-hdmi", label: "DVI para HDMI", icon: <Plug className="w-4 h-4" /> }
      ]
    },
    {
      category: "Periféricos",
      icon: <Keyboard className="w-4 h-4" />,
      items: [
        { value: "teclado", label: "Teclado", icon: <Keyboard className="w-4 h-4" /> },
        { value: "mouse", label: "Mouse", icon: <Mouse className="w-4 h-4" /> },
        { value: "mousepad", label: "Mousepad", icon: <Circle className="w-4 h-4" /> },
        { value: "webcam", label: "Webcam", icon: <Camera className="w-4 h-4" /> },
        { value: "headset", label: "Headset", icon: <Headphones className="w-4 h-4" /> },
        { value: "caixa-som", label: "Caixa de Som", icon: <SpeakerHigh className="w-4 h-4" /> }
      ]
    },
    {
      category: "Armazenamento e Mídias",
      icon: <HardDrive className="w-4 h-4" />,
      items: [
        { value: "pendrive", label: "Pendrive", icon: <Usb className="w-4 h-4" /> },
        { value: "cartao-memoria", label: "Cartão de Memória", icon: <Circle className="w-4 h-4" /> },
        { value: "hd-externo", label: "HD Externo", icon: <HardDrive className="w-4 h-4" /> },
        { value: "ssd-externo", label: "SSD Externo", icon: <HardDrive className="w-4 h-4" /> }
      ]
    },
    {
      category: "Rede e Conectividade",
      icon: <Globe className="w-4 h-4" />,
      items: [
        { value: "switch", label: "Switch de Rede", icon: <Globe className="w-4 h-4" /> },
        { value: "access-point", label: "Access Point", icon: <WifiHigh className="w-4 h-4" /> },
        { value: "repetidor-wifi", label: "Repetidor Wi-Fi", icon: <WifiHigh className="w-4 h-4" /> },
        { value: "roteador", label: "Roteador", icon: <Globe className="w-4 h-4" /> }
      ]
    },
    {
      category: "Cabos e Conectores",
      icon: <Gear className="w-4 h-4" />,
      items: [
        { value: "cabo-rede", label: "Cabo de Rede RJ-45", icon: <Gear className="w-4 h-4" /> },
        { value: "conector-rj45", label: "Conector RJ-45", icon: <Gear className="w-4 h-4" /> },
        { value: "patch-panel", label: "Patch Panel", icon: <Gear className="w-4 h-4" /> },
        { value: "usb-ethernet", label: "Adaptador USB Ethernet", icon: <Usb className="w-4 h-4" /> },
        { value: "extensor-sinal", label: "Extensor de Sinal", icon: <Gear className="w-4 h-4" /> }
      ]
    },
    {
      category: "Energia e Manutenção",
      icon: <Lightning className="w-4 h-4" />,
      items: [
        { value: "nobreak", label: "Nobreak", icon: <Lightning className="w-4 h-4" /> },
        { value: "estabilizador", label: "Estabilizador", icon: <Lightning className="w-4 h-4" /> },
        { value: "filtro-linha", label: "Filtro de Linha", icon: <Plug className="w-4 h-4" /> }
      ]
    },
    {
      category: "Ferramentas e Manutenção",
      icon: <Wrench className="w-4 h-4" />,
      items: [
        { value: "kit-chaves", label: "Kit de Chaves para PC", icon: <Wrench className="w-4 h-4" /> },
        { value: "pasta-termica", label: "Pasta Térmica", icon: <Circle className="w-4 h-4" /> },
        { value: "spray-limpeza", label: "Spray de Limpeza", icon: <Circle className="w-4 h-4" /> },
        { value: "alcool-isopropilico", label: "Álcool Isopropílico", icon: <Circle className="w-4 h-4" /> },
        { value: "escova-antiestatica", label: "Escova Antiestática", icon: <Wrench className="w-4 h-4" /> }
      ]
    },
    {
      category: "Diversos",
      icon: <Package className="w-4 h-4" />,
      items: [
        { value: "suporte-notebook", label: "Suporte para Notebook", icon: <Laptop className="w-4 h-4" /> },
        { value: "dock-station", label: "Dock Station", icon: <Gear className="w-4 h-4" /> },
        { value: "hub-usb", label: "Hub USB", icon: <Usb className="w-4 h-4" /> },
        { value: "cooler-notebook", label: "Cooler para Notebook", icon: <Fan className="w-4 h-4" /> },
        { value: "antena-wifi-usb", label: "Antena Wi-Fi USB", icon: <WifiHigh className="w-4 h-4" /> },
        { value: "limpa-tela", label: "Limpa Tela", icon: <Circle className="w-4 h-4" /> },
        { value: "impressora", label: "Impressora", icon: <Printer className="w-4 h-4" /> },
        { value: "scanner", label: "Scanner", icon: <FilePdf className="w-4 h-4" /> },
        { value: "projetor", label: "Projetor", icon: <ProjectorScreen className="w-4 h-4" /> },
        { value: "tablet", label: "Tablet", icon: <DeviceTablet className="w-4 h-4" /> },
        { value: "smartphone", label: "Smartphone", icon: <Phone className="w-4 h-4" /> },
        { value: "servidor", label: "Servidor", icon: <Database className="w-4 h-4" /> }
      ]
    }
  ]

  const priorityOptions = [
    { value: "low", label: "Baixa", color: "text-green-600" },
    { value: "medium", label: "Média", color: "text-orange-600" },
    { value: "high", label: "Alta", color: "text-red-600" }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Nova Solicitação de Compra
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="equipmentName">Nome do Equipamento *</Label>
              <Input
                id="equipmentName"
                value={formData.equipmentName}
                onChange={(e) => setFormData(prev => ({ ...prev, equipmentName: e.target.value }))}
                placeholder="Ex: Desktop Dell OptiPlex"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {equipmentCategories.map((category) => (
                    <div key={category.category}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground bg-muted/50 flex items-center gap-2">
                        {category.icon}
                        {category.category}
                      </div>
                      {category.items.map((item) => (
                        <SelectItem key={item.value} value={item.value} className="pl-6">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.label}
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="estimatedPrice">Preço Estimado (R$)</Label>
              <Input
                id="estimatedPrice"
                value={formData.estimatedPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedPrice: e.target.value }))}
                placeholder="Ex: 2.500,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className={option.color}>{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requester">Solicitante *</Label>
              <Input
                id="requester"
                value={formData.requester}
                onChange={(e) => setFormData(prev => ({ ...prev, requester: e.target.value }))}
                placeholder="Nome do solicitante"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Justificativa *</Label>
            <Textarea
              id="justification"
              value={formData.justification}
              onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
              placeholder="Descreva a necessidade e justificativa para a compra..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
            >
              Criar Solicitação
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}