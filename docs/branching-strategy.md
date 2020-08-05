# Branching strategy

## `master` branch

The `master` branch always holds the most recent code and should always be in a releasable state (i.e. all commits that get merged into `master` have build cleanly, pass tests and have been peer-reviewed).

Our [build and deploy pipeline](./build-deploy-pipeline.md) is configured to automatically build every commit to the `master` branch and deploy it to our staging URL: [https://www-staging.buildit.digital/](https://www-staging.buildit.digital/)

When the contents of `master` need to be deployed to the live website URL ([https://buildit.wiprodigital.com/](https://buildit.wiprodigital.com/)), one of [the maintainers](https://github.com/orgs/buildit/teams/buildit-website-maintainers) will tag that commit.

## Feature branches

Contributors making changes or adding new features should always create a feature branch (with a short, descriptive kebab-case name) off of the current `HEAD` of `master`. These are short-lived branches that are deleted once the feature is complete and has been merged.

Only do one feature per branch. If you are working on several things in parallel, create separate branches for each.

Once ready for review, the feature branch should be pushed to this Github repo and a pull request should be raised.

The maintainers will then review the PR and either merge into develop (and then delete that feature branch), or request additional changes.

See: [buildit website's contribution guidelines](../CONTRIBUTING.md)



## Long-running feature branches

This should be the exception rather than the rule, but if major work is being undertaken - for instance a substantial refactoring of the code or a major redesign - then a long-running feature branch should be created off of `master`. Smaller units of work (and associated PRs) can then be branched off of and merged back into that long-running feature branch.

If necessary, a branch-specific staging environment can also be set-up so that changes can be tested and previewed separate from the website's usual staging URL.

For example, the work to create version 4 of the website followed this pattern using the `beta` branch and associated https://www-beta.buildit.digital/ URL.
