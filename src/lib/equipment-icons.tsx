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

export function getEquipmentIcon(type: string, className?: string) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    // Computadores e Componentes
    desktop: Desktop,
    notebook: Laptop,
    'memoria-ram': Circle,
    ssd: HardDrive,
    hd: HardDrive,
    'placa-video': GraphicsCard,
    fonte: Lightning,
    'placa-rede': Globe,
    processador: Cpu,
    
    // Monitores e Acessórios
    monitor: Monitor,
    'suporte-monitor': Gear,
    
    // Cabos de Vídeo
    'cabo-hdmi': Gear,
    'cabo-displayport': Gear,
    'cabo-vga': Gear,
    'cabo-dvi': Gear,
    
    // Adaptadores de Vídeo
    'hdmi-vga': Plug,
    'vga-hdmi': Plug,
    'displayport-hdmi': Plug,
    'displayport-vga': Plug,
    'usbc-hdmi': Plug,
    'dvi-hdmi': Plug,
    
    // Periféricos
    teclado: Keyboard,
    mouse: Mouse,
    mousepad: Circle,
    webcam: Camera,
    headset: Headphones,
    'caixa-som': SpeakerHigh,
    
    // Armazenamento e Mídias
    pendrive: Usb,
    'cartao-memoria': Circle,
    'hd-externo': HardDrive,
    'ssd-externo': HardDrive,
    
    // Rede e Conectividade
    switch: Globe,
    'access-point': WifiHigh,
    'repetidor-wifi': WifiHigh,
    roteador: Globe,
    
    // Cabos e Conectores
    'cabo-rede': Gear,
    'conector-rj45': Gear,
    'patch-panel': Gear,
    'usb-ethernet': Usb,
    'extensor-sinal': Gear,
    
    // Energia e Manutenção
    nobreak: Lightning,
    estabilizador: Lightning,
    'filtro-linha': Plug,
    
    // Ferramentas e Manutenção
    'kit-chaves': Wrench,
    'pasta-termica': Circle,
    'spray-limpeza': Circle,
    'alcool-isopropilico': Circle,
    'escova-antiestatica': Wrench,
    
    // Diversos
    'suporte-notebook': Laptop,
    'dock-station': Gear,
    'hub-usb': Usb,
    'cooler-notebook': Fan,
    'antena-wifi-usb': WifiHigh,
    'limpa-tela': Circle,
    impressora: Printer,
    scanner: FilePdf,
    projetor: ProjectorScreen,
    tablet: DeviceTablet,
    smartphone: Phone,
    servidor: Database,
    
    // Legacy types (keeping for backwards compatibility)
    Desktop: Desktop,
    Notebook: Laptop,
    Monitor: Monitor,
    Impressora: Printer,
    Scanner: FilePdf,
    Servidor: Database,
    Switch: Globe,
    Roteador: Globe,
    'Access Point': WifiHigh,
    Tablet: DeviceTablet,
    Smartphone: Phone,
    Projetor: ProjectorScreen,
    Webcam: Camera,
    Headset: Headphones,
    Outros: Package
  }
  
  const IconComponent = iconMap[type] || Package
  return <IconComponent className={className || "w-4 h-4"} />
}

export function getEquipmentTypeLabel(value: string): string {
  const labelMap: Record<string, string> = {
    // Computadores e Componentes
    desktop: "Desktop",
    notebook: "Notebook",
    'memoria-ram': "Memória RAM",
    ssd: "SSD",
    hd: "HD",
    'placa-video': "Placa de Vídeo",
    fonte: "Fonte de Alimentação",
    'placa-rede': "Placa de Rede",
    processador: "Processador",
    
    // Monitores e Acessórios
    monitor: "Monitor",
    'suporte-monitor': "Suporte para Monitor",
    
    // Cabos de Vídeo
    'cabo-hdmi': "Cabo HDMI",
    'cabo-displayport': "Cabo DisplayPort",
    'cabo-vga': "Cabo VGA",
    'cabo-dvi': "Cabo DVI",
    
    // Adaptadores de Vídeo
    'hdmi-vga': "HDMI para VGA",
    'vga-hdmi': "VGA para HDMI",
    'displayport-hdmi': "DisplayPort para HDMI",
    'displayport-vga': "DisplayPort para VGA",
    'usbc-hdmi': "USB-C para HDMI",
    'dvi-hdmi': "DVI para HDMI",
    
    // Periféricos
    teclado: "Teclado",
    mouse: "Mouse",
    mousepad: "Mousepad",
    webcam: "Webcam",
    headset: "Headset",
    'caixa-som': "Caixa de Som",
    
    // Armazenamento e Mídias
    pendrive: "Pendrive",
    'cartao-memoria': "Cartão de Memória",
    'hd-externo': "HD Externo",
    'ssd-externo': "SSD Externo",
    
    // Rede e Conectividade
    switch: "Switch de Rede",
    'access-point': "Access Point",
    'repetidor-wifi': "Repetidor Wi-Fi",
    roteador: "Roteador",
    
    // Cabos e Conectores
    'cabo-rede': "Cabo de Rede RJ-45",
    'conector-rj45': "Conector RJ-45",
    'patch-panel': "Patch Panel",
    'usb-ethernet': "Adaptador USB Ethernet",
    'extensor-sinal': "Extensor de Sinal",
    
    // Energia e Manutenção
    nobreak: "Nobreak",
    estabilizador: "Estabilizador",
    'filtro-linha': "Filtro de Linha",
    
    // Ferramentas e Manutenção
    'kit-chaves': "Kit de Chaves para PC",
    'pasta-termica': "Pasta Térmica",
    'spray-limpeza': "Spray de Limpeza",
    'alcool-isopropilico': "Álcool Isopropílico",
    'escova-antiestatica': "Escova Antiestática",
    
    // Diversos
    'suporte-notebook': "Suporte para Notebook",
    'dock-station': "Dock Station",
    'hub-usb': "Hub USB",
    'cooler-notebook': "Cooler para Notebook",
    'antena-wifi-usb': "Antena Wi-Fi USB",
    'limpa-tela': "Limpa Tela",
    impressora: "Impressora",
    scanner: "Scanner",
    projetor: "Projetor",
    tablet: "Tablet",
    smartphone: "Smartphone",
    servidor: "Servidor"
  }
  
  return labelMap[value] || value
}