import {
	reducer,
	initialState,
	resetOrderModalData,
	fetchOrder,
	createOrder,
	fetchOrders,
} from "./orderSlice";
import { expect, test, describe } from "@jest/globals";

describe("тестирование редьюсера orderSlice", () => {
	describe("тестирование асинхронного экшена fetchOrder", () => {
		const mockOrder = {
			_id: "1",
			ingredients: ["ingredient1", "ingredient2", "ingredient3"],
			status: "done",
			name: "Order 1",
			number: 1,
			createdAt: "date",
			updatedAt: "date",
		};

		const actions = {
			pending: {
				type: fetchOrder.pending.type,
				payload: null,
			},
			rejected: {
				type: fetchOrder.rejected.type,
				error: { message: "Ошибка заказа" },
			},
			fulfilled: {
				type: fetchOrder.fulfilled.type,
				payload: mockOrder,
			},
		};

		test("тестирование экшена fetchOrder.pending", () => {
			const state = reducer(initialState, actions.pending);
			expect(state.isOrderLoading).toBe(true);
		});

		test("тестирование экшена fetchOrder.rejected", () => {
			const state = reducer(initialState, actions.rejected);
			expect(state.isOrderLoading).toBe(false);
		});

		test("тестирование экшена fetchOrder.fulfilled", () => {
			const state = reducer(initialState, actions.fulfilled);
			expect(state.isOrderLoading).toBe(false);
			expect(state.orderModalData).toEqual(mockOrder);
		});
	});

	describe("тестирование асинхронного экшена fetchOrders", () => {
		const mockOrders = [
			{
				_id: "1",
				ingredients: ["ingredient1", "ingredient2", "ingredient3"],
				status: "done",
				name: "Order 1",
				number: 1,
				createdAt: "date",
				updatedAt: "date",
			},
		];

		const actions = {
			pending: {
				type: fetchOrders.pending.type,
				payload: null,
			},
			rejected: {
				type: fetchOrders.rejected.type,
				error: { message: "Ошибка списка заказов" },
			},
			fulfilled: {
				type: fetchOrders.fulfilled.type,
				payload: mockOrders,
			},
		};

		test("тестирование экшена fetchOrders.pending", () => {
			const state = reducer(initialState, actions.pending);
			expect(state.isOrdersLoading).toBe(true);
			expect(state.error).toBeNull();
		});

		test("тестирование экшена fetchOrders.rejected", () => {
			const state = reducer(initialState, actions.rejected);
			expect(state.isOrdersLoading).toBe(false);
			expect(state.error).toEqual(actions.rejected.error);
		});

		test("тестирование экшена fetchOrders.fulfilled", () => {
			const state = reducer(initialState, actions.fulfilled);
			expect(state.isOrdersLoading).toBe(false);
			expect(state.error).toBeNull();
			expect(state.data).toEqual(mockOrders);
		});
	});

	describe("тестирование асинхронного экшена createOrder", () => {
		const mockNewOrder = {
			order: {
				_id: "1",
				ingredients: ["ingredient1", "ingredient2", "ingredient3"],
				status: "done",
				name: "New Order",
				number: 1,
				createdAt: "date",
				updatedAt: "date",
			},
			name: "New Order",
		};

		const actions = {
			pending: {
				type: createOrder.pending.type,
				payload: null,
			},
			rejected: {
				type: createOrder.rejected.type,
				error: { message: "Ошибка создания заказа" },
			},
			fulfilled: {
				type: createOrder.fulfilled.type,
				payload: mockNewOrder,
			},
		};

		test("тестирование экшена createOrder.pending", () => {
			const state = reducer(initialState, actions.pending);
			expect(state.orderRequest).toBe(true);
		});

		test("тестирование экшена createOrder.rejected", () => {
			const state = reducer(initialState, actions.rejected);
			expect(state.orderRequest).toBe(false);
		});

		test("тестирование экшена createOrder.fulfilled", () => {
			const state = reducer(initialState, actions.fulfilled);
			expect(state.orderRequest).toBe(false);
			expect(state.orderModalData).toEqual(mockNewOrder.order);
		});
	});

	describe("тестирование асинхронного экшена resetOrderModalData", () => {
		test("сброс данных модального окна заказа", () => {
			const stateWithOrder = {
				...initialState,
				orderModalData: {
					_id: "1",
					ingredients: ["ingredient1", "ingredient2", "ingredient3"],
					status: "done",
					name: "Order",
					number: 1,
					createdAt: "date",
					updatedAt: "date",
				},
			};

			const state = reducer(stateWithOrder, resetOrderModalData());
			expect(state.orderModalData).toBeNull();
		});
	});
});
