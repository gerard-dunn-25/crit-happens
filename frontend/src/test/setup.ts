import '@testing-library/jest-dom'
import { vi } from 'vitest'

const ResizeObserverMock = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock)
