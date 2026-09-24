import { describe, expect, test } from 'vitest'

import { getPageWindow } from './page-window'

describe('getPageWindow', () => {
  test('deve começar na primeira página quando a página atual estiver perto do início', () => {
    expect(getPageWindow(1, 450, 8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  test('deve centralizar a página atual quando possível', () => {
    expect(getPageWindow(10, 450, 5)).toEqual([8, 9, 10, 11, 12])
  })

  test('deve fixar nas últimas páginas perto do fim', () => {
    expect(getPageWindow(450, 450, 5)).toEqual([446, 447, 448, 449, 450])
  })

  test('não deve ultrapassar o total de páginas', () => {
    expect(getPageWindow(1, 3, 8)).toEqual([1, 2, 3])
  })

  test('deve retornar uma lista vazia quando não houver páginas', () => {
    expect(getPageWindow(1, 0, 8)).toEqual([])
  })
})
