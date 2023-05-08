const { Given, When, Then } = require("@cucumber/cucumber");
const { spec, expect} = require("pactum");

// Free subscription api key
const apiKeyValid = "Im6xov9THPyODNOqQ692cOUnZPXgP93K"

this.baseUrl = "https://api.apilayer.com/exchangerates_data/latest"
const url = this.baseUrl

Given("user has valid api key", function () {
});

When("user sends GET request to api url", async function () {
    this.response = await spec()
        .get(url)
        .withHeaders('apikey', apiKeyValid);
});

Then("response code should be 200", function () {
    expect(this.response).should.have.status(200);
    expect(this.response).should.have.jsonLike({
        "success": true,
        "base": "EUR"
    });
});

Given("user try to get invalid currency", function () {
});

When("user sends GET request to api with invalid currency", async function () {
    this.response = await spec()
        .get(url)
        .withHeaders('apikey', apiKeyValid)
        .withQueryParams('symbols', 'ABC');
});

Then("response code should be 400", function () {
    expect(this.response).should.have.status(400);
    expect(this.response).should.have.jsonLike({
        "error": {
            "code": "invalid_currency_codes",
        }
    });
});

Given("user sends request without proper credentials", function () {
});

When("user sends GET request to api url without apikey", async function() {
    this.response = await spec()
        .get(url)
        .withHeaders('apikey', "");
});

Then("response code should be 401", function () {
    expect(this.response).should.have.status(401);
    expect(this.response).should.have.jsonLike({
        "message": "No API key found in request"
    });
});

Given("user don't have right permissions", function () {
});

When("user sends POST request to api url", async function () {
    this.response = await spec()
        .post(url)
        .withHeaders('apikey', apiKeyValid);
});

Then("response code should be 403", function () {
    expect(this.response).should.have.status(403);
    expect(this.response).should.have.jsonLike({
        "message": "You cannot consume this service"
    });
});

Given("user sends request to wrong endpoint", function () {
    this.baseUrl = "https://api.apilayer.com/exchangerates_data_test/latest";
});

When("user sends GET request to corrupted endpoint", async function () {
    this.response = await spec()
        .get(this.baseUrl);
});

Then("response code should be 404", function () {
    expect(this.response).should.have.status(404);
    expect(this.response).should.have.jsonLike({
        "message": "no Route matched with those values"
    });
});