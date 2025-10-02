import { useEffect, useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bell, Calendar, CheckCircle, X, Clock } from "@phosphor-icons/react"
import { toast } from "sonner"

interface Reminder {
  id: string
  date: string
  message: string
  acknowledged: boolean
  createdAt: string
}

export function ReminderSystem() {
  const [reminders, setReminders] = useKV<Reminder[]>("monthly-reminders", [])
  const [showDialog, setShowDialog] = useState(false)
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null)

  // Verifica se hoje é dia 20 e cria lembrete se necessário
  useEffect(() => {
    const checkAndCreateReminder = () => {
      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth()
      const year = today.getFullYear()
      
      // Só executa no dia 20
      if (day === 20) {
        const reminderDate = `${year}-${String(month + 1).padStart(2, '0')}-20`
        const existingReminder = (reminders || []).find(r => r.date === reminderDate)
        
        if (!existingReminder) {
          const newReminder: Reminder = {
            id: Date.now().toString(),
            date: reminderDate,
            message: "Hoje é dia 20! Hora de revisar os equipamentos de TI e verificar se há necessidade de novas solicitações de compra.",
            acknowledged: false,
            createdAt: new Date().toISOString()
          }
          
          setReminders(currentReminders => [...(currentReminders || []), newReminder])
          setCurrentReminder(newReminder)
          setShowDialog(true)
          toast.info("🔔 Lembrete Mensal", {
            description: "Dia 20 - Hora de revisar os equipamentos!"
          })
        } else if (!existingReminder.acknowledged) {
          setCurrentReminder(existingReminder)
          setShowDialog(true)
        }
      }
    }

    // Verifica imediatamente
    checkAndCreateReminder()
    
    // Verifica a cada hora para capturar mudanças de dia
    const interval = setInterval(checkAndCreateReminder, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [reminders, setReminders])

  const acknowledgeReminder = (reminderId: string) => {
    setReminders(currentReminders =>
      (currentReminders || []).map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, acknowledged: true }
          : reminder
      )
    )
    setShowDialog(false)
    setCurrentReminder(null)
    toast.success("✅ Lembrete confirmado!")
  }

  const deleteReminder = (reminderId: string) => {
    setReminders(currentReminders =>
      (currentReminders || []).filter(reminder => reminder.id !== reminderId)
    )
    toast.success("Lembrete removido!")
  }

  const getPendingReminders = () => {
    return (reminders || []).filter(r => !r.acknowledged)
  }

  const getRecentReminders = () => {
    return (reminders || [])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const getNextReminderDate = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const currentDay = today.getDate()
    
    let nextMonth = currentMonth
    let nextYear = currentYear
    
    if (currentDay >= 20) {
      nextMonth = currentMonth + 1
      if (nextMonth > 11) {
        nextMonth = 0
        nextYear = currentYear + 1
      }
    }
    
    const nextDate = new Date(nextYear, nextMonth, 20)
    return nextDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long'
    })
  }

  const pendingReminders = getPendingReminders()
  const recentReminders = getRecentReminders()

  return (
    <>
      <div className="space-y-6">
        {/* Card de Status dos Lembretes */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5 text-primary" />
                Sistema de Lembretes
              </CardTitle>
              <CardDescription>
                Lembretes automáticos todo dia 20
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Próximo lembrete:</span>
                  <Badge variant="outline" className="text-primary">
                    {getNextReminderDate()}
                  </Badge>
                </div>
                {pendingReminders.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pendentes:</span>
                    <Badge variant="destructive">
                      {pendingReminders.length}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-accent" />
                Estatísticas
              </CardTitle>
              <CardDescription>
                Histórico de lembretes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de lembretes:</span>
                  <span className="font-medium">{(reminders || []).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confirmados:</span>
                  <span className="font-medium text-green-600">
                    {(reminders || []).filter(r => r.acknowledged).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lembretes Pendentes */}
        {pendingReminders.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Bell className="h-5 w-5" />
                Lembretes Pendentes
              </CardTitle>
              <CardDescription>
                {pendingReminders.length} lembrete(s) aguardando confirmação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-start justify-between p-4 bg-white rounded-lg border border-orange-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-sm">
                        {formatDate(reminder.date)}
                      </span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        Dia 20
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{reminder.message}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => acknowledgeReminder(reminder.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Histórico Recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Histórico Recente
            </CardTitle>
            <CardDescription>
              {recentReminders.length > 0 ? "Últimos lembretes registrados" : "Nenhum lembrete ainda"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentReminders.length > 0 ? (
              <div className="space-y-3">
                {recentReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {reminder.acknowledged ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Bell className="h-4 w-4 text-orange-600" />
                      )}
                      <div>
                        <span className="text-sm font-medium">
                          {formatDate(reminder.date)}
                        </span>
                        <Badge 
                          variant={reminder.acknowledged ? "default" : "secondary"}
                          className={`ml-2 ${reminder.acknowledged ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                        >
                          {reminder.acknowledged ? "Confirmado" : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Nenhum lembrete ainda</p>
                <p className="text-sm text-gray-400">
                  O sistema criará automaticamente um lembrete todo dia 20 do mês
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog de Lembrete */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-600" />
              🔔 Lembrete Mensal
            </DialogTitle>
            <DialogDescription>
              {currentReminder && formatDate(currentReminder.date)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Calendar className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium text-orange-900 mb-1">
                  Hoje é dia 20!
                </p>
                <p className="text-sm text-orange-700">
                  {currentReminder?.message}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Fechar
            </Button>
            <Button 
              onClick={() => currentReminder && acknowledgeReminder(currentReminder.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}