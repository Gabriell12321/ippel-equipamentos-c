import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

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

  const equipmentTypes = [
    "Desktop",
    "Notebook",
    "Monitor",
    "Impressora",
    "Scanner",
    "Servidor",
    "Switch",
    "Roteador",
    "Access Point",
    "Tablet",
    "Smartphone",
    "Projetor",
    "Webcam",
    "Headset",
    "Outros"
  ]

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
                <SelectContent>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
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