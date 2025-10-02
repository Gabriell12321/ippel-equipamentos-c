import { 
  Desktop,
  Laptop,
  Monitor,
  WifiHigh,
  Printer,
  Phone,
  SpeakerHigh,
  HardDrives,
  Cpu,
  Keyboard,
  Mouse,
  GameController,
  Camera,
  DeviceTablet,
  Television,
  DeviceMobile,
  PuzzlePiece
} from "@phosphor-icons/react"

export type EquipmentType = 
  | "desktop"
  | "laptop"
  | "monitor"
  | "router"
  | "printer"
  | "phone"
  | "speaker"
  | "storage"
  | "server"
  | "keyboard"
  | "mouse"
  | "gamepad"
  | "camera"
  | "tablet"
  | "tv"
  | "mobile"
  | "other"

export function getEquipmentIcon(type: EquipmentType, size = 16, weight: "regular" | "bold" = "regular") {
  const iconProps = { size, weight, className: "text-muted-foreground" }
  
  switch (type) {
    case "desktop":
      return <Desktop {...iconProps} />
    case "laptop":
      return <Laptop {...iconProps} />
    case "monitor":
      return <Monitor {...iconProps} />
    case "router":
      return <WifiHigh {...iconProps} />
    case "printer":
      return <Printer {...iconProps} />
    case "phone":
      return <Phone {...iconProps} />
    case "speaker":
      return <SpeakerHigh {...iconProps} />
    case "storage":
      return <HardDrives {...iconProps} />
    case "server":
      return <Cpu {...iconProps} />
    case "keyboard":
      return <Keyboard {...iconProps} />
    case "mouse":
      return <Mouse {...iconProps} />
    case "gamepad":
      return <GameController {...iconProps} />
    case "camera":
      return <Camera {...iconProps} />
    case "tablet":
      return <DeviceTablet {...iconProps} />
    case "tv":
      return <Television {...iconProps} />
    case "mobile":
      return <DeviceMobile {...iconProps} />
    default:
      return <PuzzlePiece {...iconProps} />
  }
}

export function getEquipmentTypeLabel(type: EquipmentType): string {
  const labels = {
    desktop: "Desktop",
    laptop: "Notebook",
    monitor: "Monitor",
    router: "Roteador",
    printer: "Impressora",
    phone: "Telefone",
    speaker: "Alto-falante",
    storage: "Armazenamento",
    server: "Servidor",
    keyboard: "Teclado",
    mouse: "Mouse",
    gamepad: "Controle",
    camera: "Câmera",
    tablet: "Tablet",
    tv: "TV",
    mobile: "Celular",
    other: "Outro"
  }
  
  return labels[type] || "Outro"
}

export const equipmentTypes: { value: EquipmentType; label: string }[] = [
  { value: "desktop", label: "Desktop" },
  { value: "laptop", label: "Notebook" },
  { value: "monitor", label: "Monitor" },
  { value: "router", label: "Roteador" },
  { value: "printer", label: "Impressora" },
  { value: "phone", label: "Telefone" },
  { value: "speaker", label: "Alto-falante" },
  { value: "storage", label: "Armazenamento" },
  { value: "server", label: "Servidor" },
  { value: "keyboard", label: "Teclado" },
  { value: "mouse", label: "Mouse" },
  { value: "gamepad", label: "Controle" },
  { value: "camera", label: "Câmera" },
  { value: "tablet", label: "Tablet" },
  { value: "tv", label: "TV" },
  { value: "mobile", label: "Celular" },
  { value: "other", label: "Outro" }
]