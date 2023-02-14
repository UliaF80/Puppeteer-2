Feature: ToBook a ticket
    Scenario: Should book ticket
        Given: user is on "/navigation" page
        When: user clicks on day and time, on 8 row and 2 chair and on "Забронировать" button
        Then: user sees the text "Вы выбрали билеты:"

    Scenario: Should book two tickets
    Given: user is on "/navigation" page
    When: user clicks on day and time, on 8 row and 2 chair and 3 chair and on "Забронировать" button
    Then: user sees the text "Вы выбрали билеты:"

    Scenario:Should disabled
    Given: user is on "/navigation" page
    When: user clicks on day and time, on 8 row and chair_taken
    Then: user can't book