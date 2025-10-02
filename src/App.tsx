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
    } else {
      const newEquipment: Equipment = {
        ...equipmentData,
        id: Date.now().toString()
      }
      setEquipments(currentEquipments => [...(currentEquipments || []), newEquipment])
    }
  }

  const handleEditEquipment = (equipment: Equipment) => {
    setEditingEquipment(equipment)
    setEquipmentDialogOpen(true)
  }

  const handleDeleteEquipment = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este equipamento?")) {
      setEquipments(currentEquipments => (currentEquipments || []).filter(eq => eq.id !== id))
      toast.success("Equipamento removido!")
    }
  }

  const handleSavePurchaseRequest = (requestData: Omit<PurchaseRequest, "id" | "status" | "requestDate">) => {
    const newRequest: PurchaseRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: "pending",
      requestDate: new Date().toISOString()
    }
    setPurchaseRequests(currentRequests => [...(currentRequests || []), newRequest])
    toast.success("Solicitação de compra criada!")
  }

  const handleApprovePurchase = (id: string) => {
    setPurchaseRequests(currentRequests =>
      (currentRequests || []).map(req =>
        req.id === id ? { ...req, status: "approved" as const } : req
      )
    )
    toast.success("Solicitação aprovada!")
  }

  const handleRejectPurchase = (id: string) => {
    setPurchaseRequests(currentRequests =>
      (currentRequests || []).map(req =>
        req.id === id ? { ...req, status: "rejected" as const } : req
      )
    )
    toast.success("Solicitação rejeitada!")
  }

  const stats = {
    totalEquipments: (equipments || []).length,
    pendingPurchases: (purchaseRequests || []).filter(req => req.status === "pending").length,
    approvedPurchases: (purchaseRequests || []).filter(req => req.status === "approved").length,
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardStats {...stats} />
        
        <Tabs defaultValue="equipments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:max-w-lg mx-auto">
            <TabsTrigger value="equipments">Equipamentos</TabsTrigger>
            <TabsTrigger value="purchases">Solicitações</TabsTrigger>
            <TabsTrigger value="reminders">Lembretes</TabsTrigger>
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
              onApprove={handleApprovePurchase}
              onReject={handleRejectPurchase}
            />
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
      
      <Toaster />
    </div>
  )
}

export default App