# Contributing
Before contributing to this project, please make an issue with the appropriate tags and specify what changes you want to make. Any pull request without prior issues will not be merged. The issue should have a title that summarize the change and its content should specify the details. 

If you are reporting a bug, make sure to provide details on how to recreate the bug. All bugs should be reported at this repository regardless of whether or not it's a front-end or back-end bug. 

## Coding Style
For React, you must use state hook and functional component. Class components are out-dated and should only be used by external libraries or absolutely necessary. All variables should not begin capitalized. If a variable is not changed after declaration or definition, prefer `const` over `let`. Always prefer `let` over `var` unless the use of latter greatly simplify the code.

For the back-end Flask server. Make sure to separate the implementation and the routing. All API endpoints should be named according in their functionality (For example: /rmp/getProf means we are using ratemyprofessor feature and getting a professor's information). An API endpoint should be well documented, this includes the method (GET/POST), parameter/body, and their response. All responses should be in JSON format. 

Finally, make sure to document your code. Non-trivial functions should have documentation on their usage and arguments.