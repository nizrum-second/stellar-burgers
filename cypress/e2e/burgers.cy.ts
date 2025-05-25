const API_URL = "https://norma.nomoreparties.space/api";
const BUN1_ID = `[data-cy=${"643d69a5c3f7b9001cfa093c"}]`;
const BUN2_ID = `[data-cy=${"643d69a5c3f7b9001cfa093d"}]`;
const FILLING_ID = `[data-cy=${"643d69a5c3f7b9001cfa0941"}]`;

beforeEach(() => {
	cy.intercept("GET", `${API_URL}/ingredients`, {
		fixture: "ingredientsMock.json",
	});
	cy.intercept("POST", `${API_URL}/auth/login`, {
		fixture: "userMock.json",
	});
	cy.intercept("GET", `${API_URL}/auth/user`, {
		fixture: "userMock.json",
	});
	cy.intercept("POST", `${API_URL}/orders`, {
		fixture: "orderMock.json",
	});
	cy.visit("/");
	cy.get("#modals").as("modal");
});

describe("тестирование добавления ингредиента в заказ", () => {
	it("изменение счетчика ингредиента", () => {
		cy.get(FILLING_ID).children("button").click();
		cy.get(FILLING_ID).find(".counter__num").contains("1");
	});
	describe("добавление булок и начинок", () => {
		it("добавление булки и начинки в заказ", () => {
			cy.get(BUN1_ID).children("button").click();
			cy.get(FILLING_ID).children("button").click();
		});
		it("добавление булки после добавления начинок", () => {
			cy.get(FILLING_ID).children("button").click();
			cy.get(BUN1_ID).children("button").click();
		});
	});
	describe("замена булок", () => {
		it("замена булки другой булкой при пустом списке начинок", () => {
			cy.get(BUN1_ID).children("button").click();
			cy.get(`[data-cy='constructor-pos-top']`).contains(
				"Краторная булка N-200i"
			);
			cy.get(BUN2_ID).children("button").click();
			cy.get(`[data-cy='constructor-pos-top']`).contains(
				"Флюоресцентная булка R2-D3"
			);
		});
		it("замена булки другой булкой при полном списке начинок ", () => {
			cy.get(BUN1_ID).children("button").click();
			cy.get(`[data-cy='constructor-pos-top']`).contains(
				"Краторная булка N-200i"
			);
			cy.get(FILLING_ID).children("button").click();
			cy.get(BUN2_ID).children("button").click();
			cy.get(`[data-cy='constructor-pos-top']`).contains(
				"Флюоресцентная булка R2-D3"
			);
		});
	});
});

describe("тестирование оформления заказа", () => {
	beforeEach(() => {
		window.localStorage.setItem("refreshToken", "someRefreshToken");
		cy.setCookie("accessToken", "someAccessToken");
		cy.getAllLocalStorage().should("be.not.empty");
		cy.getCookie("accessToken").should("be.not.empty");
	});
	afterEach(() => {
		window.localStorage.clear();
		cy.clearAllCookies();
		cy.getAllLocalStorage().should("be.empty");
		cy.getAllCookies().should("be.empty");
	});

	it("оформление заказа c проверкой корректности ответа и очистки конструктора бургера от добавленных ингредиентов", () => {
		cy.get(BUN1_ID).children("button").click();
		cy.get(FILLING_ID).children("button").click();
		cy.get(`[data-cy='order-button']`).click();
		cy.get(`[data-cy='login-button']`).click();
		cy.get(`[data-cy='order-button']`).click();
		cy.get("@modal").find("h2").contains("77777");
		cy.get("@modal").find("button").click();
		cy.get("@modal").should("be.empty");
		cy.get(`[data-cy='burger-constructor']`).contains("Выберите булки");
		cy.get(`[data-cy='burger-constructor']`).contains("Выберите начинку");
	});
});

describe("тестирование модальных окон", () => {
	it("открытие и отображение данных в модальном окне ингредиента", () => {
		cy.get("@modal").should("be.empty");
		cy.get(FILLING_ID).children("a").click();
		cy.get("@modal").should("be.not.empty");
		cy.url().should("include", "643d69a5c3f7b9001cfa0941");
	});
	it("закрытие модального окна ингредиента по клику на крестик", () => {
		cy.get("@modal").should("be.empty");
		cy.get(FILLING_ID).children("a").click();
		cy.get("@modal").should("be.not.empty");
		cy.get("@modal").find("button").click();
		cy.get("@modal").should("be.empty");
	});
	it("закрытие модального окна ингредиента по клику на оверлей", () => {
		cy.get("@modal").should("be.empty");
		cy.get(FILLING_ID).children("a").click();
		cy.get("@modal").should("be.not.empty");
		cy.get(`[data-cy='overlay']`).click({ force: true });
		cy.get("@modal").should("be.empty");
	});
	it("закрытие модального окна ингредиента по нажатию на «Escape»", () => {
		cy.get("@modal").should("be.empty");
		cy.get(FILLING_ID).children("a").click();
		cy.get("@modal").should("be.not.empty");
		cy.get("body").trigger("keydown", { key: "Escape" });
		cy.get("@modal").should("be.empty");
	});
});
