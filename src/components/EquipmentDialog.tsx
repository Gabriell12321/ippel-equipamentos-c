import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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

export interface Equipment {
  id: string
  name: string
  type: string
  brand: string
  model: string
  serialNumber: string
  status: "active" | "maintenance" | "inactive"
  location: string
  purchaseDate: string
  warranty: string
  notes?: string
}

interface EquipmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (equipment: Omit<Equipment, "id">) => void
  equipment?: Equipment
}

export function EquipmentDialog({ open, onOpenChange, onSave, equipment }: EquipmentDialogProps) {
  const [formData, setFormData] = useState<Omit<Equipment, "id">>({
    name: equipment?.name || "",
    type: equipment?.type || "",
    brand: equipment?.brand || "",
    model: equipment?.model || "",
    serialNumber: equipment?.serialNumber || "",
    status: equipment?.status || "active",
    location: equipment?.location || "",
    purchaseDate: equipment?.purchaseDate || "",
    warranty: equipment?.warranty || "",
    notes: equipment?.notes || ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.type || !formData.serialNumber) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    onSave(formData)
    onOpenChange(false)
    toast.success(equipment ? "Equipamento atualizado!" : "Equipamento cadastrado!")
    
    if (!equipment) {
      setFormData({
        name: "",
        type: "",
        brand: "",
        model: "",
        serialNumber: "",
        status: "active",
        location: "",
        purchaseDate: "",
        warranty: "",
        notes: ""
      })
    }
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

  // Create flat list of all equipment types for the select
  const allEquipmentTypes = equipmentCategories.flatMap(category => 
    category.items.map(item => ({
      ...item,
      categoryName: category.category
    }))
  )

  const statusOptions = [
    { value: "active", label: "Ativo", color: "bg-accent" },
    { value: "maintenance", label: "Manutenção", color: "bg-orange-500" },
    { value: "inactive", label: "Inativo", color: "bg-gray-500" }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {equipment ? "Editar Equipamento" : "Adicionar Novo Equipamento"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Equipamento *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Desktop Administrativo 01"
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
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                placeholder="Ex: Dell, HP, Lenovo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                placeholder="Ex: OptiPlex 7090"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Número de Série *</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                placeholder="Ex: ABC123456789"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "maintenance" | "inactive") => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${option.color}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Ex: Sala 201, TI"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Data de Compra</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="warranty">Garantia</Label>
            <Input
              id="warranty"
              value={formData.warranty}
              onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
              placeholder="Ex: 3 anos, até 15/12/2026"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Informações adicionais sobre o equipamento..."
              rows={3}
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
              {equipment ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}