---
# The title should just be the city's name and must also match the city name as it
# appears in the SmartRecruiters data used for the job listings.
title: Denver
# URI slug for this location which gets appended to https://buildit.wiprodigital.com/thing/studio/[xx]/
citySlug: denver
address:
  line1: WeWork Tabor Center
  line2: 1200 17th Street
  line3: Floor 10, Room 161
city: Denver
postRegion: CO
postcode: 80202
postcodePosition: below # postRegion + postcode appear below city
country: USA
countryCode: us # ISO 3166-1 alpha-2
img: 
  url: https://maps.googleapis.com/maps/api/staticmap?format=jpg&key=AIzaSyAa-P3u_B9zTs_DJ_dXRK5og7r3_n7vlT0&maptype=roadmap&scale=2&size=425x300&markers=39.7491649,-104.9961904&zoom=16
  alt: Map showing the location of the Denver studio
map: https://www.google.com/maps/place/WeWork/@39.7491364,-104.9982773,16.98z/data=!4m5!3m4!1s0x876c796434f3a3ed:0x91c7f1e0ef0abb98!8m2!3d39.7491649!4d-104.9961904
layout: basic-page.njk
blocks-njk:
  main: layouts/partials/location/main.njk
  mainWrapper: layouts/partials/location/main-wrapper.njk
collection: colLocations
---
