## Background (august '22)

HOW DO I USE JUST THE TYPES THAT I NEED WHILE KEEPING ALL TYPES IN A SINGLE PACKAGE? SHOULD I?

What's the disadvantage of splitting up k-types into multiple smaller packages? in the end it should be fine to have much smaller operations. Currently, one big k-types package is only handy because some are quite interconnected and in the beginning it was handy because it made it more flexible and easier to find. But now that it's more stable I can easily split off the PassionFruit stuff from the King OS types

## Update:

I've finally split up k-types into some different packages.

The reason for this is that I don't want too many types to end up in the dependencies of other packages, and I am experimenting a lot with new types, in which I place lots of interesting comments. I don't want to share that publicly.

## Update (21 sept '22)

Some types will not be in the `/types` folder anymore. It is not needed, and I've discovered it's also a great convention to keep `types`, `functions` and `web` (and optionally `ui`) in one single folder. Everything together. Just 3 or 4 (or more) packages can make a whole full-stack app now! This makes it much clearer...
