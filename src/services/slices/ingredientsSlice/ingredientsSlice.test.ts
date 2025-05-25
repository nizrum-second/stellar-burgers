import { reducer, initialState, fetchIngredients } from "./ingredientsSlice";
import { expect, test, describe } from "@jest/globals";

describe("тестирование редьюсера ingredientsSlice", () => {
	describe("тестирование асинхронного экшена fetchIngredients", () => {
		const mockIngredients = [
			{
				_id: "1",
				name: "Булка",
				type: "bun",
				proteins: 10,
				fat: 5,
				carbohydrates: 15,
				calories: 100,
				price: 100,
				image: "",
				image_mobile: "",
				image_large: "",
			},
			{
				_id: "2",
				name: "Котлета",
				type: "main",
				proteins: 20,
				fat: 10,
				carbohydrates: 5,
				calories: 150,
				price: 200,
				image: "",
				image_mobile: "",
				image_large: "",
			},
		];

		const actions = {
			pending: {
				type: fetchIngredients.pending.type,
				payload: null,
			},
			rejected: {
				type: fetchIngredients.rejected.type,
				error: { message: "Ошибка загрузки ингредиентов" },
			},
			fulfilled: {
				type: fetchIngredients.fulfilled.type,
				payload: mockIngredients,
			},
		};

		test("тестирование экшена fetchIngredients.pending", () => {
			const state = reducer(initialState, actions.pending);
			expect(state.isLoading).toBe(true);
			expect(state.error).toBeNull();
		});

		test("тестирование экшена fetchIngredients.rejected", () => {
			const state = reducer(initialState, actions.rejected);
			expect(state.isLoading).toBe(false);
			expect(state.error).toEqual(actions.rejected.error);
			expect(state.data).toEqual([]);
		});

		test("тестирование экшена fetchIngredients.fulfilled", () => {
			const nextState = reducer(initialState, actions.fulfilled);
			expect(nextState.isLoading).toBe(false);
			expect(nextState.error).toBeNull();
			expect(nextState.data).toEqual(mockIngredients);
		});
	});
});
