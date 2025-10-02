import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Toaster } from "@/components/ui/sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/Header"
import { DashboardStats } from "@/components/DashboardStats"
import { EquipmentList } from "@/components/EquipmentList"
import { EquipmentDialog, type Equipment } from "@/components/EquipmentDialog"
import { PurchaseList } from "@/components/PurchaseList"
import { PurchaseDialog, type PurchaseRequest } from "@/components/PurchaseDialog"
import { ReminderSystem } from "@/components/ReminderSystem"
import { NetworkScanner } from "@/components/NetworkScanner"
import { toast } from "sonner"

function App() {
  const [equipments, setEquipments] = useKV<Equipment[]>("equipments", [])
  const [purchaseRequests, setPurchaseRequests] = useKV<PurchaseRequest[]>("purchaseRequests", [])
  
  const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false)
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | undefined>(undefined)

  const handleSaveEquipment = (equipmentData: Omit<Equipment, "id">) => {
    if (editingEquipment) {
      setEquipments(currentEquipments => 
        (currentEquipments || []).map(eq => 
          eq.id === editingEquipment.id 
            ? { ...equipmentData, id: editingEquipment.id }
            : eq
        )
      )
      setEditingEquipment(undefined)
      toast.success("Equipamento atualizado com sucesso!")
    } else {
      const newEquipment: Equipment = {
        ...equipmentData,
        id: Date.now().toString()
      }
      setEquipments(currentEquipments => [...(currentEquipments || []), newEquipment])
      toast.success("Equipamento cadastrado com sucesso!")
    }
  }

  const handleEditEquipment = (equipment: Equipment) => {
    setEditingEquipment(equipment)
    setEquipmentDialogOpen(true)
  }

  const handleDeleteEquipment = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.")) {
      setEquipments(currentEquipments => (currentEquipments || []).filter(eq => eq.id !== id))
      toast.success("Equipamento removido com sucesso!")
    }
  }

  const handleSavePurchaseRequest = (requestData: Omit<PurchaseRequest, "id" | "requestDate">) => {
    const newRequest: PurchaseRequest = {
      ...requestData,
      id: Date.now().toString(),
      requestDate: new Date().toISOString()
    }
    setPurchaseRequests(currentRequests => [...(currentRequests || []), newRequest])
    toast.success("Solicitação de compra criada com sucesso!")
  }

  const handleDeletePurchaseRequest = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta solicitação? Esta ação não pode ser desfeita.")) {
      setPurchaseRequests(currentRequests => (currentRequests || []).filter(req => req.id !== id))
      toast.success("Solicitação removida com sucesso!")
    }
  }

  const stats = {
    totalEquipments: (equipments || []).length,
    totalPurchases: (purchaseRequests || []).length,
    highPriorityPurchases: (purchaseRequests || []).filter(req => req.priority === "high").length,
    inMaintenanceCount: (equipments || []).filter(eq => eq.status === "maintenance").length
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onAddEquipment={() => {
          setEditingEquipment(undefined)
          setEquipmentDialogOpen(true)
        }}
        onNewPurchase={() => setPurchaseDialogOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Painel de Controle
          </h2>
          <p className="text-muted-foreground">
            Visão geral dos equipamentos e solicitações de TI
          </p>
        </div>
        
        <DashboardStats {...stats} />
        
        <Tabs defaultValue="equipments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:max-w-2xl mx-auto bg-muted/50">
            <TabsTrigger value="equipments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Equipamentos
            </TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Solicitações
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Rede
            </TabsTrigger>
            <TabsTrigger value="reminders" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Lembretes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="equipments" className="space-y-6">
            <EquipmentList 
              equipments={equipments || []}
              onEdit={handleEditEquipment}
              onDelete={handleDeleteEquipment}
            />
          </TabsContent>
          
          <TabsContent value="purchases" className="space-y-6">
            <PurchaseList 
              requests={purchaseRequests || []}
              onDelete={handleDeletePurchaseRequest}
            />
          </TabsContent>
          
          <TabsContent value="network" className="space-y-6">
            <NetworkScanner />
          </TabsContent>
          
          <TabsContent value="reminders" className="space-y-6">
            <ReminderSystem />
          </TabsContent>
        </Tabs>
      </main>
      
      <EquipmentDialog
        open={equipmentDialogOpen}
        onOpenChange={setEquipmentDialogOpen}
        onSave={handleSaveEquipment}
        equipment={editingEquipment}
      />
      
      <PurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        onSave={handleSavePurchaseRequest}
      />
      
      <Toaster 
        position="top-right" 
        expand={false}
        toastOptions={{
          duration: 4000,
        }}
      />
    </div>
  )
}

export default App