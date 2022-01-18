[![HUNTINGHOUND](https://circleci.com/gh/HUNTINGHOUND/nyuschedule.svg?style=svg)](https://app.circleci.com/pipelines/github/HUNTINGHOUND/nyuschedule)
# NYU Schedule
A web app that crawls the albert public course search website to get easily gather course information. It's built with a calendar that students can use to better visualize their schedule.

## Demo
The application is currently hosted on [github pages](https://huntinghound.github.io/nyuschedule/).

### Latency issue
Please note that I'm hosting the back-end on a free heroku server so it's not the fastest of apps. Heroku puts a server to sleep if it idles for too long. Therefore, sometimes a request might take longer then usual. Please be patient and wait for about 30 seconds or so. (If a request is not responded within 30 seconds, something is wrong).

## Build it yourself?
Clone this repo, go to the root directory and run `npm install` (if this fails try to delete `package-lock.json` and/or update npm). Once all the dependencies are installed, run `npm start` to serve the application on your local network.


## TODOS
- [x] Better Styling for the calendar through css and custom components
- [ ] Complete keyword filter option (keyword option does nothing at the time of writing)
- [ ] More filter options
- [ ] Use local storage to save options
- [ ] Backend unit-testing
- [ ] Frontend unit-testing
- [x] Documentation of the code
- [ ] Login feature? (TBD)
- [ ] Add more error handling
- [ ] Add Css for mobile

## Issues or Want to contribute?
If you have an issue, pose an issue in the github issue tab and I will get to it when I have the time. If you want to contribute, pose an issue to specify what you want to do and fork the repository. All is welcomed! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on both.

