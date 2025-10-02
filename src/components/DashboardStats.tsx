import { Desktop, ShoppingCart, CheckCircle, Clock } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStatsProps {
  totalEquipments: number
  pendingPurchases: number
  approvedPurchases: number
  inMaintenanceCount: number
}

export function DashboardStats({ 
  totalEquipments, 
  pendingPurchases, 
  approvedPurchases, 
  inMaintenanceCount 
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total de Equipamentos",
      value: totalEquipments,
      icon: Desktop,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Solicitações Pendentes",
      value: pendingPurchases,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Compras Aprovadas",
      value: approvedPurchases,
      icon: CheckCircle,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Em Manutenção",
      value: inMaintenanceCount,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon size={16} className={stat.color} weight="bold" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}