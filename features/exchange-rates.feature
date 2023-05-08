Feature: Exchange Rates Latest API

    Scenario: Get latest exchange rates with valid credentials
        Given user has valid api key
        When user sends GET request to api url
        Then response code should be 200

    Scenario: Get latest exchange rates for invalid currency
        Given user try to get invalid currency
        When user sends GET request to api with invalid currency
        Then response code should be 400

    Scenario: Get latest exchange rates with without credentials
        Given user sends request without proper credentials
        When user sends GET request to api url without apikey
        Then response code should be 401

    Scenario: Try to edit latest exchange rates without given permision
        Given user don't have right permissions
        When user sends POST request to api url
        Then response code should be 403

    Scenario: Get latest exchange rates with corrupted endpoint
        Given user sends request to wrong endpoint
        When user sends GET request to corrupted endpoint
        Then response code should be 404

    
