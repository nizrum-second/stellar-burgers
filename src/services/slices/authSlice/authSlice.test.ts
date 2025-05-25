import {
	reducer,
	initialState,
	register,
	login,
	logout,
	fetchUser,
	updateUser,
	checkUserAuth,
} from "./authSlice";
import { expect, test, describe } from "@jest/globals";

describe("тестирование редьюсера authSlice", () => {
	describe("тестирование асинхронного экшена register", () => {
		const mockUser = { name: "Test", email: "test@test.com" };

		const actions = {
			pending: {
				type: register.pending.type,
				meta: {
					requestId: "1",
					arg: {
						name: "Test",
						email: "test@test.com",
						password: "pass",
					},
				},
			},
			rejected: {
				type: register.rejected.type,
				error: { message: "Error" },
				meta: {
					requestId: "1",
					arg: {
						name: "Test",
						email: "test@test.com",
						password: "pass",
					},
				},
			},
			fulfilled: {
				type: register.fulfilled.type,
				payload: mockUser,
				meta: {
					requestId: "1",
					arg: {
						name: "Test",
						email: "test@test.com",
						password: "pass",
					},
				},
			},
		};

		test("тестирование экшена register.pending", () => {
			const nextState = reducer(
				{ ...initialState, registerError: { message: "Error" } },
				actions.pending
			);
			expect(nextState.registerError).toBeUndefined();
		});

		test("тестирование экшена register.fulfilled", () => {
			const nextState = reducer(initialState, actions.fulfilled);
			expect(nextState.isAuthenticated).toBe(true);
			expect(nextState.data).toEqual(mockUser);
		});

		test("тестирование экшена register.rejected", () => {
			const nextState = reducer(initialState, actions.rejected);
			expect(nextState.registerError).toEqual(actions.rejected.error);
		});

		test("тестирование экшена register.rejected с rejectWithValue", () => {
			const rejectedWithValueAction = {
				...actions.rejected,
				payload: { message: "API Error" },
				meta: { ...actions.rejected.meta, rejectedWithValue: true },
			};
			const nextState = reducer(initialState, rejectedWithValueAction);
			expect(nextState.registerError).toEqual({ message: "API Error" });
		});
	});

	describe("тестирование асинхронного экшена login", () => {
		const mockUser = { name: "Test", email: "test@test.com" };

		const actions = {
			pending: {
				type: login.pending.type,
				meta: {
					requestId: "1",
					arg: { email: "test@test.com", password: "pass" },
				},
			},
			rejected: {
				type: login.rejected.type,
				error: { message: "Error" },
				meta: {
					requestId: "1",
					arg: { email: "test@test.com", password: "pass" },
				},
			},
			fulfilled: {
				type: login.fulfilled.type,
				payload: mockUser,
				meta: {
					requestId: "1",
					arg: { email: "test@test.com", password: "pass" },
				},
			},
		};

		test("тестирование экшена login.pending", () => {
			const nextState = reducer(
				{ ...initialState, loginError: { message: "Error" } },
				actions.pending
			);
			expect(nextState.loginError).toBeUndefined();
			expect(nextState.isAuthChecked).toBe(false);
			expect(nextState.isAuthenticated).toBe(false);
		});

		test("тестирование экшена login.fulfilled", () => {
			const nextState = reducer(initialState, actions.fulfilled);
			expect(nextState.isAuthenticated).toBe(true);
			expect(nextState.isAuthChecked).toBe(false);
			expect(nextState.data).toEqual(mockUser);
		});

		test("тестирование экшена login.rejected", () => {
			const nextState = reducer(initialState, actions.rejected);
			expect(nextState.loginError).toEqual(actions.rejected.error);
			expect(nextState.isAuthChecked).toBe(false);
			expect(nextState.isAuthenticated).toBe(false);
		});

		test("тестирование экшена login.rejected с rejectWithValue", () => {
			const rejectedWithValueAction = {
				...actions.rejected,
				payload: { message: "API Error" },
				meta: { ...actions.rejected.meta, rejectedWithValue: true },
			};
			const nextState = reducer(initialState, rejectedWithValueAction);
			expect(nextState.loginError).toEqual({ message: "API Error" });
		});
	});

	describe("тестирование асинхронного экшена logout", () => {
		const actions = {
			pending: {
				type: logout.pending.type,
				meta: { requestId: "1" },
			},
			rejected: {
				type: logout.rejected.type,
				error: { message: "Error" },
				meta: { requestId: "1" },
			},
			fulfilled: {
				type: logout.fulfilled.type,
				meta: { requestId: "1" },
			},
		};

		test("тестирование экшена logout.fulfilled", () => {
			const state = {
				...initialState,
				isAuthenticated: true,
				data: { name: "Test", email: "test@test.com" },
			};
			const nextState = reducer(state, actions.fulfilled);
			expect(nextState.data).toEqual({ name: "", email: "" });
		});

		test("тестирование экшена logout.rejected", () => {
			const nextState = reducer(initialState, actions.rejected);
			expect(nextState).toEqual(initialState);
		});
	});

	describe("тестирование асинхронного экшена fetchUser", () => {
		const mockUser = { name: "Test", email: "test@test.com" };

		const actions = {
			pending: {
				type: fetchUser.pending.type,
				meta: { requestId: "1" },
			},
			rejected: {
				type: fetchUser.rejected.type,
				error: { message: "Error" },
				meta: { requestId: "1" },
			},
			fulfilled: {
				type: fetchUser.fulfilled.type,
				payload: mockUser,
				meta: { requestId: "1" },
			},
		};

		test("тестирование экшена fetchUser.fulfilled", () => {
			const nextState = reducer(initialState, actions.fulfilled);
			expect(nextState.isAuthenticated).toBe(true);
			expect(nextState.isAuthChecked).toBe(true);
			expect(nextState.data).toEqual(mockUser);
		});

		test("тестирование экшена fetchUser.rejected", () => {
			const nextState = reducer(initialState, actions.rejected);
			expect(nextState.isAuthChecked).toBe(true);
			expect(nextState.isAuthenticated).toBe(false);
		});
	});

	describe("тестирование асинхронного экшена updateUser", () => {
		const mockUser = { name: "Updated", email: "updated@test.com" };

		const actions = {
			pending: {
				type: updateUser.pending.type,
				meta: {
					requestId: "1",
					arg: { name: "Updated", email: "updated@test.com" },
				},
			},
			rejected: {
				type: updateUser.rejected.type,
				error: { message: "Error" },
				meta: {
					requestId: "1",
					arg: { name: "Updated", email: "updated@test.com" },
				},
			},
			fulfilled: {
				type: updateUser.fulfilled.type,
				payload: mockUser,
				meta: {
					requestId: "1",
					arg: { name: "Updated", email: "updated@test.com" },
				},
			},
		};

		test("тестирование экшена updateUser.fulfilled", () => {
			const state = {
				...initialState,
				data: { name: "Test", email: "test@test.com" },
			};
			const nextState = reducer(state, actions.fulfilled);
			expect(nextState.data).toEqual(mockUser);
		});

		test("тестирование экшена updateUser.rejected", () => {
			const nextState = reducer(initialState, actions.rejected);
			expect(nextState).toEqual(initialState);
		});
	});

	describe("тестирование асинхронного экшена checkUserAuth", () => {
		const actions = {
			pending: {
				type: checkUserAuth.pending.type,
			},
			rejected: {
				type: checkUserAuth.rejected.type,
				error: { message: "Error" },
			},
			fulfilled: {
				type: checkUserAuth.fulfilled.type,
			},
		};

		test("тестирование экшена checkUserAuth.fulfilled", () => {
			const nextState = reducer(initialState, actions.fulfilled);
			expect(nextState.isAuthChecked).toBe(true);
		});

		test("тестирование экшена checkUserAuth.rejected", () => {
			const nextState = reducer(initialState, actions.rejected);
			expect(nextState.isAuthChecked).toBe(true);
			expect(nextState.isAuthenticated).toBe(false);
		});
	});
});
