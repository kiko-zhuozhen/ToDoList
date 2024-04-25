import { expect, test } from 'vitest'
import { formatDate } from '../formatDate'

test('正确的', () => {
  expect('2024/02/23').toBe('2024/02/23')
})

test('错误的') ('2023-02-23')