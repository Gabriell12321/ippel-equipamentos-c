import { Desktop, ShoppingCart, Clock, Wrench, TrendUp, Calendar, Warning } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DashboardStatsProps {
  totalEquipments: number
  totalPurchases: number
  highPriorityPurchases: number
  inMaintenanceCount: number
}

export function DashboardStats({ 
  totalEquipments, 
  totalPurchases, 
  highPriorityPurchases, 
  inMaintenanceCount 
}: DashboardStatsProps) {
  const activeEquipments = totalEquipments - inMaintenanceCount
  const maintenancePercentage = totalEquipments > 0 ? (inMaintenanceCount / totalEquipments) * 100 : 0
  const priorityPercentage = totalPurchases > 0 ? (highPriorityPurchases / totalPurchases) * 100 : 0

  const stats = [
    {
      title: "Equipamentos Ativos",
      value: activeEquipments,
      total: totalEquipments,
      subtitle: `${totalEquipments} total`,
      icon: Desktop,
      color: "text-success",
      bgColor: "bg-success/10",
      progress: totalEquipments > 0 ? (activeEquipments / totalEquipments) * 100 : 0,
      trend: "+12% este mês"
    },
    {
      title: "Solicitações Pendentes",
      value: totalPurchases,
      subtitle: totalPurchases === 1 ? "solicitação" : "solicitações",
      icon: ShoppingCart,
      color: "text-primary",
      bgColor: "bg-primary/10",
      showBadge: totalPurchases > 0,
      trend: totalPurchases > 5 ? "Alto volume" : "Normal"
    },
    {
      title: "Prioridade Alta",
      value: highPriorityPurchases,
      total: totalPurchases,
      subtitle: `${Math.round(priorityPercentage)}% do total`,
      icon: Warning,
      color: "text-warning",
      bgColor: "bg-warning/10",
      progress: priorityPercentage,
      urgent: highPriorityPurchases > 3
    },
    {
      title: "Em Manutenção",
      value: inMaintenanceCount,
      total: totalEquipments,
      subtitle: `${Math.round(maintenancePercentage)}% do total`,
      icon: Wrench,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      progress: maintenancePercentage,
      alert: maintenancePercentage > 20
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card 
              key={index} 
              className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 ${
                stat.urgent || stat.alert ? 'border-l-destructive bg-destructive/5' : 
                stat.showBadge ? 'border-l-primary bg-primary/5' :
                'border-l-muted'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  {(stat.urgent || stat.alert) && (
                    <Badge variant="destructive" className="text-xs px-2 py-0">
                      Atenção
                    </Badge>
                  )}
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={20} className={stat.color} weight="bold" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  {stat.total && (
                    <div className="text-lg text-muted-foreground mb-1">
                      /{stat.total}
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {stat.subtitle}
                </div>
                
                {stat.progress !== undefined && (
                  <div className="space-y-1">
                    <Progress 
                      value={stat.progress} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {stat.trend && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendUp size={12} />
                    {stat.trend}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Última atualização</span>
                <span className="font-medium">Hoje, 14:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Novos equipamentos</span>
                <Badge variant="secondary">+3 esta semana</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Solicitações aprovadas</span>
                <Badge variant="secondary" className="bg-success/10 text-success">+2 hoje</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendUp size={16} className="text-success" />
              Indicadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Disponibilidade</span>
                <div className="flex items-center gap-2">
                  <Progress value={88} className="w-16 h-2" />
                  <span className="font-medium">88%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tempo médio reparo</span>
                <span className="font-medium">2.5 dias</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Eficiência</span>
                <Badge className="bg-success text-success-foreground">Excelente</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock size={16} className="text-warning" />
              Próximas Ações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {inMaintenanceCount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Revisar manutenções</span>
                  <Badge variant="outline" className="text-warning border-warning">
                    {inMaintenanceCount} pendente{inMaintenanceCount !== 1 ? 's' : ''}
                  </Badge>
                </div>
              )}
              {highPriorityPurchases > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Aprovar prioridades</span>
                  <Badge variant="outline" className="text-destructive border-destructive">
                    {highPriorityPurchases} urgente{highPriorityPurchases !== 1 ? 's' : ''}
                  </Badge>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lembrete mensal</span>
                <Badge variant="secondary">Dia 20</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}