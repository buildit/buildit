---
# The title should just be the city's name and must also match the city name as it
# appears in the SmartRecruiters data used for the job listings.
title: London
# URI slug for this location which gets appended to https://buildit.wiprodigital.com/thing/studio/[xx]/
citySlug: london
address:
  line1: 2 Finsbury Avenue
city: London
postcode: EC2M 2PA
postcodePosition: below # Postcode appears below city
country: UK
countryCode: gb # ISO 3166-1 alpha-2
img: 
  url: https://maps.googleapis.com/maps/api/staticmap?format=jpg&key=AIzaSyAa-P3u_B9zTs_DJ_dXRK5og7r3_n7vlT0&maptype=roadmap&scale=2&size=425x300&markers=51.51993868691731,-0.08485094876959921&zoom=17
  alt: Map showing the location of the London studio
map: https://www.google.com/maps/place/2+Finsbury+Ave,+London+EC2M+2PA/@51.5201019,-0.0871868,17z/data=!3m1!4b1!4m5!3m4!1s0x48761cadd0fdb387:0xa8fcbacd368e31b6!8m2!3d51.5201019!4d-0.0849981
layout: basic-page.njk
blocks-njk:
  main: layouts/partials/location/main.njk
  mainWrapper: layouts/partials/location/main-wrapper.njk
collection: colLocations
---
