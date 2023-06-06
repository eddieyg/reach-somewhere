import type { RefObject } from 'react'
import { useEffect } from 'react'
import type { ReachSwParams } from 'src/type'
import { ReachSw } from 'src/core'

export interface UseReachSwOptions {
  auto?: boolean
}

export function useReachSw<El extends HTMLElement>(
  elRef: RefObject<El>,
  params: ReachSwParams,
  options?: UseReachSwOptions,
) {
  const {
    auto = true,
  } = options || {}
  let reachSw: ReachSw | undefined

  function listen() {
    if (elRef && elRef.current && !reachSw) {
      reachSw = new ReachSw(elRef.current, params)
      reachSw.listen()
    }
  }

  function rm() {
    if (reachSw) {
      reachSw.rmListen()
      reachSw = undefined
    }
  }

  if (auto) {
    useEffect(() => {
      listen()
      return rm
    }, [elRef])
  }

  return {
    rm,
    listen,
  }
}
