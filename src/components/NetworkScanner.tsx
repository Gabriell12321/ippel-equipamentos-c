import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CircleNotch, Network, Plus, Trash, WifiHigh, WifiX, Monitor, Printer, DeviceMobile, Desktop } from "@phosphor-icons/react"
import { toast } from "sonner"

export interface NetworkDevice {
  id: string
  ip: string
  hostname?: string
  mac?: string
  status: "online" | "offline" | "unknown"
  lastSeen: string
  deviceType?: "computer" | "printer" | "router" | "mobile" | "server" | "unknown"
  notes?: string
}

export function NetworkScanner() {
  const [devices, setDevices] = useKV<NetworkDevice[]>("network-devices", [])
  const [isScanning, setIsScanning] = useState(false)
  const [scanRange, setScanRange] = useState("192.168.1")
  const [manualIp, setManualIp] = useState("")

  // Função para verificar se um IP está online usando WebRTC para detectar dispositivos locais
  const checkIpStatus = async (ip: string): Promise<"online" | "offline"> => {
    try {
      // Para a web, vamos usar uma simulação baseada em patterns comuns de rede
      // Em um ambiente real, isso seria feito via ping ou ferramentas de rede específicas
      
      // Simula latência de rede real
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
      
      // IPs comuns que geralmente estão online em redes locais
      const commonActiveIps = [
        '.1',   // Gateway
        '.254', // Gateway alternativo
        '.100', // Computadores
        '.101',
        '.102',
        '.200', // Dispositivos estáticos
        '.201',
        '.202'
      ]
      
      const lastOctet = ip.split('.').pop()
      
      // Simula descoberta baseada em padrões comuns
      if (commonActiveIps.includes(`.${lastOctet}`)) {
        // 80% chance de estar online se for um IP comum
        return Math.random() > 0.2 ? "online" : "offline"
      } else {
        // 20% chance de estar online se for um IP não comum
        return Math.random() > 0.8 ? "online" : "offline"
      }
    } catch (error) {
      return "offline"
    }
  }

  // Função para tentar descobrir hostname (simulada para ambiente web)
  const getHostname = async (ip: string): Promise<string | undefined> => {
    // Em um ambiente web, vamos simular hostnames baseados no IP
    const lastOctet = parseInt(ip.split('.').pop() || '0')
    
    const deviceNames = [
      'DESKTOP-PC',
      'LAPTOP-USER',
      'SERVIDOR-MAIN',
      'IMPRESSORA-HP',
      'ROUTER-TP',
      'NOTEBOOK-TI',
      'WORKSTATION',
      'SMARTPHONE',
      'TABLET-IPAD',
      'SMART-TV'
    ]
    
    // Simula hostname baseado no IP
    if (lastOctet === 1 || lastOctet === 254) {
      return 'ROUTER-GATEWAY'
    } else if (lastOctet >= 100 && lastOctet <= 110) {
      return deviceNames[lastOctet % deviceNames.length]
    } else if (lastOctet >= 200 && lastOctet <= 210) {
      return `DEVICE-${lastOctet}`
    }
    
    return undefined
  }

  // Função para escanear uma faixa de IPs
  const scanNetwork = async () => {
    if (!scanRange) {
      toast.error("Por favor, informe a faixa de rede para escanear")
      return
    }

    setIsScanning(true)
    const newDevices: NetworkDevice[] = []
    const promises: Promise<void>[] = []

    toast.info("Iniciando escaneamento da rede...")

    // Escaneia de .1 a .254 em batches para não sobrecarregar
    const batchSize = 20
    for (let batch = 0; batch < Math.ceil(254 / batchSize); batch++) {
      const batchPromises: Promise<void>[] = []
      
      for (let i = 1; i <= batchSize && (batch * batchSize + i) <= 254; i++) {
        const ipLastOctet = batch * batchSize + i
        const ip = `${scanRange}.${ipLastOctet}`
        
        const promise = checkIpStatus(ip).then(async (status) => {
          if (status === "online") {
            const hostname = await getHostname(ip)
            
            // Determina tipo do dispositivo baseado no IP e hostname
            let deviceType: NetworkDevice["deviceType"] = "unknown"
            if (hostname) {
              if (hostname.includes("ROUTER") || hostname.includes("GATEWAY")) {
                deviceType = "router"
              } else if (hostname.includes("DESKTOP") || hostname.includes("WORKSTATION")) {
                deviceType = "computer"
              } else if (hostname.includes("SERVIDOR") || hostname.includes("SERVER")) {
                deviceType = "server"
              } else if (hostname.includes("IMPRESSORA") || hostname.includes("PRINTER")) {
                deviceType = "printer"
              } else if (hostname.includes("SMARTPHONE") || hostname.includes("TABLET")) {
                deviceType = "mobile"
              }
            }
            
            const device: NetworkDevice = {
              id: `${ip}-${Date.now()}-${Math.random()}`,
              ip,
              hostname,
              status,
              lastSeen: new Date().toISOString(),
              deviceType
            }
            newDevices.push(device)
          }
        }).catch(() => {
          // Ignora erros silenciosamente
        })

        batchPromises.push(promise)
      }
      
      // Aguarda este batch completar antes de continuar
      await Promise.allSettled(batchPromises)
      
      // Pequena pausa entre batches
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Atualiza a lista de dispositivos
    setDevices(currentDevices => {
      const existingIps = new Set((currentDevices || []).map(d => d.ip))
      const devicesToAdd = newDevices.filter(d => !existingIps.has(d.ip))
      const updatedDevices = (currentDevices || []).map(device => {
        const foundDevice = newDevices.find(d => d.ip === device.ip)
        if (foundDevice) {
          return { ...device, status: foundDevice.status, lastSeen: foundDevice.lastSeen, hostname: foundDevice.hostname || device.hostname }
        }
        return { ...device, status: "offline" as const }
      })
      
      return [...updatedDevices, ...devicesToAdd]
    })

    setIsScanning(false)
    toast.success(`Escaneamento concluído! Encontrados ${newDevices.length} dispositivos online`)
  }

  // Função para adicionar IP manualmente
  const addManualDevice = async () => {
    if (!manualIp) {
      toast.error("Por favor, informe um IP válido")
      return
    }

    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
    if (!ipRegex.test(manualIp)) {
      toast.error("Formato de IP inválido")
      return
    }

    // Verifica se o IP já existe
    const existingDevice = (devices || []).find(d => d.ip === manualIp)
    if (existingDevice) {
      toast.error("Este IP já está na lista")
      return
    }

    const status = await checkIpStatus(manualIp)
    const hostname = await getHostname(manualIp)

    const newDevice: NetworkDevice = {
      id: `${manualIp}-${Date.now()}`,
      ip: manualIp,
      hostname,
      status,
      lastSeen: new Date().toISOString(),
      deviceType: "unknown"
    }

    setDevices(currentDevices => [...(currentDevices || []), newDevice])
    setManualIp("")
    toast.success("Dispositivo adicionado com sucesso!")
  }

  // Função para remover dispositivo
  const removeDevice = (id: string) => {
    if (confirm("Tem certeza que deseja remover este dispositivo?")) {
      setDevices(currentDevices => (currentDevices || []).filter(d => d.id !== id))
      toast.success("Dispositivo removido!")
    }
  }

  // Função para atualizar status de um dispositivo específico
  const refreshDevice = async (device: NetworkDevice) => {
    const status = await checkIpStatus(device.ip)
    setDevices(currentDevices => 
      (currentDevices || []).map(d => 
        d.id === device.id 
          ? { ...d, status, lastSeen: new Date().toISOString() }
          : d
      )
    )
    toast.success(`Status do dispositivo ${device.ip} atualizado`)
  }

  const getStatusIcon = (status: NetworkDevice["status"]) => {
    switch (status) {
      case "online":
        return <WifiHigh className="h-4 w-4 text-success" />
      case "offline":
        return <WifiX className="h-4 w-4 text-muted-foreground" />
      default:
        return <Network className="h-4 w-4 text-warning" />
    }
  }

  const getStatusBadge = (status: NetworkDevice["status"]) => {
    switch (status) {
      case "online":
        return <Badge variant="default" className="bg-success text-success-foreground">Online</Badge>
      case "offline":
        return <Badge variant="secondary">Offline</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getDeviceTypeIcon = (type?: NetworkDevice["deviceType"]) => {
    switch (type) {
      case "computer":
        return <Desktop className="h-4 w-4" />
      case "server":
        return <Monitor className="h-4 w-4" />
      case "router":
        return <Network className="h-4 w-4" />
      case "printer":
        return <Printer className="h-4 w-4" />
      case "mobile":
        return <DeviceMobile className="h-4 w-4" />
      default:
        return <Network className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Aviso sobre limitações */}
      <div className="bg-muted/50 border border-muted rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Network className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Escaneamento Simulado</p>
            <p className="text-xs text-muted-foreground">
              Este é um demo que simula descoberta de dispositivos na rede. 
              Em um ambiente real, seria necessário usar ferramentas específicas do sistema operacional.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Escaneamento de Rede
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scan-range">Faixa de Rede (ex: 192.168.1)</Label>
              <div className="flex gap-2">
                <Input
                  id="scan-range"
                  value={scanRange}
                  onChange={(e) => setScanRange(e.target.value)}
                  placeholder="192.168.1"
                  disabled={isScanning}
                />
                <Button 
                  onClick={scanNetwork} 
                  disabled={isScanning}
                  className="min-w-[120px]"
                >
                  {isScanning ? (
                    <>
                      <CircleNotch className="h-4 w-4 mr-2 animate-spin" />
                      Escaneando...
                    </>
                  ) : (
                    <>
                      <Network className="h-4 w-4 mr-2" />
                      Escanear
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Escaneará IPs de {scanRange}.1 até {scanRange}.254
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manual-ip">Adicionar IP Manualmente</Label>
              <div className="flex gap-2">
                <Input
                  id="manual-ip"
                  value={manualIp}
                  onChange={(e) => setManualIp(e.target.value)}
                  placeholder="192.168.1.100"
                />
                <Button onClick={addManualDevice} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Dispositivos Descobertos ({(devices || []).length})
          </CardTitle>
          {devices && devices.length > 0 && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Online: {devices.filter(d => d.status === "online").length}</span>
              <span>Offline: {devices.filter(d => d.status === "offline").length}</span>
              <span>Desconhecido: {devices.filter(d => d.status === "unknown").length}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!devices || devices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum dispositivo encontrado</p>
              <p className="text-sm">Execute um escaneamento ou adicione IPs manualmente</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {devices
                  .sort((a, b) => {
                    // Ordena por status (online primeiro), depois por IP
                    if (a.status !== b.status) {
                      return a.status === "online" ? -1 : 1
                    }
                    const aIP = parseInt(a.ip.split('.').pop() || '0')
                    const bIP = parseInt(b.ip.split('.').pop() || '0')
                    return aIP - bIP
                  })
                  .map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getDeviceTypeIcon(device.deviceType)}
                        {getStatusIcon(device.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{device.ip}</span>
                          {getStatusBadge(device.status)}
                          {device.deviceType && device.deviceType !== "unknown" && (
                            <Badge variant="outline" className="text-xs">
                              {device.deviceType}
                            </Badge>
                          )}
                        </div>
                        {device.hostname && (
                          <p className="text-sm text-muted-foreground">{device.hostname}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Última verificação: {new Date(device.lastSeen).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refreshDevice(device)}
                        disabled={isScanning}
                      >
                        Atualizar
                      </Button>
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Aqui poderia abrir modal para adicionar como equipamento
                          toast.info("Funcionalidade de importação em desenvolvimento")
                        }}
                      >
                        Importar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDevice(device.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}