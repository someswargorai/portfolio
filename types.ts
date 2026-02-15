export interface WifiNetwork {
  id: string;
  name: string;
  strength: number;
  isSecure: boolean;
  isConnected: boolean;
}

export interface MenuItem {
  label: string;
  onClick: () => void;
  shortcut?: string;
  isHeader?: boolean;
}

export type MenuType =
  | "apple"
  | "app"
  | "wifi"
  | "battery"
  | "user"
  | "datetime"
  | "search"
  | null;
