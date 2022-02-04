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
- [x] Add Css for mobile
- [ ] Add parsing for the new public course search website

## Known issues
NYU course search sucks ([found here](https://m.albert.nyu.edu/app/catalog/classSearch)). While I can technically write a back-end that logs into my nyu account and go through the official albert tool (which sucks), this method is way too slow. One idea is to parse through all the courses at a set time and cache the result (search through every 1-5 minutes, can be done using concurrency) but this will take a while to code. Unfortunately in the mean time, certain schools (notably Tandon) might not be able to look at their courses. I'm going to leave the option available if NYU decided to fix their website.

## Issues or Want to contribute?
If you have an issue, pose an issue in the github issue tab and I will get to it when I have the time. If you want to contribute, pose an issue to specify what you want to do and fork the repository. All is welcomed! See [CONTRIBUTING.md](CONTRIBUTING.md) for details on both.

