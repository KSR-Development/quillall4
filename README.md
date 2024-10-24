# QuillAll Refactor

The software required refactoring in order to deploy to AWS without errors. The deployed app is now available [here](http://quillall-aws-env.eba-3mdctcb2.eu-north-1.elasticbeanstalk.com/).

### Fixes:

- Updated "reactflow" package to correct new path "@xyflow/react" to fix the "ResizeObserver loop completed with undelivered notifications" error.

- Removed resize observer error code in index.html that was causing further errors.

- Fixed edges between nodes not displaying on new "@xyflow/react" by adding appropriate "id" attribute to Handle component.

- Replaced ReactDOM.render with createRoot to correctly run as React 18 (was running as 17 for back compatibility with this before).

- Removed unused Tailwind dependecy - this was outdated and can easily be added back if needed.

- Removed duplicate App.js and App.css files.

- Reduced application size from 1.41 GB to 672 MB by removing unused code and dependencies.

- Fixed all smaller issues that resulted in build or runtime errors for a clean deployment.

### Usage:

- To install node packages run `npm install`, `cd client` and `npm install` again.

- To run in development mode run `npm run dev`. With this, the frontend sends API requests to the local version of the server.

- Depending on your configuration, you may need to set the environment variable for the OpenAI API:
  - PowerShell: `$env:OPENAI_API_KEY="api_key_here"`
  - Mac Terminal: `export OPENAI_API_KEY=api_key_here`

- To deploy to AWS Elastic Beanstalk, zip only the files tracked by git and upload the zipped folder to AWS.

### Directory

- `.ebextensions/` contains configuration for AWS Elastic Beanstalk.

- `server/` contains the Express server used for handling OpenAI API calls.

- `package.json` contains the dependecies needed to run the server.

- `client/` contains the React front end, with additional dependencies in a package.json just for the front end.
