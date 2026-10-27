type ToolPanel = "filtros" | "capas" | "leyenda";
type DetailPanel = "recurso" | "direccion";
export type SheetHeight = "peek" | "media" | "expandida";

export type MapPanelState = {
  tool: ToolPanel | null;
  detail: DetailPanel | null;
  height: SheetHeight;
};

export const initialMapPanel: MapPanelState = {
  tool: null,
  detail: null,
  height: "peek",
};

export type MapPanelAction =
  | { type: "toggle-tool"; panel: ToolPanel }
  | { type: "select-resource" }
  | { type: "select-address" }
  | { type: "show-route" }
  | { type: "set-height"; height: SheetHeight }
  | { type: "escape" }
  | { type: "map-tap" };

const HEIGHTS: SheetHeight[] = ["peek", "media", "expandida"];

export function mapPanelReducer(
  state: MapPanelState,
  action: MapPanelAction,
): MapPanelState {
  switch (action.type) {
    case "toggle-tool":
      if (state.tool === action.panel) {
        return { ...state, tool: null };
      }
      return { ...state, tool: action.panel, detail: null, height: "media" };
    case "select-resource":
      return { ...state, tool: null, detail: "recurso", height: "peek" };
    case "select-address":
      return { ...state, tool: null, detail: "direccion", height: "peek" };
    case "show-route":
      return { ...state, tool: null, detail: null, height: "media" };
    case "set-height":
      return { ...state, height: action.height };
    case "escape":
      if (state.tool) return { ...state, tool: null };
      if (state.detail) return { ...state, detail: null };
      return state;
    case "map-tap":
      return { ...state, height: "peek" };
    default:
      return state;
  }
}

export function cycleSheetHeight(height: SheetHeight): SheetHeight {
  const index = HEIGHTS.indexOf(height);
  return HEIGHTS[(index + 1) % HEIGHTS.length] ?? "peek";
}

export type SheetView = {
  kind: ToolPanel | DetailPanel | "ruta" | "picking" | null;
  height: SheetHeight;
  backToRoute: boolean;
};

export function resolveSheet(
  state: MapPanelState,
  ctx: { routeActive: boolean; pickingOrigin: boolean; pickingDestination?: boolean },
): SheetView {
  if (ctx.pickingOrigin || ctx.pickingDestination) {
    return { kind: "picking", height: "peek", backToRoute: false };
  }
  if (state.tool) {
    return {
      kind: state.tool,
      height: state.height,
      backToRoute: ctx.routeActive,
    };
  }
  if (state.detail) {
    return { kind: state.detail, height: state.height, backToRoute: false };
  }
  if (ctx.routeActive) {
    return { kind: "ruta", height: state.height, backToRoute: false };
  }
  return { kind: null, height: state.height, backToRoute: false };
}
