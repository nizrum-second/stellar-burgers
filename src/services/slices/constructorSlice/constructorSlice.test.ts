import {
	addIngredient,
	initialState,
	moveIngredient,
	removeIngredient,
	resetConstructor,
	setBun,
	reducer,
} from "./constructorSlice";
import { expect, test, describe } from "@jest/globals";

describe("тестирование редьюсера constructorSlice", () => {
	describe("тестирование экшена setBun", () => {
		test("установка булки", () => {
			const bun = {
				_id: "643d69a5c3f7b9001cfa093d",
				name: "Флюоресцентная булка R2-D3",
				type: "bun",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/bun-01.png",
				image_mobile:
					"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
				image_large:
					"https://code.s3.yandex.net/react/code/bun-01-large.png",
				__v: 0,
			};

			const newState = reducer(initialState, setBun(bun));

			expect(newState.bun).toEqual(bun);
		});

		test("сброс булки", () => {
			const stateWithBun = {
				...initialState,
				bun: {
					_id: "643d69a5c3f7b9001cfa093c",
					name: "Краторная булка N-200i",
					type: "bun",
					proteins: 80,
					fat: 24,
					carbohydrates: 53,
					calories: 420,
					price: 1255,
					image: "https://code.s3.yandex.net/react/code/bun-02.png",
					image_mobile:
						"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
					image_large:
						"https://code.s3.yandex.net/react/code/bun-02-large.png",
				},
			};

			const newState = reducer(stateWithBun, setBun(null));

			expect(newState.bun).toBeNull();
		});
	});

	describe("тестирование экшена addIngredient", () => {
		test("добавление ингредиента в список ингредиентов", () => {
			const ingredient = {
				_id: "643d69a5c3f7b9001cfa0940",
				name: "Говяжий метеорит (отбивная)",
				type: "main",
				proteins: 800,
				fat: 800,
				carbohydrates: 300,
				calories: 2674,
				price: 3000,
				image: "https://code.s3.yandex.net/react/code/meat-04.png",
				image_mobile:
					"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
				image_large:
					"https://code.s3.yandex.net/react/code/meat-04-large.png",
				__v: 0,
			};

			const newState = reducer(initialState, addIngredient(ingredient));

			expect(newState.ingredients).toHaveLength(1);
			expect(newState.ingredients[0]).toEqual({
				...ingredient,
				id: expect.any(String),
			});
		});

		test("добавление булки", () => {
			const bun = {
				_id: "643d69a5c3f7b9001cfa093d",
				name: "Флюоресцентная булка R2-D3",
				type: "bun",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/bun-01.png",
				image_mobile:
					"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
				image_large:
					"https://code.s3.yandex.net/react/code/bun-01-large.png",
				__v: 0,
			};

			const newState = reducer(initialState, addIngredient(bun));

			expect(newState.bun).toEqual({
				...bun,
				id: expect.any(String),
			});
		});
	});

	describe("тестирование экшена removeIngredient", () => {
		test("удаление ингредиента", () => {
			const stateWithIngredients = {
				...initialState,
				ingredients: [
					{
						id: "123",
						_id: "643d69a5c3f7b9001cfa0946",
						name: "Хрустящие минеральные кольца",
						type: "main",
						proteins: 808,
						fat: 689,
						carbohydrates: 609,
						calories: 986,
						price: 300,
						image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
						image_mobile:
							"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
						image_large:
							"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
						__v: 0,
					},
				],
			};

			const newState = reducer(
				stateWithIngredients,
				removeIngredient("123")
			);

			expect(newState.ingredients).toHaveLength(0);
		});
	});

	describe("тестирование экшена moveIngredient", () => {
		const ingredients = [
			{
				id: "1",
				_id: "643d69a5c3f7b9001cfa0947",
				name: "Плоды Фалленианского дерева",
				type: "main",
				proteins: 20,
				fat: 5,
				carbohydrates: 55,
				calories: 77,
				price: 874,
				image: "https://code.s3.yandex.net/react/code/sp_1.png",
				image_mobile:
					"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
				image_large:
					"https://code.s3.yandex.net/react/code/sp_1-large.png",
				__v: 0,
			},
			{
				id: "2",
				_id: "643d69a5c3f7b9001cfa0948",
				name: "Кристаллы марсианских альфа-сахаридов",
				type: "main",
				proteins: 234,
				fat: 432,
				carbohydrates: 111,
				calories: 189,
				price: 762,
				image: "https://code.s3.yandex.net/react/code/core.png",
				image_mobile:
					"https://code.s3.yandex.net/react/code/core-mobile.png",
				image_large:
					"https://code.s3.yandex.net/react/code/core-large.png",
				__v: 0,
			},
			{
				id: "3",
				_id: "643d69a5c3f7b9001cfa0949",
				name: "Мини-салат Экзо-Плантаго",
				type: "main",
				proteins: 1,
				fat: 2,
				carbohydrates: 3,
				calories: 6,
				price: 4400,
				image: "https://code.s3.yandex.net/react/code/salad.png",
				image_mobile:
					"https://code.s3.yandex.net/react/code/salad-mobile.png",
				image_large:
					"https://code.s3.yandex.net/react/code/salad-large.png",
				__v: 0,
			},
		];

		test("перемещение ингредиента вверх", () => {
			const stateWithIngredients = {
				...initialState,
				ingredients: [...ingredients],
			};

			const newState = reducer(
				stateWithIngredients,
				moveIngredient({ index: 1, upwards: true })
			);

			expect(newState.ingredients[0].id).toBe("2");
			expect(newState.ingredients[1].id).toBe("1");
			expect(newState.ingredients[2].id).toBe("3");
		});

		test("перемещение ингредиента вниз", () => {
			const stateWithIngredients = {
				...initialState,
				ingredients: [...ingredients],
			};

			const newState = reducer(
				stateWithIngredients,
				moveIngredient({ index: 1, upwards: false })
			);

			expect(newState.ingredients[0].id).toBe("1");
			expect(newState.ingredients[1].id).toBe("3");
			expect(newState.ingredients[2].id).toBe("2");
		});
	});

	describe("тестирование экшена resetConstructor", () => {
		test("сброс состояния конструктора", () => {
			const stateWithData = {
				bun: {
					_id: "643d69a5c3f7b9001cfa093c",
					name: "Краторная булка N-200i",
					type: "bun",
					proteins: 80,
					fat: 24,
					carbohydrates: 53,
					calories: 420,
					price: 1255,
					image: "https://code.s3.yandex.net/react/code/bun-02.png",
					image_mobile:
						"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
					image_large:
						"https://code.s3.yandex.net/react/code/bun-02-large.png",
				},
				ingredients: [
					{
						id: "1",
						_id: "643d69a5c3f7b9001cfa0947",
						name: "Плоды Фалленианского дерева",
						type: "main",
						proteins: 20,
						fat: 5,
						carbohydrates: 55,
						calories: 77,
						price: 874,
						image: "https://code.s3.yandex.net/react/code/sp_1.png",
						image_mobile:
							"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
						image_large:
							"https://code.s3.yandex.net/react/code/sp_1-large.png",
						__v: 0,
					},
					{
						id: "2",
						_id: "643d69a5c3f7b9001cfa0948",
						name: "Кристаллы марсианских альфа-сахаридов",
						type: "main",
						proteins: 234,
						fat: 432,
						carbohydrates: 111,
						calories: 189,
						price: 762,
						image: "https://code.s3.yandex.net/react/code/core.png",
						image_mobile:
							"https://code.s3.yandex.net/react/code/core-mobile.png",
						image_large:
							"https://code.s3.yandex.net/react/code/core-large.png",
						__v: 0,
					},
					{
						id: "3",
						_id: "643d69a5c3f7b9001cfa0949",
						name: "Мини-салат Экзо-Плантаго",
						type: "main",
						proteins: 1,
						fat: 2,
						carbohydrates: 3,
						calories: 6,
						price: 4400,
						image: "https://code.s3.yandex.net/react/code/salad.png",
						image_mobile:
							"https://code.s3.yandex.net/react/code/salad-mobile.png",
						image_large:
							"https://code.s3.yandex.net/react/code/salad-large.png",
						__v: 0,
					},
				],
			};

			const newState = reducer(stateWithData, resetConstructor());

			expect(newState.bun).toBeNull();
			expect(newState.ingredients).toHaveLength(0);
		});
	});
});
