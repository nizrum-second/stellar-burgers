import { fetchFeeds, initialState, reducer } from "./feedSlice";
import { expect, test, describe } from "@jest/globals";

describe("тестирование редьюсера feedSlice", () => {
	describe("тестирование асинхронного экшена fetchFeeds", () => {
		const actions = {
			pending: {
				type: fetchFeeds.pending.type,
				payload: null,
			},
			rejected: {
				type: fetchFeeds.rejected.type,
				error: { message: "Ошибка получения ленты заказов" },
			},
			fulfilled: {
				type: fetchFeeds.fulfilled.type,
				payload: { orders: ["testOrder1", "testOrder2", "testOrder3"] },
			},
		};

		test("тестирование асинхронного экшена fetchFeeds.pending", () => {
			const state = reducer(initialState, actions.pending);
			expect(state.isLoading).toBe(true);
			expect(state.error).toBe(actions.pending.payload);
		});

		test("тестирование асинхронного экшена fetchFeeds.rejected", () => {
			const state = reducer(initialState, actions.rejected);
			expect(state.isLoading).toBe(false);
			expect(state.error).toBe(actions.rejected.error.message);
		});

		test("тестирование асинхронного экшена fetchFeeds.fulfilled", () => {
			const nextState = reducer(initialState, actions.fulfilled);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.data.orders).toEqual(
				actions.fulfilled.payload.orders
			);
		});
	});
});
