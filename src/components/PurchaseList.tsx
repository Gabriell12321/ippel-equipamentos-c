import { useState } from "react"
import { Clock, CheckCircle, X, MagnifyingGlass } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getEquipmentIcon, getEquipmentTypeLabel } from "@/lib/equipment-icons"
import type { PurchaseRequest } from "./PurchaseDialog"

interface PurchaseListProps {
  requests: PurchaseRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function PurchaseList({ requests, onApprove, onReject }: PurchaseListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requester.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: PurchaseRequest["status"]) => {
    const statusConfig = {
      pending: { label: "Pendente", className: "bg-orange-500 text-white", icon: Clock },
      approved: { label: "Aprovado", className: "bg-accent text-accent-foreground", icon: CheckCircle },
      rejected: { label: "Rejeitado", className: "bg-destructive text-destructive-foreground", icon: X }
    }
    
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <Icon size={12} />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: PurchaseRequest["priority"]) => {
    const priorityConfig = {
      low: { label: "Baixa", className: "bg-green-100 text-green-800" },
      medium: { label: "Média", className: "bg-orange-100 text-orange-800" },
      high: { label: "Alta", className: "bg-red-100 text-red-800" }
    }
    
    const config = priorityConfig[priority]
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar solicitações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlass size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {requests.length === 0 ? "Nenhuma solicitação encontrada" : "Nenhuma solicitação encontrada"}
          </h3>
          <p className="text-muted-foreground">
            {requests.length === 0 
              ? "Quando houver solicitações de compra, elas aparecerão aqui." 
              : "Tente ajustar os filtros ou termo de busca."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground mb-1">
                      {request.equipmentName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      {getEquipmentIcon(request.type)}
                      {getEquipmentTypeLabel(request.type)} • {request.quantity} unidade(s)
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {getStatusBadge(request.status)}
                    {getPriorityBadge(request.priority)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Solicitante:</span>
                    <span className="font-medium">{request.requester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data:</span>
                    <span>{new Date(request.requestDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {request.estimatedPrice && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Preço estimado:</span>
                      <span className="font-medium">R$ {request.estimatedPrice}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-foreground">
                    <span className="font-medium text-muted-foreground">Justificativa:</span>
                  </p>
                  <p className="text-sm mt-1">{request.justification}</p>
                </div>
                
                {request.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => onApprove(request.id)}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <CheckCircle size={16} />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReject(request.id)}
                      className="flex-1 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X size={16} />
                      Rejeitar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}