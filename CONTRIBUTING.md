# Contributing Guide

Hi! We're really excited that you're interested in contributing to ProseKit! Before submitting your contribution, please read through the following guide.

You can use [StackBlitz Codeflow](https://stackblitz.com/codeflow) to fix bugs or implement features. If you'd like to learn more, check out the [Codeflow docs](https://developer.stackblitz.com/codeflow/what-is-codeflow).

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://pr.new/prosekit/prosekit)

## Setup

1. Ensure you have Node.js 18 or later installed.
2. Run `corepack enable` to enable [Node.js Corepack](https://github.com/nodejs/corepack).
3. Clone the ProseKit repository.
4. Run `pnpm install` in ProseKit's root folder.

## Development

To develop locally, run `pnpm run dev` in ProseKit's root folder. This will start two web servers:

1. website (usually http://localhost:5173/): The documentation website.
2. playground (usually http://localhost:4321/astrobook/): A collection of examples to showcase and test the features.

Alternatively, you can run `pnpm run website` or `pnpm run playground` to start the website or playground server respectively.

You need to run `pnpm run gen` to generate some files if you add new examples under `playground/src/examples/`.

## Test

ProseKit includes unit tests and integration tests. To run the tests, you can use the following commands:

- `pnpm run test:install` to install Playwright, which is required for running unit and integration tests.
- `pnpm run test` to run all unit tests.
- `pnpm run test:e2e` to run all integration tests.

## Pull Requests

Please title your GitHub pull requests using the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style.

For managing our project's versions and changelogs, we use a tool called [Changesets](https://github.com/changesets/changesets). After making your changes, run `pnpm run change` in the ProseKit root folder. This command will guide you to create a small file that describes your changes.
