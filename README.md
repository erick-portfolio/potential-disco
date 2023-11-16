# WolfpackWireClone

## Introduction

Welcome to WolfpackWireClone, a user-friendly web application designed to aggregate and display all the latest NC State Athletic news in one convenient location. This application is a one-stop solution for fans and followers of NC State Athletics, offering up-to-date information from various trusted sources. Whether you're looking for the latest game scores, player updates, or general news about the NC State Wolfpack, WolfpackWireClone brings it all together seamlessly.

Built using modern web technologies such as React, TypeScript, and AWS Amplify, this application offers a robust and scalable platform. The intuitive user interface and responsive design ensure a great experience across various devices, making it easy for users to stay informed on the go.

The backend architecture leverages the power of cloud computing to fetch, transform, and store data from diverse sources, ensuring the data is always current and reliable. The application's modular design also allows for easy expansion and integration of additional sources, ensuring it remains a versatile tool for any NC State Athletics enthusiast.

In this documentation, we'll guide you through every step needed to set up, configure, and deploy your instance of WolfpackWireClone.

# Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Configuration](#configuration)
   - [Configuring .env Variables](#configuring-env-variables)
   - [Configuring Source Feeds](#configuring-source-feeds)
4. [Deployment](#deployment)
   - [Deploying with Amplify](#deploying-with-amplify)
   - [CI/CD Integration](#cicd-integration)
5. [License](#license)
6. [Acknowledgments](#acknowledgments)

---

# Getting Started

This section provides all the necessary information to get WolfpackWireClone up and running on your system. From prerequisites to installation, follow these steps to set up the application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js
- yarn
- Git
- AWS Account with Amplify and S3 access

## Installation

To install WolfpackWireClone, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/erick-portfolio/potential-disco WolfpackWireClone
   cd WolfpackWireClone
   ```

1.  Install the dependencies:

    ```bash
    yarn
    ```

2.  Configure the AWS Amplify environment:

    ```bash
    amplify configure
    ```

3.  Initialize the Amplify project:

    ```bash
    amplify init
    ```

4.  Deploy the backend resources (if any):

    ```bash
    amplify push
    ```

5.  Start the application locally:
    ```bash
    yarn run start
    ```

The application should now be running on `http://localhost:3000`.

Configuration
=============

Setup
-----------------

## Configuring `.env` Variables

The WolfpackWireClone application requires certain environment variables set in a `.env` file located at the project's root. These variables are essential for the app's functionality and customization. Below is an in-depth explanation of each variable in the `.env` file.

### Template for the `.env` File

```plaintext
REACT_APP_RSS_CONFIG=...
REACT_APP_BRAND_TEXT="WolfpackWireClone"
REACT_APP_DISCLAIMER="..."
GENERATE_SOURCEMAP=false
```
### explanation of Variables

1.  `REACT_APP_RSS_CONFIG`: This variable holds the configuration for the RSS feeds displayed in the application. It is a JSON string representing an array of objects. Each object contains details about an RSS feed source. Here's the format:

    ```json
    [
      {
        "homepage": "https://example.com/",
        "title": "Example Feed",
        "s3FileKey": "Example.content.json"
      },
    ]
    ```

    -   `homepage`: The URL of the website associated with the RSS feed.
    -   `title`: A descriptive title for the RSS feed.
    -   `s3FileKey`: The key of the corresponding content file in the S3 bucket.
2.  `REACT_APP_BRAND_TEXT`: This string variable defines the branding text for the application. It is displayed prominently in the navbar and potentially in other parts of the UI. Example value: `"WolfpackWireClone"`.

3.  `REACT_APP_DISCLAIMER`: This variable contains a disclaimer or additional information you want to show in the application's footer. Useful for legal notices or acknowledgments. Example: `"WolfpackWireClone - A website that aggregates all NC state Athletic news. This is not an official website of NC State University. All content is owned by their respective owners."`

4.  `GENERATE_SOURCEMAP`: A boolean flag (set to `false` to disable) that controls the generation of source maps during the build process. It can be useful for debugging but may be turned off for production builds for performance and security reasons.

### Filling in the Values

Substitute the placeholders in the template with the actual values suited to your application's configuration. Ensure JSON strings, like `REACT_APP_RSS_CONFIG`, are correctly formatted to avoid parsing errors.

### Important Notes

-   Changes to the `.env` file require a restart of the development server to become effective.

## Configuring Source Feeds

The `sourcesConfig.js` file is a crucial part of WolfpackWireClone, allowing you to define and manage the various content sources for your application. This file contains an array of objects, each representing a different content source.

### Structure of `sourcesConfig.js`

Each object in the `sourcesConfig` array represents a single content source and should have the following properties:

- `name`: A unique identifier for the source. This is used internally and for naming the generated content files.
- `url`: The URL of the content source. This could be a website URL or an RSS feed URL.
- `responseType`: The type of response expected from the URL. Common types are `'text'`, `'json'`, and `'xml'`.
- `itemType`: The type of content being processed. This is used to determine how to parse and transform the data. Common types are `'html'`, `'json'`, `'rss'`, and `'rss-atom'`.
- `customTransform` (optional): A function to customize how the data from the source is transformed into a standardized format. This is used for more complex sources or when specific data extraction is needed.

### Example Object

Here's an example of a source object for an HTML content type:

```javascript
{
  name: 'ExampleSource',
  url: 'https://example.com/news',
  responseType: 'text',
  itemType: 'html',
  customTransform: function (html) {
    // Custom transformation logic
  }
}
```

### Adding a New Source

To add a new source to your application:

1.  Create a new object in the `sourcesConfig` array.
2.  Define the `name`, `url`, `responseType`, `itemType`, and `customTransform` properties according to the source you are adding.
3.  If a custom transformation function is needed, implement it in the `customTransform` property.

### Updating an Existing Source

To update an existing source:

1.  Locate the object corresponding to the source in the `sourcesConfig` array.
2.  Modify the properties as needed. For example, you might update the `url` or adjust the `customTransform` function.

### Removing a Source

To remove a source:

1.  Find the object for the source you wish to remove in the `sourcesConfig` array.
2.  Delete the entire object.

Remember, changes to `sourcesConfig.js` will require you to redeploy the application for the changes to take effect.


Deployment
==========

Deploying with Amplify
----------------------

AWS Amplify streamlines the process of deploying WolfpackWireClone. To deploy your application:

1.  Run the following command:

    ```bash
    amplify publish
    ```

2.  Follow the on-screen instructions to complete the deployment.

Your application will be hosted on an AWS Amplify domain, which you can then access from anywhere.

CI/CD Integration
-----------------

For continuous integration and delivery, you can set up a CI/CD pipeline using AWS Amplify. This ensures that every commit to your repository triggers an automatic build and deploy process.


License
=======

WolfpackWireClone is released under the MIT License. For more details, see the `LICENSE` file.

Acknowledgments
===============

Special thanks to Ma for the inspiration and support.