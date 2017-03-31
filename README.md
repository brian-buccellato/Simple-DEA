# CredSimple Front-end Exercise

This exercise is comprised of multiple parts, and should be done in order.


## 1.  Debug

We've provided `csUtils.js` which handles all AJAX calls to one of the CredSimple APIs.

This JavaScript has some problems in it that we want you to debug and fix.

Fix any style or functionality problems with `csUtils.js`.

The data you receive from the API is a list of DEA records (Drug Enforcement Administration licenses that authorize doctors & nurses to write prescriptions)

## 2.  Implement

We'd like to simulate the process of creating a product at CredSimple.  The
following specifies a new product we'd like you to create, and the product
requirements.

Create a product called SimpleDEA that has the following requirements:

* Show the top 30 DEA records displayed by the name attribute but sorted by expiration date.

* Use your corrected version of `csUtils.js` from above to make API calls.

* A button must exist that allows the user to show only DEA records that have expired as of today.

* Each record's name in the list (found in the API via `record.name`) must be followed by the expiration status of the record (resolved via `record.expiration_date`).

* Each expiration status must be formatted/styled to indicate visually to the user that the record it is either active (expiration date has not passed) or expired (expiration date has passed)

* When an item in the list is clicked, it must show only the container with its full data profile (see diagram below).

  * Each record must include its DEA number (via `record.dea_number`), NPI (via `record.npi`), Expiration Date (via `record.expiration_date`) and Provider ID (via `record.provider_id`).

  * When showing the DEA record container it must expand and collapse beneath the record's row.

  * If someone clicks on a DEA record it must collapse the currently visible container, so that there is only one visible at a time.


Use the following wireframe as a general guide. Your solution may look slightly different, use your skill/judgement to decide what communicates the intent of this feature most clearly:

<pre>
-----------------------------------------------------------
| SimpleDEA                         [show expired button] |
-----------------------------------------------------------
| ### Provider 1                    [ expiration status ] |
| ### Provider 2                    [ expiration status ] |
| ### Provider 3                    [ expiration status ] |
|   ----------------------------------------------------  |
|   | ### DEA number         | ### Expiration Date     |  |
|   | ### NPI                | ### Provider ID         |  |
|   ----------------------------------------------------  |
| ### Provider 4                    [ expiration status ] |
| ### Provider 5                    [ expiration status ] |
| ### Provider 6                    [ expiration status ] |
| ### Provider 7                    [ expiration status ] |
| ### Provider 8                    [ expiration status ] |
| ### Provider 9                    [ expiration status ] |
| ### Provider ...30                [ expiration status ] |
-----------------------------------------------------------
</pre>


**Rules:**

 * Please do NOT use jQuery or any other frameworks/languages (i.e. use pure JavaScript). We want to see your raw JavaScript knowledge.

 * You are the product designer for this application. Create a design that showcases your CSS knowledge (using only CSS, no preprocessors).

 * It should work in modern (HTML5) browsers. Focus on Chrome, Firefox, and Safari. IE compatibility is not required.


**What We're Looking For:**

 * Proper architecture and code craft, such that it can scale to add new features easily.

 * The ability for this application to display data accurately and communicate clearly to the user.

## Good Luck!
