/**
 * Ava Testing Library (TODO: W.I.P.)
 * ==================================
 *
 * @see https://github.com/avajs/ava
 * @see https://github.com/xojs/xo
 * @see https://swc.rs/playground
 */

import test from "ava";

import { subtract, sum } from "~/utils/other/for-test/math-ava";

test("sum", (t) => {
  t.is(sum(0, 0), 0);
  t.is(sum(2, 2), 4);
});

test("subtract", (t) => {
  t.is(subtract(0, 0), 0);
  t.is(subtract(4, 2), 2);
});
