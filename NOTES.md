#### Git structure
For the sake of the assessment, both applications (front-end and back-end) are in the same project. In a real world scenario, I would divide those into two separate npm modules/git repositories (the front-end will probably be a dependency of the server for bundling and serving purposes).

For this reason, using a build system would create extra overhead. Therefore, the whole build process is done via npm scripts.
#### Usage of TypeScript in the back-end
I decided to use TypeScript in the back-end as well as it's a personal preference. I am of course able to work on plain ES6 as well.

#### Application was treated as an MVP that should go to production (as requested)
##### Back-end:
- **microsoft-tslint-contrib** as tslint configuration. That is my favorite one, but I am willing to adapt to any other configuration.
- 100% unit tests coverage.
- Usage of "paths" for TypeScript's module resolution configuration as it clears the overhead of relative paths in large applications.
- Usage of classes even though there is a single factory and a single manager, as that is how I would treat an application that will potentially be scaled.
- Back-end serves the Angular application after building the distribution (*public* folder).

##### Front-end:
- Using Angular CLI's default tslint configuration.
- 100% unit tests coverage.
- Website is responsive.
- Bundled into the back-end's "dist" folder (real-world scenario: front-end is a dependency of the back-end npm module, therefore cleaner to bundle).
- Back-end errors are mapped and displayed in the relevant fields, where necessary.

#### Unit testing
Both front-end and back-end applications have 100% coverage.



