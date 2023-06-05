export interface ReachSwEvent {
  position: string // top,bottom 1px,1%; link 'top 50%'
  debounceMs?: number // take the smallest value; default 0
  onReach?: () => void
  onLeave?: () => void
}

export type ReachSwParams = ReachSwEvent | ReachSwEvent[]
