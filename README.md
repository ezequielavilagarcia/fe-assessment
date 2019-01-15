# Fe-assessment
This is a frontend assessment developed with Ionic 4 and Angular 7 to AXA. They are playing a fantasy role-playing game and every time the heroes they play arrive at a town, they have the issue they don't know the local population and what they can do to help them on their adventures.

All de data is provided from here https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json

# First steps

First at all run npm install, after that you can run ionic serve.

At the beginning a page with personal information is opened simulating a login page. You could stay logged checking Stayed logged in checkbox. If you don't check the checkbox, when you close the app or refresh the browser you will need loggin again.
Depending on the race and the gender that you select, you will see a diferent card in my character tab.

# Inside the game - Town

Once you login, you will appair in the town, there you can see an image to imagine how the town called Brastlewark looks like. And an strange man gives you your welcome to the town, he is so kind and strange because he knows your name.

Then you can move to other two places, you could visit an inhabitant or you can see your character information

# Visiting an inhabitant - Inhabitants list tab
First at all you need know which person can you visit, so in this tab there are two alternatives.
First if an error happens in the external server which provide all the inhabitants data, you will see an image with no people, and a message telling you that the town is empty now..
But if everything goes okey, here is where comes the second alternative and you will find all the inhabitants information that you need.

This is loaded in lazy mode because it's a lot of information at once, and I prefered to improve the performance.

To find the gnome that you are looking for you can apply a lot of differents filters, first on the toolbar you will see a search bar, which filter by name, it search in the list of inhabitants for a name that contain the word that you wrote, so it's really usefull.

You also can click on the filter icon, that is next to the searchbar and there you could sort data by name or alse filter all the data by age range, weight range, height range, hair colors or professions..

When a filter is active you will see a list of badges under the searchbox in inhabitants list page, indicating which filters are active.. And also the filter icon change his color from red to green.

All the filters can be concatenated and works like 'and' logic between differents filters..
If we are working with the same filter, for example hair colors with two diferents values, this filters work like 'or' logic.. You will search an inhabitants that have one of the hair colors that you selected.

Once you apply all the filter that you need, you can select on an inhabitant record, and you will see the inhabitant detail information..

# Inhabitant detail page

Here is all the information of an inhabitant that you selected in the previous page.

# My character tab

Here is where you can see all of your character information, this information comes from the login page..
The image of your character depends on race and gender values that you selected before.

Here you can logout and create another character.

# Testing
To test the app I use Jasmine and Karma. I write a lot of unit tests and also some integrated tests.
To run the test run 'npm test'

# Documentation
The code is self-documentary, I also add this document to explain all the functionality, and you can find in the code some blocks of comments where really is needed.

# Requirements
Here are the app requirements
https://docs.google.com/document/d/1EtMIpJm2KWPK_FiDTBzl8us-2J0jGTmZF9SZ0FGWeRA/edit?usp=sharing

# App screenshots
Town tab
https://drive.google.com/file/d/1QTaXEEW72fY8mytiKhX_PW9vYd82dHl5/view?usp=sharing
Inhabitants tab with filters apply
https://drive.google.com/file/d/1wBtiS24EA9Sntar6U8lRIrBY7Y7kNL95/view?usp=sharing
Hero tab
https://drive.google.com/file/d/1_s0uVQQDIZ_tDqE-Gcg3a4ZuD_NpJn6-/view?usp=sharing

