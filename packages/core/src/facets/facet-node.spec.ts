import {
  expect,
  test,
} from 'vitest'

import { Priority } from '../types/priority'

import { Facet } from './facet'
import {
  FacetNode,
  subtractFacetNode,
  unionFacetNode,
} from './facet-node'

const sum = (input: number[]) => input.reduce((acc, cur) => acc + cur, 0)

const CounterFacet = new Facet<number, number>(null, false, sum)
const SingletonCounterFacet = new Facet<number, number>(null, true, sum)

const value1 = [0, 1, 2]
const value2 = [3, 4, 5]
const value3 = [6, 7, 8]

test('Root Facet Node', () => {
  const rootNode = new FacetNode(CounterFacet, [
    [...value1],
    null,
    null,
    [...value1],
    null,
  ])
  const childNode1 = new FacetNode(CounterFacet, [
    null,
    [...value2],
    null,
    [...value2],
    null,
  ])
  const childNode2 = new FacetNode(CounterFacet, [
    null,
    null,
    [...value3],
    [...value3],
    null,
  ])

  rootNode.children.set(0, childNode1)
  rootNode.children.set(1, childNode2)

  expect(rootNode.facet).toBe(CounterFacet)
  expect(rootNode.children.size).toBe(2)
  expect(rootNode.getOutput()).toEqual([
    sum(value1),
    sum(value2),
    sum(value3),
    sum([...value1, ...value2, ...value3]),
    null,
  ])
  expect(() => rootNode.getRootOutput()).toThrow()
  expect(rootNode.isRoot()).toBeTruthy()
})

test('Singleton Root Facet Node', () => {
  const singletonRootNode = new FacetNode(SingletonCounterFacet, [
    [...value1],
    null,
    null,
    null,
    null,
  ])
  const childNode1 = new FacetNode(CounterFacet, [
    null,
    [...value2],
    null,
    [...value2],
    null,
  ])
  const childNode2 = new FacetNode(CounterFacet, [
    null,
    null,
    [...value3],
    [...value3],
    null,
  ])

  singletonRootNode.children.set(0, childNode1)
  singletonRootNode.children.set(1, childNode2)

  expect(singletonRootNode.facet).toBe(SingletonCounterFacet)
  expect(singletonRootNode.children.size).toBe(2)
  expect(childNode1.getOutput()).toEqual([
    null,
    sum(value2),
    null,
    sum(value2),
    null,
  ])
  expect(childNode2.getOutput()).toEqual([
    null,
    null,
    sum(value3),
    sum(value3),
    null,
  ])
  expect(singletonRootNode.getOutput()).toEqual([
    null,
    null,
    sum([...value1, sum(value2), sum(value3), ...[sum(value2), sum(value3)]]),
    null,
    null,
  ])
  expect(singletonRootNode.getRootOutput()).toEqual(
    singletonRootNode.getOutput()[Priority.default],
  )
})

test('Union Facet Node', () => {
  const rootNode1 = new FacetNode(CounterFacet, [
    [...value1],
    null,
    null,
    [...value1, ...value3],
    null,
  ])
  const rootNode2 = new FacetNode(CounterFacet, [
    null,
    [...value1],
    null,
    [...value1, ...value2],
    null,
  ])
  const childNode1 = new FacetNode(CounterFacet, [
    null,
    null,
    [...value2],
    [...value2],
    null,
  ])
  const childNode2 = new FacetNode(CounterFacet, [
    null,
    null,
    [...value3],
    [...value3],
    null,
  ])

  rootNode1.children.set(0, childNode1)
  rootNode2.children.set(0, childNode2)

  const unioned = unionFacetNode(rootNode1, rootNode2)
  expect(unioned.facet).toBe(CounterFacet)
  expect(unioned.children.size).toBe(1)
  expect(unioned.children.get(0)).toEqual(
    unionFacetNode(childNode1, childNode2),
  )
  expect(unioned.inputs).toEqual([
    [...value1],
    [...value1],
    null,
    [...value1, ...value3, ...value2],
    null,
  ])
  expect(unioned.children.get(0)?.inputs).toEqual([
    null,
    null,
    [...value2, ...value3],
    [...value2, ...value3],
    null,
  ])
})

test('Subtract Facet Node', () => {
  const rootNode1 = new FacetNode(CounterFacet, [
    [...value1],
    null,
    null,
    [...value1, ...value3],
    null,
  ])
  const rootNode2 = new FacetNode(CounterFacet, [
    null,
    [...value1],
    null,
    [...value1, ...value2],
    null,
  ])
  const childNode1 = new FacetNode(CounterFacet, [
    null,
    null,
    [...value2],
    [...value2],
    null,
  ])
  const childNode2 = new FacetNode(CounterFacet, [
    null,
    null,
    [...value2],
    [...value3],
    null,
  ])

  rootNode1.children.set(0, childNode1)
  rootNode2.children.set(0, childNode2)

  const subtracted = subtractFacetNode(rootNode1, rootNode2)
  expect(subtracted.facet).toBe(CounterFacet)
  expect(subtracted.children.size).toBe(1)
  expect(subtracted.children.get(0)).toEqual(
    subtractFacetNode(childNode1, childNode2),
  )

  expect(subtracted.inputs).toEqual([
    [...value1],
    null,
    null,
    [...value3],
    null,
  ])

  expect(subtracted.children.get(0)?.inputs).toEqual([
    null,
    null,
    [],
    [...value2],
    null,
  ])
})

test('Union Facet Node with Different Facet', () => {
  const rootNode1 = new FacetNode(CounterFacet, [
    [...value1],
    null,
    null,
    [...value1, ...value3],
    null,
  ])
  const rootNode2 = new FacetNode(SingletonCounterFacet, [
    null,
    [...value1],
    null,
    [...value1, ...value2],
    null,
  ])

  expect(() => unionFacetNode(rootNode1, rootNode2)).toThrow()
})

test('Subtract Facet Node with Different Facet', () => {
  const rootNode1 = new FacetNode(CounterFacet, [
    [...value1],
    null,
    null,
    [...value1, ...value3],
    null,
  ])
  const rootNode2 = new FacetNode(SingletonCounterFacet, [
    null,
    [...value1],
    null,
    [...value1, ...value2],
    null,
  ])

  expect(() => subtractFacetNode(rootNode1, rootNode2)).toThrow()
})
