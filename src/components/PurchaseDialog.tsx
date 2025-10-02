import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { equipmentTypes, type EquipmentType } from "@/lib/equipment-icons"
import { toast } from "sonner"

export interface PurchaseRequest {
  id: string
  equipmentName: string
  type: EquipmentType
  quantity: number
  estimatedPrice: string
  justification: string
  priority: "low" | "medium" | "high"
  requestDate: string
  requester: string
}

interface PurchaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (request: Omit<PurchaseRequest, "id" | "requestDate">) => void
}

export function PurchaseDialog({ open, onOpenChange, onSave }: PurchaseDialogProps) {
  const [formData, setFormData] = useState<Omit<PurchaseRequest, "id" | "requestDate">>({
    equipmentName: "",
    type: "other",
    quantity: 1,
    estimatedPrice: "",
    justification: "",
    priority: "medium",
    requester: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.equipmentName || !formData.justification) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    onSave(formData)
    onOpenChange(false)
    toast.success("Solicitação de compra criada!")
    
    setFormData({
      equipmentName: "",
      type: "other",
      quantity: 1,
      estimatedPrice: "",
      justification: "",
      priority: "medium",
      requester: ""
    })
  }

  const priorityOptions = [
    { value: "low", label: "Baixa", color: "bg-blue-500" },
    { value: "medium", label: "Média", color: "bg-yellow-500" },
    { value: "high", label: "Alta", color: "bg-red-500" }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
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
                placeholder="Ex: Monitor 24'' Dell"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value: EquipmentType) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="estimatedPrice">Preço Estimado</Label>
              <Input
                id="estimatedPrice"
                value={formData.estimatedPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedPrice: e.target.value }))}
                placeholder="Ex: R$ 800,00"
              />
            </div>
            
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

          <div className="space-y-2">
            <Label htmlFor="requester">Solicitante</Label>
            <Input
              id="requester"
              value={formData.requester}
              onChange={(e) => setFormData(prev => ({ ...prev, requester: e.target.value }))}
              placeholder="Nome do solicitante"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Justificativa *</Label>
            <Textarea
              id="justification"
              value={formData.justification}
              onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
              placeholder="Descreva a necessidade e justificativa para esta compra..."
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